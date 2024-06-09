import { TrackPartnerExpertiseSchema } from './TrackPartnerExpertise';
import { TrackPartnerQualifierSchema } from './TrackPartnerQualifier';

export interface TrackPartnerSchema {
  name: string;
  location: string;
  startDate: Date;
  expertises: TrackPartnerExpertiseSchema[];
  qualifiers: TrackPartnerQualifierSchema[];
}
