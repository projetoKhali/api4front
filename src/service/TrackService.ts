import axios from 'axios';
import { TrackSchema } from '../schema/Track';

export default {
  async getDataFromEndpoint1(): Promise<TrackSchema[]> {
    try {
      const response = await axios.get<any[]>('URL_DO_SEU_ENDPOINT_1');
      const tracks: TrackSchema[] = response.data.map((item: any) => ({
        name: item.name,
        expertises: item.expertises.map((expertiseItem: any) => ({
          name: expertiseItem.name,
          qualifier: expertiseItem.qualifier.map((qualifierItem: any) => ({
            name: qualifierItem.name
          }))
        })),
        partners: item.partners.map((partnerItem: any) => ({
          name: partnerItem.name,
          location: partnerItem.location,
          startDate: new Date(partnerItem.startDate),
          expertises: partnerItem.expertises.map((expertise: any) => ({
            name: expertise.name,
            startDate: new Date(expertise.startDate),
            endDate: new Date(expertise.endDate)
          })),
          qualifiers: partnerItem.qualifiers.map((qualifier: any) => ({
            name: qualifier.name,
            startDate: new Date(qualifier.startDate),
            endDate: new Date(qualifier.endDate)
          }))
        }))
      }));
      return tracks;
    } catch (error) {
      console.error('Erro ao obter dados do endpoint 1:', error);
      throw error;
    }
  }
};
