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

export async function getDataMocked(): Promise<PartnerSchema[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockedData: any = {
      name: 'Padberg-Quitzon',
      location: 'União da Vitória',
      tracks: [
        {
          name: 'SUSA',
          expertises: [
            {
              name: 'Curso SouBom',
              startDate: '2023-01-01',
              endDate: null,
              qualifier: [
                {
                  name: 'Oracle Cloud Infrastructure 2023 Sales Specialist',
                  startDate: '2023-01-01',
                  endDate: '2023-03-15',
                },
                {
                  name: 'Oracle Analytics 2023 Sales Specialist',
                  startDate: '2023-03-16',
                  endDate: '2023-05-30',
                },
                {
                  name: 'Oracle Integration Cloud 2024 Sales Specialist',
                  startDate: '2023-06-01',
                  endDate: null,
                },
                {
                  name: 'Data Management 2023 Sales Specialist',
                  startDate: null,
                  endDate: null,
                },
                {
                  name: 'Oracle Identity and Access Management 2024 Sales Specialist',
                  startDate: null,
                  endDate: null,
                },
              ],
            },
          ],
        },
        {
          name: 'SELL',
          expertises: [
            {
              name: 'Oracle Cloud Platform',
              startDate: '2023-01-01',
              endDate: '2023-12-31',
              qualifier: [
                {
                  name: 'Oracle Cloud Infrastructure 2023 Sales Specialist',
                  startDate: '2023-01-01',
                  endDate: '2023-02-28',
                },
                {
                  name: 'Oracle Analytics 2023 Sales Specialist',
                  startDate: '2023-03-01',
                  endDate: '2023-04-30',
                },
                {
                  name: 'Oracle Integration Cloud 2024 Sales Specialist',
                  startDate: '2023-05-01',
                  endDate: '2023-06-30',
                },
                {
                  name: 'Data Management 2023 Sales Specialist',
                  startDate: '2023-07-01',
                  endDate: null,
                },
                {
                  name: 'Oracle Identity and Access Management 2024 Sales Specialist',
                  startDate: null,
                  endDate: null,
                },
              ],
            },
            {
              name: 'Configure, Price Quote (CPQ)',
              startDate: '2023-01-01',
              endDate: null,
              qualifier: [
                {
                  name: 'Oracle Cloud Infrastructure 2023 Sales Specialist',
                  startDate: '2023-01-01',
                  endDate: '2023-04-30',
                },
                {
                  name: 'Oracle Analytics 2023 Sales Specialist',
                  startDate: '2023-05-01',
                  endDate: '2023-08-31',
                },
                {
                  name: 'Oracle Integration Cloud 2024 Sales Specialist',
                  startDate: '2023-09-01',
                  endDate: '2023-10-31',
                },
                {
                  name: 'Data Management 2023 Sales Specialist',
                  startDate: '2023-11-01',
                  endDate: null,
                },
                {
                  name: 'Oracle Identity and Access Management 2024 Sales Specialist',
                  startDate: null,
                  endDate: null,
                },
              ],
            },
            {
              name: 'Sales Automation',
              startDate: '2023-01-01',
              endDate: '2023-10-31',
              qualifier: [
                {
                  name: 'Oracle Cloud Infrastructure 2023 Sales Specialist',
                  startDate: '2023-01-01',
                  endDate: '2023-04-30',
                },
                {
                  name: 'Oracle Analytics 2023 Sales Specialist',
                  startDate: '2023-05-01',
                  endDate: '2023-08-31',
                },
                {
                  name: 'Oracle Integration Cloud 2024 Sales Specialist',
                  startDate: '2023-09-01',
                  endDate: '2023-10-31',
                },
                {
                  name: 'Data Management 2023 Sales Specialist',
                  startDate: '2023-11-01',
                  endDate: '2023-10-31',
                },
                {
                  name: 'Oracle Identity and Access Management 2024 Sales Specialist',
                  startDate: null,
                  endDate: '2023-10-31',
                },
              ],
            },
          ],
        },
      ],
    };

    const partners: PartnerSchema[] = [mockedData];
    return partners;
  } catch (error) {
    console.error('Erro ao obter dados mockados do Parceiro:', error);
    throw error;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getDataMocked () {
  return [];
}

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
  const response = await axios.post(`${API_URL}/partners`, partner);
  return parsePartner(response.data);
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
