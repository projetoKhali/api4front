import { TrackExpertiseSchema } from './TrackExpertise';
import { TrackPartnerSchema } from './TrackPartner';

export interface TrackSchema{
    name: String,
    expertises: TrackExpertiseSchema[],
    partners: TrackPartnerSchema[]
}
