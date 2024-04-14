export interface TrackPartnerSchema{
    name: String,
    location: String,
    startDate: Date,
    expertises: TrackPartnerExpertiseSchema[],
    qualifiers: TrackPartnerQualifierSchema[]
}
