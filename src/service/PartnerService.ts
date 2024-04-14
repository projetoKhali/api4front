import axios from 'axios';
import { PartnerSchema } from '../schema/Partner';

export default {
  async getDataFromEndpoint2(url: string): Promise<PartnerSchema[]> {
    try {
      const response = await axios.get<any[]>(url);
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
      console.error('Erro ao obter dados do Parceiro:', error);
      throw error;
    }
  }
};
