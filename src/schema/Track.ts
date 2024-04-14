export interface TrackSchema{
    name: String,
    expertises: TrackExpertiseSchema[],
    partners: TrackPartnerSchema[]
}