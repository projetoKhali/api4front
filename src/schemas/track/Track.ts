import { TrackExpertiseSchema } from './TrackExpertise';
import { TrackPartnerSchema } from './TrackPartner';

export interface TrackSchema {
  name: string;
  expertises: TrackExpertiseSchema[];
  partners: TrackPartnerSchema[];
}
