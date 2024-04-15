import { PartnerSchema } from '../schema/Partner';

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

import axios from 'axios';

export async function getDataPartner(url: string): Promise<PartnerSchema[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await axios.get<any[]>(url);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const partners: PartnerSchema[] = response.data.map((item: any) => ({
      name: item.name,
      location: item.location,

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tracks: item.tracks.map((trackItem: any) => ({
        name: trackItem.name,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expertises: trackItem.expertises.map((expertiseItem: any) => ({
          name: expertiseItem.name,
          startDate: new Date(expertiseItem.startDate),
          endDate: new Date(expertiseItem.endDate),

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
