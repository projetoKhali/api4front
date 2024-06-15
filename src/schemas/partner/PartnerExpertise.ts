import { PartnerQualifierSchema } from './PartnerQualifier';

export interface PartnerExpertiseSchema {
  name: string;
  insertDate: Date;
  completeDate: Date;
  qualifiers: PartnerQualifierSchema[];
}

export interface ExpertisePartnerMetricsSchema {
  expertise: string;
  qualifiersExpertise: number;
  partners: PartnerExpertiseMetricsSchema[];
}
export interface PartnerExpertiseMetricsSchema {
  partnerName: string;
  location: string;
  finalizedQualifiers: number;
}
