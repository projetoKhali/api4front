import { PartnerQualifierSchema } from './PartnerQualifier';

export interface PartnerExpertiseSchema {
  name: string;
  startDate: Date;
  endDate: Date;
  qualifier: PartnerQualifierSchema[];
}
