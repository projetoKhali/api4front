import { PartnerExpertiseSchema } from './PartnerExpertise';

export interface PartnerTrackSchema{
    name: String,
    expertises: PartnerExpertiseSchema[]
}
