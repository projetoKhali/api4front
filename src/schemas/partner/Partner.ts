import { PartnerTrackSchema } from './PartnerTrack';

export interface PartnerSchema {
  name: string;
  location: string;
  tracks: PartnerTrackSchema[];
}
