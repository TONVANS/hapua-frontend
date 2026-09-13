import { Room } from './room';
import { Delegation } from './delegation';
import { Gallery } from './gallery';

export type ActivityStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELED';

export interface Activity {
  id: string;
  name: string;
  description?: string | null;
  qrCode?: string | null;
  docURL?: string | null;
  allImageURL?: string | null;
  date: string;
  startTime: string;
  endTime: string;
  status: ActivityStatus;
  registrationDeadline?: string | null;
  roomId?: string | null;
  room?: Room | null;
  delegations?: {
    activityId: string;
    delegationId: string;
    registeredAt: string;
    delegation?: Delegation;
  }[];
  galleries?: Gallery[];
  _count?: {
    delegations: number;
    galleries: number;
  };
  totalDelegations?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateActivityDto {
  name: string;
  description?: string;
  docURL?: string;
  allImageURL?: string;
  date: string;
  startTime: string;
  endTime: string;
  status?: ActivityStatus;
  registrationDeadline?: string;
  roomId?: string;
}

export interface UpdateActivityDto {
  name?: string;
  description?: string;
  docURL?: string;
  allImageURL?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  status?: ActivityStatus;
  registrationDeadline?: string;
  roomId?: string;
}

export interface AgendaItem {
  id: string;
  name: string;
  description?: string | null;
  docURL?: string | null;
  allImageURL?: string | null;
  date: string;
  startTime: string;
  endTime: string;
  status: ActivityStatus;
  room?: Room | null;
}
