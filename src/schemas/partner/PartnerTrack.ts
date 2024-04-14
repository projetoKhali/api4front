import { PartnerExpertiseSchema } from './PartnerExpertise';

export interface PartnerTrackSchema {
  name: string;
  expertises: PartnerExpertiseSchema[];
}
