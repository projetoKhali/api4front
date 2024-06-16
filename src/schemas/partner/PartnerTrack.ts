import { PartnerExpertiseSchema } from './PartnerExpertise';

export interface PartnerTrackSchema {
  name: string;
  expertises: PartnerExpertiseSchema[];
}

export interface PartnerTrackMetricsSchema {
  partner: string;
  location: string;
  tracks: TrackDetailSchema[];
}
export interface TrackDetailSchema {
  trackName: string;
  expertisesTrack: number;
  progressExpertises: number;
  finalizedExpertises: number;
}
