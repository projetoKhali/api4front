import { TrackExpertiseSchema } from '@/schemas/track/TrackExpertise';
import { TrackSchema } from '../schemas/track/Track';
import axios from 'axios';
import { TrackQualifierSchema } from '@/schemas/track/TrackQualifier';
import { TrackPartnerSchema } from '@/schemas/track/TrackPartner';
import { TrackPartnerExpertiseSchema } from '@/schemas/track/TrackPartnerExpertise';
import { TrackPartnerQualifierSchema } from '@/schemas/track/TrackPartnerQualifier';

const API_URL: string = 'http://localhost:8080';

export async function getDashboardData(trackId: number): Promise<TrackSchema[]> {
  try {
    const response = await axios.get(`${API_URL}/track/product/${trackId}`);

    const tracks: TrackSchema[] = [
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
