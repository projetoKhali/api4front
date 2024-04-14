export interface TrackSchema{
    name: string,
    expertises: TrackExpertiseSchema[],
    partners: TrackPartnerSchema[]
}