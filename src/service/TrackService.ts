import { TrackExpertiseSchema } from '@/schemas/track/TrackExpertise';
import { TrackSchema } from '../schemas/track/Track';
import axios from 'axios';
import { TrackQualifierSchema } from '@/schemas/track/TrackQualifier';
import { TrackPartnerSchema } from '@/schemas/track/TrackPartner';
import { TrackPartnerExpertiseSchema } from '@/schemas/track/TrackPartnerExpertise';
import { TrackPartnerQualifierSchema } from '@/schemas/track/TrackPartnerQualifier';

const API_URL: string = 'http://localhost:8080';

export async function getDataProduct(
  trackName: string,
): Promise<TrackSchema[]> {
  try {
  const response = await axios.get(`${API_URL}/track/product/${trackName}`);

  const tracks:  TrackSchema[] = [{
    name: response.data.nameTrack,
    expertises: response.data.expertises.map((expertiseresponse: TrackExpertiseSchema) => ({
      name: expertiseresponse.name,

      qualifiers: expertiseresponse.qualifiers.map((qualifierresponse: TrackQualifierSchema) => ({
        name: qualifierresponse.name,
      })),
    })),

    partners: response.data.partners.map((partnerresponse: TrackPartnerSchema) => ({
      name: partnerresponse.name,
      location: partnerresponse.location,
      startDate: partnerresponse.startDate ? new Date(partnerresponse.startDate) : null,

      expertises: partnerresponse.expertises.map((expertise: TrackPartnerExpertiseSchema) => ({
        name: expertise.name,
        startDate: expertise.startDate ? new Date(expertise.startDate) : null,
        endDate: expertise.endDate ? new Date(expertise.endDate) : null,
      })),

      qualifiers: partnerresponse.qualifiers.map((qualifier: TrackPartnerQualifierSchema) => ({
        name: qualifier.name,
        startDate: qualifier.startDate ? new Date(qualifier.startDate) : null,
        endDate: qualifier.endDate ? new Date(qualifier.endDate) : null,
      })),
    })),
  }];
  return tracks;
} catch (error) {
  console.error('Erro ao obter dados do Parceiro:', error);
  throw error;
 }
}
