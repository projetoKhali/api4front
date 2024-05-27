import { PartnerQualifierSchema } from './PartnerQualifier';

export interface PartnerExpertiseSchema {
  name: string;
  insertDate: Date;
  completeDate: Date;
  qualifiers: PartnerQualifierSchema[];
}

export interface ExpertisePartnerMetricSchema {
  expertise: string;
  qualifiersExpertise: number;
  partners: PartnerExpertiseMetricSchema[];
}
export interface PartnerExpertiseMetricSchema {
  partnerName: string;
  location: string;
  finalizedQualifiers: number;
}