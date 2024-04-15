import { TrackQualifierSchema } from './TrackQualifier';

export interface TrackExpertiseSchema {
  name: string;
  qualifier: TrackQualifierSchema[];
}
