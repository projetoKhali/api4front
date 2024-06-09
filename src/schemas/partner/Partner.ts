import { PartnerTrackSchema } from './PartnerTrack';

export interface PartnerSchemaDashboard {
  name: string;
  location: string;
  tracks: PartnerTrackSchema[];
}
