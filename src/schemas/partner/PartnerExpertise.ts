import { PartnerQualifierSchema } from './PartnerQualifier';

export interface PartnerExpertiseSchema{
    name: String,
    startDate: Date,
    endDate: Date,
    qualifier: PartnerQualifierSchema[]
}
