import { PartnerQualifierSchema } from './PartnerQualifier';

export interface PartnerExpertiseSchema {
  name: string;
  insertDate: Date;
  completeDate: Date;
  qualifiers: PartnerQualifierSchema[];
}
