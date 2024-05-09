export interface TrackSchema {
  id: number;
  name: string;
  insertDate: Date;
}

export type TrackPostSchema = Omit<TrackSchema, 'id' | 'insertDate'>;

export type TrackPatchSchema = Partial<TrackPostSchema>;
