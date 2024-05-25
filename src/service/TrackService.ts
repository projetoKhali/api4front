import { TrackSchema as TrackSchemaDashboard } from '../schemas/track/Track';
import { TrackSchema } from '@/schemas/Track';
import { TrackExpertiseSchema } from '@/schemas/track/TrackExpertise';
import axios from 'axios';
import { TrackQualifierSchema } from '@/schemas/track/TrackQualifier';
import { TrackPartnerSchema } from '@/schemas/track/TrackPartner';
import { TrackPartnerExpertiseSchema } from '@/schemas/track/TrackPartnerExpertise';
import { TrackPartnerQualifierSchema } from '@/schemas/track/TrackPartnerQualifier';

const API_URL: string = 'http://localhost:8080';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parseTrack(track: any): Promise<TrackSchema> {
  return {
    id: track.id,
    name: track.name,
    insertDate: new Date(track.insertDate),
  };
}

export async function mapTracks(tracks: any): Promise<TrackSchema[]> {
  return tracks
    ? await Promise.all(tracks.map(async (p: any) => await parseTrack(p)))
    : [];
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getDashboardData(trackId: number): Promise<TrackSchemaDashboard[]> {
  try {
    const response = await axios.get(`${API_URL}/track/product/${trackId}`);

    const tracks: TrackSchemaDashboard[] = [
      {
        name: response.data.nameTrack,
        expertises: response.data.expertises.map(
          (expertiseresponse: TrackExpertiseSchema) => ({
            name: expertiseresponse.name,

            qualifiers: expertiseresponse.qualifiers.map(
              (qualifierresponse: TrackQualifierSchema) => ({
                name: qualifierresponse.name,
              }),
            ),
          }),
        ),

        partners: response.data.partners.map((partner: TrackPartnerSchema) => ({
          name: partner.name,
          location: partner.location,
          startDate: partner.startDate ? new Date(partner.startDate) : null,

          expertises: partner.expertises.map(
            (expertise: TrackPartnerExpertiseSchema) => ({
              name: expertise.name,
              startDate: expertise.startDate
                ? new Date(expertise.startDate)
                : null,
              endDate: expertise.endDate ? new Date(expertise.endDate) : null,
            }),
          ),

          qualifiers: partner.qualifiers.map(
            (qualifier: TrackPartnerQualifierSchema) => ({
              name: qualifier.name,
              startDate: qualifier.startDate
                ? new Date(qualifier.startDate)
                : null,
              endDate: qualifier.endDate ? new Date(qualifier.endDate) : null,
            }),
          ),
        })),
      },
    ];

    return tracks;
  } catch (error) {
    console.error('Erro ao obter dados do Parceiro:', error);
    throw error;
  }
}
