import { PartnerTrackSchema } from './PartnerTrack';

export interface PartnerSchema{
    name: String,
    location: String,
    tracks: PartnerTrackSchema[]
}
