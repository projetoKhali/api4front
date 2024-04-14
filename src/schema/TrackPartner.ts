interface TrackPartnerSchema{
    name: string,
    location: string,
    startDate: Date,
    expertises: TrackPartnerExpertiseSchema[],
    qualifiers: TrackPartnerQualifierSchema[]
}