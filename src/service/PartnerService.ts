import {
  PartnerSchema,
  PartnerPostSchema,
  PartnerPatchSchema,
} from '../schemas/Partner';
import { PartnerSchema as PartnerDashboardSchema } from '../schemas/partner/Partner';
import axios from 'axios';

const API_URL: string = 'http://localhost:8080';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parsePartner(partner: any): Promise<PartnerSchema> {
  return {
    id: partner.id,
    companyId: partner.companyId,
    name: partner.name,
    adminName: partner.adminName,
    slogan: partner.slogan,
    country: partner.country,
    city: partner.city,
    address: partner.address,
    compliance: partner.compliance,
    credit: partner.credit,
    status: partner.status,
    memberType: partner.memberType,
    insertDate: new Date(partner.insertDate),
  }
}

export async function mapPartners(partners: any): Promise<PartnerSchema[]> {
  return partners ? await partners.map(async (item: any) => parsePartner(item)) : [];
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getPartners(): Promise<PartnerSchema[]> {
    const response = await axios.get(`${API_URL}/partners`);
    return mapPartners(response.data);
}

export async function getPartner(id: number): Promise<PartnerSchema> {
    const response = await axios.get(`${API_URL}/partners/${id}`);
    return parsePartner(response.data);
}

    const response = await axios.post(`${API_URL}/partners`, partner);
    return parsePartner(response.data);
export async function createPartner(
  partner: PartnerPostSchema,
): Promise<PartnerSchema> {
}

export async function updatePartner(
  id: number, 
  partner: PartnerPatchSchema,
): Promise<PartnerSchema> {
    const response = await axios.patch(`${API_URL}/partners/${id}`, partner);
    return parsePartner(response.data);
}

export async function deletePartner(id: number): Promise<void> {
    await axios.delete(`${API_URL}/partners/${id}`);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getDashboardData(
  url: string,
): Promise<PartnerDashboardSchema[]> {
  try {
    const response = await axios.get<any[]>(url);

    const partners: PartnerDashboardSchema[] = response.data.map((item: any) => ({
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
            endDate: new Date(qualifierItem.endDate),
          })),
        })),
      })),
    }));
    return partners;
  } catch (error) {
    console.error('Erro ao obter dados do Parceiro:', error);
    throw error;
  }
}
