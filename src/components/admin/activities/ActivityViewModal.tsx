import { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  DoorOpen,
  MapPin,
  Users,
  Info,
  Check,
  Trash2,
  Edit2,
  Search,
  RefreshCw,
  Building2,
  Mail,
  Phone,
  UserCheck,
  Download,
  AlertCircle,
  X,
  Layers,
  ArrowRight,
  Globe,
  Printer,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Activity } from '@/types';
import { adminService } from '@/services';
import {
  toTimeInputValue,
  getTimeDuration,
  getActivityStatusBadge,
  formatEventDate,
} from './utils';

interface ActivityViewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activity: Activity | null;
  copiedQr: boolean;
  onCopyQr: (code?: string | null) => void;
  onOpenEdit: (activity: Activity) => void;
  onOpenDelete: (activity: Activity) => void;
  onPrintQr?: (activity: Activity) => void;
}

const AVATAR_GRADIENTS = [
  'from-blue-600 to-indigo-600 text-white',
  'from-emerald-600 to-teal-600 text-white',
  'from-violet-600 to-purple-600 text-white',
  'from-amber-600 to-orange-600 text-white',
  'from-rose-600 to-pink-600 text-white',
  'from-cyan-600 to-blue-600 text-white',
];

function getAvatarGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

function getCountryFlag(code?: string | null): string {
  if (!code || code.length !== 2) return '🌐';
  try {
    const codePoints = code
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return '🌐';
  }
}

