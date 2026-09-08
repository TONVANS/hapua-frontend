import { Country, Organization } from './master-data';
import { Role } from './auth';

export interface Delegation {
  id: string;
  title?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  position?: string | null;
  delegationCode?: string | null;
  role: Role;
  organizationId?: string | null;
  organization?: Organization | null;
  countryId?: string | null;
  country?: Country | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDelegationDto {
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  position?: string;
  organizationId?: string;
  countryId?: string;
}

export interface UpdateDelegationDto {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  position?: string;
  organizationId?: string;
  countryId?: string;
}

export interface RegisterActivityDto {
  delegationCode: string;
  activityId: string;
}
