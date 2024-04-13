import axios from 'axios';
import { PartnerSchema } from '../schemas/Partner';

export default {
  async getDataFromEndpoint2(): Promise<PartnerSchema[]> {
    try {
      const response = await axios.get<any[]>('URL_DO_SEU_ENDPOINT_2');
      const partners: PartnerSchema[] = response.data.map((item: any) => ({
        name: item.name,
        location: item.location,
        tracks: item.tracks.map((trackItem: any) => ({
          name: trackItem.name,
          expertises: trackItem.expertises.map((expertiseItem: any) => ({
            name: expertiseItem.name,
            startDate: new Date(expertiseItem.startDate),
            endDate: new Date(expertiseItem.endDate),
            qualifier: expertiseItem.qualifier.map((qualifierItem: any) => ({
              name: qualifierItem.name,
              startDate: new Date(qualifierItem.startDate),
              endDate: new Date(qualifierItem.endDate)
            }))
          }))
        }))
      }));
      return partners;
    } catch (error) {
      console.error('Erro ao obter dados do endpoint 2:', error);
      throw error;
    }
  }
};