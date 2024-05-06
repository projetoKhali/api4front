import { PartnerTrackSchema } from '@/schemas/partner/PartnerTrack';
import {
  PartnerSchema,
  PartnerPostSchema,
  PartnerPatchSchema,
} from '../schemas/Partner';
import { PartnerSchemaDashboard } from '../schemas/partner/Partner';
import axios from 'axios';
import { PartnerExpertiseSchema } from '@/schemas/partner/PartnerExpertise';
import { PartnerQualifierSchema } from '@/schemas/partner/PartnerQualifier';

const API_URL: string = 'http://localhost:8080';

export async function parsePartner(partner: any): Promise<PartnerSchema> {
  return {
    id: partner.id,
    companyId: partner.companyId,
    name: partner.name,
    adminEmail: partner.adminEmail,
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
  };
}

export async function mapPartners(partners: any): Promise<PartnerSchema[]> {
  return partners
    ? await partners.map(async (item: any) => parsePartner(item))
    : [];
}

export async function getPartners(): Promise<PartnerSchema[]> {
  const response = await axios.get(`${API_URL}/partners`);
  return mapPartners(response.data);
}

/* eslint-enable @typescript-eslint/no-explicit-any */
export async function getPartner(id: number): Promise<PartnerSchema> {
  const response = await axios.get(`${API_URL}/partners/${id}`);
  return parsePartner(response.data);
}

export async function createPartner(
  partner: PartnerPostSchema,
): Promise<PartnerPostSchema> {
  const response = await axios.post(`${API_URL}/partner`, partner);
  return parsePartner(response.data);
}

export async function updatePartner(
  id: number,
  partner: PartnerPatchSchema,
): Promise<PartnerSchema> {
  const response = await axios.patch(`${API_URL}/partner/${id}`, partner);
  return parsePartner(response.data);
}

export async function deletePartner(id: number): Promise<void> {
  await axios.delete(`${API_URL}/partners/${id}`);
}

export async function getDashboardData(
  id: number,
): Promise<PartnerSchemaDashboard[]> {
  try {
    const response = await axios.get(`${API_URL}/partner/${id}`);

    const partners: PartnerSchemaDashboard[] = [
      {
        name: response.data.name,
        location: response.data.location,
        tracks: response.data.tracks.map((trackItem: PartnerTrackSchema) => ({
          name: trackItem.name,

          expertises: trackItem.expertises.map(
            (expertiseItem: PartnerExpertiseSchema) => ({
              name: expertiseItem.name,
              startDate: new Date(expertiseItem.startDate),
              endDate: new Date(expertiseItem.endDate),

              qualifiers: expertiseItem.qualifiers.map(
                (qualifierItem: PartnerQualifierSchema) => ({
                  name: qualifierItem.name,
                  startDate: new Date(qualifierItem.startDate),
                  endDate: new Date(qualifierItem.endDate),
                }),
              ),
            }),
          ),
        })),
      },
    ];
    return partners;
  } catch (error) {
    console.error('Erro ao obter dados do Parceiro:', error);
    throw error;
  }
}
