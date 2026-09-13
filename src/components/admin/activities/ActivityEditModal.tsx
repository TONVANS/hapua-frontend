import React, { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Edit2,
  CalendarDays,
  Clock,
  DoorOpen,
  MapPin,
  Loader2,
  AlertCircle,
  Layers,
  Timer,
  ChevronDown,
  CheckCircle2,
  FileText,
  Camera,
  Link2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { Combobox } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Room } from '@/types';
import { UpdateActivityFormData } from '@/lib/validations';
import { getTimeDuration, addHoursToTime, getActivityTimeOptions } from './utils';

interface ActivityEditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<UpdateActivityFormData>;
  rooms: Room[];
  submitting: boolean;
  onSubmit: (data: UpdateActivityFormData) => Promise<void>;
}

export function ActivityEditModal({
  open,
  setOpen,
  form,
  rooms,
  submitting,
  onSubmit,
}: ActivityEditModalProps) {
  const watchedStart = form.watch('startTime') || '09:00';
  const watchedEnd = form.watch('endTime') || '11:00';
  const watchedRoomId = form.watch('roomId') || '';
  const watchedDesc = form.watch('description') || '';

  const duration = useMemo(() => getTimeDuration(watchedStart, watchedEnd), [watchedStart, watchedEnd]);
  const selectedRoom = useMemo(() => rooms.find((r) => r.id === watchedRoomId), [rooms, watchedRoomId]);

  const startTimeOptions = useMemo(() => {
    return getActivityTimeOptions(watchedStart).map((t) => ({
      value: t.value,
      label: t.label,
      keywords: [t.value, t.label],
    }));
  }, [watchedStart]);

  const endTimeOptions = useMemo(() => {
    return getActivityTimeOptions(watchedEnd).map((t) => ({
      value: t.value,
      label: t.label,
      keywords: [t.value, t.label],
    }));
  }, [watchedEnd]);

  const roomOptions = useMemo(() => [
    { value: '', label: 'No Room / Off-site / External Venue', description: 'No physical room assigned' },
    ...rooms.map((r) => ({
      value: r.id,
      label: r.name,
      description: `Capacity: ${r.capacity} pax${r.location ? ` • ${r.location}` : ''}`,
      keywords: [r.name, r.location || '', `${r.capacity}`],
    })),
  ], [rooms]);

  const handleQuickDuration = (hoursToAdd: number) => {
    const curStart = form.getValues('startTime') || '09:00';
    const newEndStr = addHoursToTime(curStart, hoursToAdd);
    form.setValue('endTime', newEndStr, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[680px] p-0 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
        {/* Sticky Dialog Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50/80 to-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#002660] text-white flex items-center justify-center shadow-sm">
              <Edit2 className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-[#002660]">
                Edit Activity Session
              </DialogTitle>
              <DialogDescription className="text-xs text-[#4f616f] mt-0.5">
                Update timetable or venue assignment for this activity
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-h-[72vh] overflow-y-auto px-6 py-5 space-y-6">
            {/* SECTION 1: Session Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                <Layers className="w-4 h-4 text-[#002660]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#002660]">
                  1. Session Information
                </h4>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="edit-name" className="text-xs font-semibold text-[#002660]">
                    Activity Name <span className="text-[#ba1a1a]">*</span>
                  </Label>
                  <span className="text-[10px] text-slate-400">Official agenda title</span>
                </div>
                <Input
                  id="edit-name"
                  placeholder="e.g. Opening Plenary Session"
                  className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all"
                  {...form.register('name')}
                />
                {form.formState.errors.name && (
                  <p className="text-[11px] text-[#ba1a1a] font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="edit-desc" className="text-xs font-semibold text-[#002660]">
                    Description & Scope
                  </Label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {watchedDesc.length}/500 chars
                  </span>
                </div>
                <Textarea
                  id="edit-desc"
                  maxLength={500}
                  placeholder="Detailed session agenda, participating member states, key objectives..."
                  className="text-xs min-h-[80px] bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 transition-all resize-none"
                  {...form.register('description')}
                />
              </div>
            </div>

            {/* SECTION 2: Schedule & Timing */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#002660]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#002660]">
                    2. Schedule & Timing
                  </h4>
                </div>
                {duration.formatted && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-2xs ${
                      duration.isInvalid
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {duration.isInvalid ? (
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    {duration.formatted}
                  </span>
                )}
              </div>

              {/* Date & Time Select Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-date" className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-[#002660]" />
                    Event Date <span className="text-[#ba1a1a]">*</span>
                  </Label>
                  <DatePicker
                    value={form.watch('date')}
                    onChange={(val) => form.setValue('date', val, { shouldValidate: true, shouldDirty: true })}
                    error={Boolean(form.formState.errors.date)}
                    placeholder="Select event date..."
                  />
                  {form.formState.errors.date && (
                    <p className="text-[11px] text-[#ba1a1a] font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {form.formState.errors.date.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="edit-start" className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#002660]" />
                    Start Time <span className="text-[#ba1a1a]">*</span>
                  </Label>
                  <Combobox
                    value={form.watch('startTime')}
                    onChange={(val) => form.setValue('startTime', val, { shouldValidate: true, shouldDirty: true })}
                    options={startTimeOptions}
                    placeholder="Select start time..."
                    searchPlaceholder="Search start time (e.g. 09, 2pm)..."
                    error={Boolean(form.formState.errors.startTime)}
                    icon={Clock}
                  />
                  {form.formState.errors.startTime && (
                    <p className="text-[11px] text-[#ba1a1a] font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {form.formState.errors.startTime.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="edit-end" className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#002660]" />
                    End Time <span className="text-[#ba1a1a]">*</span>
                  </Label>
                  <Combobox
                    value={form.watch('endTime')}
                    onChange={(val) => form.setValue('endTime', val, { shouldValidate: true, shouldDirty: true })}
                    options={endTimeOptions}
                    placeholder="Select end time..."
                    searchPlaceholder="Search end time (e.g. 11, 5pm)..."
                    error={Boolean(form.formState.errors.endTime) || duration.isInvalid}
                    icon={Clock}
                  />
                  {form.formState.errors.endTime && (
                    <p className="text-[11px] text-[#ba1a1a] font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {form.formState.errors.endTime.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Duration Adjuster Buttons */}
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-[#4f616f] flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-[#002660]" /> Quick Duration:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: '+30m', hours: 0.5 },
                    { label: '+1 hr', hours: 1 },
                    { label: '+1.5 hrs', hours: 1.5 },
                    { label: '+2 hrs', hours: 2 },
                    { label: '+3 hrs', hours: 3 },
                    { label: '+4 hrs', hours: 4 },
                  ].map((dur) => (
                    <button
                      key={dur.label}
                      type="button"
                      onClick={() => handleQuickDuration(dur.hours)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-[11px] font-semibold text-slate-700 hover:text-[#002660] cursor-pointer transition-colors shadow-2xs"
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 3: Venue & Location */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                <DoorOpen className="w-4 h-4 text-[#002660]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#002660]">
                  3. Venue & Meeting Room
                </h4>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-room" className="text-xs font-semibold text-[#002660]">
                  Assigned Room / Venue
                </Label>
                <Combobox
                  value={form.watch('roomId') || ''}
                  onChange={(val) => form.setValue('roomId', val, { shouldValidate: true, shouldDirty: true })}
                  options={roomOptions}
                  placeholder="Select room / venue..."
                  searchPlaceholder="Search room by name, location, or capacity..."
                  icon={DoorOpen}
                />
              </div>

              {/* Selected Room Details Preview */}
              {selectedRoom && (
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-[#002660] flex items-center justify-between animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      <DoorOpen className="w-4 h-4 text-[#002660]" />
                    </div>
                    <div>
                      <p className="font-bold">{selectedRoom.name}</p>
                      {selectedRoom.location && (
                        <p className="text-[11px] text-[#4f616f] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#4f616f]" />
                          {selectedRoom.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-blue-200 font-semibold text-[11px] text-[#002660] shadow-2xs">
                    Max {selectedRoom.capacity} seats
                  </span>
                </div>
              )}
            </div>

            {/* SECTION 4: External Resource Links (Optional) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                <Link2 className="w-4 h-4 text-[#002660]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#002660]">
                  4. Session Materials & Cloud Links (Optional)
                </h4>
              </div>

              <div className="space-y-3">
                {/* docURL */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="edit-docURL" className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#002660]" />
                      Session Document URL (docURL)
                    </Label>
                    <span className="text-[10px] text-slate-400">PDF, Presentation, Google Drive, OneDrive</span>
                  </div>
                  <div className="relative">
                    <Input
                      id="edit-docURL"
                      type="url"
                      placeholder="https://drive.google.com/... or https://..."
                      className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 pl-8 transition-all"
                      {...form.register('docURL')}
                    />
                    <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {form.formState.errors.docURL && (
                    <p className="text-[11px] text-[#ba1a1a] font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {form.formState.errors.docURL.message}
                    </p>
                  )}
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Delegates and council members can view or download ministerial minutes and briefing documents from this link.
                  </p>
                </div>

                {/* allImageURL */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="edit-allImageURL" className="text-xs font-semibold text-[#002660] flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#002660]" />
                      Full Photo Album / Gallery URL (allImageURL)
                    </Label>
                    <span className="text-[10px] text-slate-400">Google Photos, Flickr, Cloud Archive</span>
                  </div>
                  <div className="relative">
                    <Input
                      id="edit-allImageURL"
                      type="url"
                      placeholder="https://photos.app.goo.gl/... or https://..."
                      className="h-10 text-xs bg-[#f7f9fb] border-[#e2e8f0] rounded-xl focus-visible:ring-[#002660]/20 pl-8 transition-all"
                      {...form.register('allImageURL')}
                    />
                    <Camera className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {form.formState.errors.allImageURL && (
                    <p className="text-[11px] text-[#ba1a1a] font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {form.formState.errors.allImageURL.message}
                    </p>
                  )}
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Link to the complete high-resolution photo repository where delegates can browse and download all session photos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Dialog Footer */}
          <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between sm:justify-between gap-3">
            <span className="text-[11px] text-slate-400 hidden sm:inline-block">
              Press ESC to cancel
            </span>
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="text-xs rounded-xl h-10 font-medium hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting || duration.isInvalid}
                className="bg-[#002660] hover:bg-[#1a3c7d] text-white text-xs rounded-xl h-10 font-semibold shadow-md shadow-[#002660]/20 transition-all cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                    Updating Activity...
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-1.5" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
