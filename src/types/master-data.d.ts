export interface Country {
  id: string;
  name: string;
  code?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCountryDto {
  name: string;
  code?: string;
}

export interface UpdateCountryDto {
  name?: string;
  code?: string;
}

export interface Organization {
  id: string;
  name: string;
  shortName?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganizationDto {
  name: string;
  shortName?: string;
}

export interface UpdateOrganizationDto {
  name?: string;
  shortName?: string;
}
