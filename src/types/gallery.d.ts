export type MediaType = 'IMAGE' | 'VIDEO';
export type Visibility = 'PUBLIC' | 'PRIVATE';

export interface Gallery {
  id: string;
  title?: string | null;
  mediaUrl: string;
  mediaType: MediaType;
  visibility: Visibility;
  description?: string | null;
  activityId: string;
  createdAt: string;
}

export interface CreateGalleryDto {
  title?: string;
  mediaUrl: string;
  mediaType?: MediaType;
  visibility?: Visibility;
  description?: string;
  activityId: string;
}

export interface UpdateGalleryDto {
  title?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
  visibility?: Visibility;
  description?: string;
}
