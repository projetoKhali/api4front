import { TrackQualifierSchema } from './TrackQualifier';

export interface TrackExpertiseSchema {
  name: string;
  qualifiers: TrackQualifierSchema[];
}
