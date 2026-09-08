export interface Room {
  id: string;
  name: string;
  location?: string | null;
  capacity: number;
  description?: string | null;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomDto {
  name: string;
  location?: string;
  capacity: number;
  description?: string;
  imageUrl?: string;
}

export interface UpdateRoomDto {
  name?: string;
  location?: string;
  capacity?: number;
  description?: string;
  imageUrl?: string;
}
