import { PartnerTrackSchema } from './PartnerTrack';

export interface PartnerSchemaDashboard {
  name: string;
  location: string;
  tracks: PartnerTrackSchema[];
}

export interface PartnerSchemaReport {
  partner: string,
  track: string,
  trackStartDate: Date,
  trackEndDate: Date,
  expertise: string,
  expertiseStartDate: Date,
  expertiseEndDate: Date,
  qualifier: string,
  qualifierStartDate: Date,
  qualifierEndDate: Date,
  qualifierExpiration: Date

}