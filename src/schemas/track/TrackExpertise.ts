import { TrackQualifierSchema } from './TrackQualifier';

export interface TrackExpertiseSchema{
    name: String,
    qualifier: TrackQualifierSchema[]
}