export function ActivityViewModal({
  open,
  setOpen,
  activity,
  copiedQr,
  onCopyQr,
  onOpenEdit,
  onOpenDelete,
  onPrintQr,
}: ActivityViewModalProps) {
  const [detailedActivity, setDetailedActivity] = useState<Activity | null>(activity);
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'delegates'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('ALL');
  const [selectedOrgFilter, setSelectedOrgFilter] = useState<string>('ALL');
  const [copiedAttendeeList, setCopiedAttendeeList] = useState(false);

  // Sync initial activity and fetch fresh findOne details when modal opens
  useEffect(() => {
    if (!open || !activity?.id) {
      setSearchQuery('');
      setSelectedCountryFilter('ALL');
      setSelectedOrgFilter('ALL');
      setActiveTab('overview');
      return;
    }

    setDetailedActivity(activity);
    setSearchQuery('');
    setSelectedCountryFilter('ALL');
    setSelectedOrgFilter('ALL');
    setFetchError(null);
    let isMounted = true;
    setIsLoadingDetails(true);

    adminService
      .getActivity(activity.id)
      .then((data) => {
        if (isMounted) {
          setDetailedActivity(data);
          setIsLoadingDetails(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to fetch detailed activity:', err);
          setFetchError('Failed to load full attendee details');
          setIsLoadingDetails(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [open, activity?.id]);

  const currentActivity = detailedActivity || activity;

  // Refresh attendee details manually
  const handleRefresh = async () => {
    if (!currentActivity?.id) return;
    setIsLoadingDetails(true);
    setFetchError(null);
    try {
      const data = await adminService.getActivity(currentActivity.id);
      setDetailedActivity(data);
      toast.success('Activity details refreshed', {
        description: 'Latest attendee registrations retrieved.',
      });
    } catch {
      setFetchError('Failed to refresh attendee list');
      toast.error('Failed to refresh attendee list');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Attendees list from findOne
  const attendees = useMemo(() => {
    return currentActivity?.delegations || [];
  }, [currentActivity?.delegations]);

  const totalCount =
    currentActivity?.totalDelegations ??
    currentActivity?._count?.delegations ??
    attendees.length;

  const roomCapacity = currentActivity?.room?.capacity;
  const occupancyPercent =
    roomCapacity && roomCapacity > 0
      ? Math.min(100, Math.round((totalCount / roomCapacity) * 100))
      : null;

  // Distinct countries & organizations for stats & filters
  const distinctCountries = useMemo(() => {
    const map = new Map<string, { id: string; name: string; code?: string | null }>();
    attendees.forEach((item) => {
      if (item.delegation?.country) {
        map.set(item.delegation.country.name, item.delegation.country);
      }
    });
    return Array.from(map.values());
  }, [attendees]);

  const distinctOrgs = useMemo(() => {
    const map = new Map<string, { id: string; name: string; shortName?: string | null }>();
    attendees.forEach((item) => {
      if (item.delegation?.organization) {
        map.set(item.delegation.organization.name, item.delegation.organization);
      }
    });
    return Array.from(map.values());
  }, [attendees]);

  // Filter attendees by query + country + organization
  const filteredAttendees = useMemo(() => {
    return attendees.filter((item) => {
      const d = item.delegation;
      if (!d) return false;

      // Country filter
      if (selectedCountryFilter !== 'ALL') {
        if (d.country?.name !== selectedCountryFilter) return false;
      }

      // Organization filter
      if (selectedOrgFilter !== 'ALL') {
        if (d.organization?.name !== selectedOrgFilter) return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const fullName = `${d.title || ''} ${d.firstName || ''} ${d.lastName || ''}`.toLowerCase();
      const countryName = d.country?.name?.toLowerCase() || '';
      const countryCode = d.country?.code?.toLowerCase() || '';
      const orgName = d.organization?.name?.toLowerCase() || '';
      const orgShort = d.organization?.shortName?.toLowerCase() || '';
      const code = d.delegationCode?.toLowerCase() || '';
      const email = d.email?.toLowerCase() || '';
      const position = d.position?.toLowerCase() || '';

      return (
        fullName.includes(q) ||
        countryName.includes(q) ||
        countryCode.includes(q) ||
        orgName.includes(q) ||
        orgShort.includes(q) ||
        code.includes(q) ||
        email.includes(q) ||
        position.includes(q)
      );
    });
  }, [attendees, searchQuery, selectedCountryFilter, selectedOrgFilter]);

  // Export / Copy attendees list
  const handleCopyAttendeeList = () => {
    if (!attendees.length) {
      toast.info('No attendees to export');
      return;
    }

    const header = [
      '#',
      'Code',
      'Name',
      'Country',
      'Organization',
      'Position',
      'Email',
      'Phone',
      'Registered At',
    ].join('\t');

    const rows = attendees.map((item, idx) => {
      const d = item.delegation;
      const code = d?.delegationCode || '-';
      const name = d
        ? `${d.title ? `${d.title} ` : ''}${d.firstName} ${d.lastName}`.trim()
        : '-';
      const country = d?.country?.name
        ? `${d.country.name}${d.country.code ? ` (${d.country.code})` : ''}`
        : '-';
      const org = d?.organization
        ? `${d.organization.name}${d.organization.shortName ? ` (${d.organization.shortName})` : ''}`
        : '-';
      const pos = d?.position || '-';
      const email = d?.email || '-';
      const phone = d?.phoneNumber || '-';
      const reg = item.registeredAt
        ? new Date(item.registeredAt).toLocaleString()
        : '-';

      return [
        idx + 1,
        code,
        name,
        country,
        org,
        pos,
        email,
        phone,
        reg,
      ].join('\t');
    });

    const tsvContent = [header, ...rows].join('\n');
    navigator.clipboard.writeText(tsvContent);
    setCopiedAttendeeList(true);
    toast.success('Attendee roster copied to clipboard', {
      description: 'TSV / Excel spreadsheet compatible format.',
    });
    setTimeout(() => setCopiedAttendeeList(false), 2500);
  };

  if (!currentActivity) return null;

  const durationInfo = getTimeDuration(
    toTimeInputValue(currentActivity.startTime),
    toTimeInputValue(currentActivity.endTime)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[700px] w-full p-0 bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl"
      >
        <div className="flex flex-col max-h-[85vh]">
          {/* Executive Top Header */}
          <div className="relative px-6 pt-5 pb-4 bg-linear-to-r from-slate-50 via-blue-50/40 to-slate-50/80 border-b border-slate-200/80 shrink-0">
            {/* Top Row: Meta Tags & Actions */}
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Status Indicator */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-2xs border ${getActivityStatusBadge(
                    currentActivity.status
                  )}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  {currentActivity.status}
                </span>

                {/* Registration Deadline */}
                {currentActivity.registrationDeadline && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200/80 text-[10px] font-medium text-amber-800">
                    <Clock className="w-3 h-3 text-amber-600" />
                    Deadline: {formatEventDate(currentActivity.registrationDeadline)}
                  </span>
                )}
              </div>

              {/* Header Right Action Tools */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isLoadingDetails}
                  title="Reload activity details"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-[#002660] hover:bg-white/80 border border-transparent hover:border-slate-200/70 transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isLoadingDetails ? 'animate-spin text-[#002660]' : ''}`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/80 border border-transparent hover:border-slate-200/70 transition-all cursor-pointer"
                  title="Close modal (Esc)"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Title & Quick Subtitle */}
            <DialogTitle className="text-lg sm:text-xl font-bold text-[#002660] tracking-tight leading-snug">
              {currentActivity.name}
            </DialogTitle>

            {/* Navigation Segmented Tab Switcher */}
            <div className="flex items-center gap-1 mt-3 pt-2 border-t border-slate-200/50">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === 'overview'
                    ? 'bg-[#002660] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#002660] hover:bg-white/70'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Session Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('delegates')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === 'delegates'
                    ? 'bg-[#002660] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#002660] hover:bg-white/70'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Enrolled Delegates</span>
                <span
                  className={`px-1.5 py-0.2 rounded font-mono text-[10px] font-bold ${
                    activeTab === 'delegates'
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-100 text-[#002660]'
                  }`}
                >
                  {totalCount}
                </span>
              </button>
            </div>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-xs max-h-[62vh]">
            {activeTab === 'overview' ? (
              /* ================= TAB 1: OVERVIEW & SCHEDULE ================= */
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                {/* Metric Summary Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* Card 1: Event Date */}
                  <div className="p-2.5 rounded-xl bg-[#f7f9fb] border border-slate-200/80 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#002660]" /> Event Date
                    </span>
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {formatEventDate(currentActivity.date, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {formatEventDate(currentActivity.date, { weekday: 'long' })}
                    </p>
                  </div>

                  {/* Card 2: Time & Duration */}
                  <div className="p-2.5 rounded-xl bg-[#f7f9fb] border border-slate-200/80 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#002660]" /> Schedule
                    </span>
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {new Date(currentActivity.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      -{' '}
                      {new Date(currentActivity.endTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {durationInfo.formatted && (
                      <p className="text-[10px] text-[#002660] font-semibold">
                        Duration: {durationInfo.formatted}
                      </p>
                    )}
                  </div>

                  {/* Card 3: Venue / Capacity */}
                  <div className="p-2.5 rounded-xl bg-[#f7f9fb] border border-slate-200/80 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                      <DoorOpen className="w-3 h-3 text-[#002660]" /> Venue / Room
                    </span>
                    <p className="text-xs font-bold text-slate-900 truncate" title={currentActivity.room?.name || 'External / Virtual'}>
                      {currentActivity.room?.name || 'External Tour'}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {roomCapacity ? `${roomCapacity} max seats` : 'Open venue'}
                    </p>
                  </div>

                  {/* Card 4: Enrollment Rate */}
                  <div className="p-2.5 rounded-xl bg-[#f7f9fb] border border-slate-200/80 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#002660]" /> Enrolled
                    </span>
                    <p className="text-xs font-bold text-slate-900">
                      {totalCount} {totalCount === 1 ? 'Delegate' : 'Delegates'}
                    </p>
                    {roomCapacity ? (
                      <p className="text-[10px] text-emerald-700 font-semibold">
                        {occupancyPercent}% capacity
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-500">Scheduled</p>
                    )}
                  </div>
                </div>

                {/* Scope & Objectives */}
                {currentActivity.description && (
                  <div className="p-3 rounded-xl bg-linear-to-r from-slate-50 to-blue-50/20 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 text-[#002660] font-bold text-xs">
                      <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center text-[#002660]">
                        <Info className="w-2.5 h-2.5" />
                      </div>
                      <span>Scope & Objectives</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pl-5">
                      {currentActivity.description}
                    </p>
                  </div>
                )}

                {/* Dual Detailed Section Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Schedule Card Detail */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-[#002660]">
                        <Calendar className="w-3.5 h-3.5 text-[#002660]" />
                        <span>Timeline Details</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-blue-50 text-[#002660] border border-blue-200/60">
                        {durationInfo.formatted || 'Session'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-start justify-between py-0.5 border-b border-slate-50">
                        <span className="text-slate-500 text-[11px]">Official Date:</span>
                        <span className="font-semibold text-slate-900 text-right text-[11px]">
                          {formatEventDate(currentActivity.date, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-0.5 border-b border-slate-50">
                        <span className="text-slate-500 text-[11px]">Session Hours:</span>
                        <span className="font-semibold text-slate-900 text-[11px]">
                          {new Date(currentActivity.startTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          -{' '}
                          {new Date(currentActivity.endTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-0.5">
                        <span className="text-slate-500 text-[11px]">Status:</span>
                        <span className="font-semibold text-slate-900 flex items-center gap-1 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Ready for check-in
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Venue & Capacity Deep Dive */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-[#002660]">
                        <DoorOpen className="w-3.5 h-3.5 text-[#002660]" />
                        <span>Venue & Capacity</span>
                      </div>
                      {roomCapacity && (
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200/60">
                          {roomCapacity} Seats
                        </span>
                      )}
                    </div>

                    {currentActivity.room ? (
                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-start justify-between py-0.5 border-b border-slate-50">
                          <span className="text-slate-500 text-[11px]">Room Name:</span>
                          <span className="font-semibold text-slate-900 text-right text-[11px] truncate max-w-[160px]" title={currentActivity.room.name}>
                            {currentActivity.room.name}
                          </span>
                        </div>

                        {currentActivity.room.location && (
                          <div className="flex items-center justify-between py-0.5 border-b border-slate-50">
                            <span className="text-slate-500 text-[11px]">Floor / Zone:</span>
                            <span className="font-semibold text-slate-900 flex items-center gap-1 text-[11px]">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {currentActivity.room.location}
                            </span>
                          </div>
                        )}

                        {roomCapacity && roomCapacity > 0 ? (
                          <div className="pt-1 space-y-1">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-slate-500">Occupancy</span>
                              <span className="font-bold text-slate-900">
                                {totalCount} / {roomCapacity} ({occupancyPercent}%)
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200/60">
                              <div
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                  (occupancyPercent ?? 0) >= 100
                                    ? 'bg-rose-500'
                                    : (occupancyPercent ?? 0) >= 80
                                    ? 'bg-amber-500'
                                    : 'bg-[#002660]'
                                }`}
                                style={{ width: `${Math.min(100, occupancyPercent ?? 0)}%` }}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="py-3 text-center text-slate-500 text-[11px] italic">
                        No indoor room assigned (External site tour).
                      </div>
                    )}
                  </div>
                </div>

                {/* Enrolled Delegates Preview Strip */}
                <div className="p-3 rounded-xl bg-linear-to-r from-blue-50/80 via-white to-blue-50/50 border border-blue-200/70 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#002660] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900 text-xs">
                          {totalCount} Enrolled {totalCount === 1 ? 'Delegate' : 'Delegates'}
                        </p>
                        {distinctCountries.length > 0 && (
                          <span className="text-[10px] text-slate-500 font-medium">
                            • {distinctCountries.length}{' '}
                            {distinctCountries.length === 1 ? 'Country' : 'Countries'}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-600">
                        {attendees.length > 0
                          ? `Representatives from ${distinctOrgs.length} member organizations`
                          : 'No participants registered yet.'}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={() => setActiveTab('delegates')}
                    className="bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs rounded-lg h-8 px-3 font-semibold cursor-pointer shadow-xs shrink-0 flex items-center gap-1"
                  >
                    <span>View Delegates</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ) : (
              /* ================= TAB 2: ENROLLED DELEGATES ROSTER ================= */
              <div className="space-y-3 animate-in fade-in-50 duration-200">
                {/* Top Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Total
                    </span>
                    <p className="text-sm font-extrabold text-[#002660]">{totalCount}</p>
                    <p className="text-[10px] text-slate-500">Confirmed</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Countries
                    </span>
                    <p className="text-sm font-extrabold text-emerald-700">
                      {distinctCountries.length}
                    </p>
                    <p className="text-[10px] text-slate-500">ASEAN states</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Organizations
                    </span>
                    <p className="text-sm font-extrabold text-indigo-700">
                      {distinctOrgs.length}
                    </p>
                    <p className="text-[10px] text-slate-500">Utilities</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Occupancy
                    </span>
                    <p className="text-sm font-extrabold text-slate-800">
                      {occupancyPercent !== null ? `${occupancyPercent}%` : 'N/A'}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {roomCapacity ? `${totalCount}/${roomCapacity} seats` : 'Open'}
                    </p>
                  </div>
                </div>

                {/* Toolbar & Filters */}
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  {/* Search Input */}
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search delegates by name, country, organization, or code..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-8 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white placeholder:text-slate-400 text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#002660] focus:border-[#002660] transition-all"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                        title="Clear search"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Filter Dropdowns & Export */}
                  {(distinctCountries.length > 1 || distinctOrgs.length > 1 || attendees.length > 0) && (
                    <div className="flex items-center justify-between gap-2 pt-0.5 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Country Filter */}
                        {distinctCountries.length > 1 && (
                          <select
                            value={selectedCountryFilter}
                            onChange={(e) => setSelectedCountryFilter(e.target.value)}
                            className="text-[11px] bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 hover:bg-white focus:outline-none focus:ring-1 focus:ring-[#002660] cursor-pointer"
                          >
                            <option value="ALL">All Countries ({distinctCountries.length})</option>
                            {distinctCountries.map((c) => (
                              <option key={c.name} value={c.name}>
                                {c.code ? `[${c.code}] ` : ''}{c.name}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* Organization Filter */}
                        {distinctOrgs.length > 1 && (
                          <select
                            value={selectedOrgFilter}
                            onChange={(e) => setSelectedOrgFilter(e.target.value)}
                            className="text-[11px] bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 hover:bg-white focus:outline-none focus:ring-1 focus:ring-[#002660] cursor-pointer"
                          >
                            <option value="ALL">All Orgs ({distinctOrgs.length})</option>
                            {distinctOrgs.map((org) => (
                              <option key={org.name} value={org.name}>
                                {org.shortName ? `[${org.shortName}] ` : ''}{org.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      {/* Export List Button */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCopyAttendeeList}
                        disabled={!attendees.length}
                        className="h-7 text-[11px] rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#002660] cursor-pointer disabled:opacity-50 font-medium px-2.5 ml-auto"
                        title="Copy attendee roster in TSV / Excel format"
                      >
                        {copiedAttendeeList ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600 mr-1" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3 h-3 mr-1 text-slate-500" />
                            <span>Export TSV</span>
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Delegates Table Container */}
                <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs">
                  <div className="max-h-[260px] overflow-y-auto divide-y divide-slate-100">
                    {isLoadingDetails && attendees.length === 0 ? (
                      <div className="py-10 text-center space-y-2">
                        <RefreshCw className="w-6 h-6 text-[#002660] animate-spin mx-auto opacity-70" />
                        <p className="text-xs text-slate-600 font-medium">
                          Retrieving delegate enrollment data...
                        </p>
                      </div>
                    ) : fetchError && attendees.length === 0 ? (
                      <div className="py-8 px-4 text-center space-y-1.5">
                        <AlertCircle className="w-6 h-6 text-rose-500 mx-auto" />
                        <p className="text-xs text-rose-700 font-semibold">{fetchError}</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleRefresh}
                          className="text-xs mt-1 h-7"
                        >
                          Retry
                        </Button>
                      </div>
                    ) : attendees.length === 0 ? (
                      <div className="py-10 px-4 text-center space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#002660]">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5 max-w-sm mx-auto">
                          <p className="text-xs font-bold text-slate-800">
                            No delegations enrolled yet
                          </p>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            Participants will appear here automatically once registered.
                          </p>
                        </div>
                      </div>
                    ) : filteredAttendees.length === 0 ? (
                      <div className="py-8 px-4 text-center space-y-1.5">
                        <p className="text-xs font-semibold text-slate-800">
                          No delegates match your criteria
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Try searching for a different keyword or reset active filters.
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCountryFilter('ALL');
                            setSelectedOrgFilter('ALL');
                          }}
                          className="text-xs mt-1 h-7"
                        >
                          Reset Filters
                        </Button>
                      </div>
                    ) : (
                      <>
                        {/* Table Header */}
                        <div className="hidden sm:grid sm:grid-cols-12 gap-2 px-3.5 py-2 bg-slate-50/90 text-[10px] font-bold text-slate-500 uppercase tracking-wider sticky top-0 z-10 border-b border-slate-200/80 backdrop-blur-xs">
                          <div className="col-span-1 text-center">#</div>
                          <div className="col-span-4">Delegate Profile</div>
                          <div className="col-span-3">Country</div>
                          <div className="col-span-4">Organization & Title</div>
                        </div>

                        {/* Table Rows */}
                        {filteredAttendees.map((item, index) => {
                          const d = item.delegation;
                          if (!d) return null;
                          const fullName = `${d.title ? `${d.title} ` : ''}${d.firstName} ${d.lastName}`.trim();
                          const initials = `${d.firstName?.[0] || ''}${d.lastName?.[0] || ''}`.toUpperCase() || 'D';
                          const avatarGradient = getAvatarGradient(fullName);

                          return (
                            <div
                              key={item.delegationId || index}
                              className="px-3.5 py-2 sm:grid sm:grid-cols-12 gap-2 items-center hover:bg-blue-50/40 transition-colors text-xs space-y-1 sm:space-y-0"
                            >
                              {/* Row Index */}
                              <div className="hidden sm:block col-span-1 text-center font-mono text-[10px] text-slate-400">
                                {index + 1}
                              </div>

                              {/* Delegate Profile */}
                              <div className="col-span-4 flex items-center gap-2 min-w-0">
                                <div
                                  className={`w-7 h-7 rounded-lg bg-gradient-to-br ${avatarGradient} flex items-center justify-center font-bold text-[10px] shrink-0 shadow-2xs`}
                                >
                                  {initials}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-bold text-slate-900 truncate text-xs" title={fullName}>
                                    {fullName}
                                  </p>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    {d.delegationCode && (
                                      <span className="inline-flex items-center px-1 py-0.2 rounded bg-slate-100 text-slate-700 font-mono text-[9px] font-medium border border-slate-200">
                                        {d.delegationCode}
                                      </span>
                                    )}
                                    {d.email && (
                                      <a
                                        href={`mailto:${d.email}`}
                                        className="inline-flex items-center gap-1 text-[9px] text-slate-500 hover:text-[#002660] truncate transition-colors"
                                        title={d.email}
                                      >
                                        <Mail className="w-2.5 h-2.5 shrink-0" />
                                        <span className="truncate max-w-[110px]">{d.email}</span>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Country */}
                              <div className="col-span-3 flex items-center gap-1.5 text-slate-700">
                                <div className="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0">
                                  <Globe className="w-3 h-3 text-emerald-700" />
                                </div>
                                {d.country ? (
                                  <div className="flex items-center gap-1 min-w-0">
                                    <span className="font-semibold text-slate-800 truncate text-[11px]" title={d.country.name}>
                                      {d.country.name}
                                    </span>
                                    {d.country.code && (
                                      <span className="px-1 py-0.2 rounded bg-emerald-100/60 text-emerald-800 border border-emerald-200 text-[9px] font-mono font-bold shrink-0">
                                        {d.country.code}
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-slate-400 italic text-[10px]">Unspecified</span>
                                )}
                              </div>

                              {/* Organization & Title */}
                              <div className="col-span-4 space-y-0.5">
                                <div className="flex items-center gap-1 min-w-0">
                                  <Building2 className="w-3 h-3 text-indigo-600 shrink-0" />
                                  {d.organization ? (
                                    <div className="flex items-center gap-1 min-w-0">
                                      {d.organization.shortName && (
                                        <span className="px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 text-[9px] font-bold font-mono shrink-0">
                                          {d.organization.shortName}
                                        </span>
                                      )}
                                      <span
                                        className="font-medium text-slate-800 truncate text-[11px]"
                                        title={d.organization.name}
                                      >
                                        {d.organization.name}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-slate-400 italic text-[10px]">Unspecified</span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5 text-[9px] text-slate-500 pl-4">
                                  {d.position && (
                                    <span className="truncate font-medium text-slate-600" title={d.position}>
                                      {d.position}
                                    </span>
                                  )}
                                  {d.phoneNumber && (
                                    <span className="flex items-center gap-0.5 text-slate-400 shrink-0">
                                      <Phone className="w-2 h-2" />
                                      {d.phoneNumber}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Executive Footer */}
          <DialogFooter className="px-6 py-3 bg-slate-50/90 border-t border-slate-200 flex items-center justify-between sm:justify-between gap-2.5 shrink-0 backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="text-xs rounded-xl h-8.5 px-3.5 font-medium border-slate-200 hover:bg-white text-slate-700 cursor-pointer"
              >
                Close
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  onOpenDelete(currentActivity);
                }}
                className="text-xs rounded-xl h-8.5 px-3.5 border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800 cursor-pointer transition-colors font-semibold"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>

              <Button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenEdit(currentActivity);
                }}
                className="bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs rounded-xl h-8.5 px-4 font-semibold cursor-pointer shadow-xs transition-all"
              >
                <Edit2 className="w-3 h-3 mr-1.5" />
                Edit Activity
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
