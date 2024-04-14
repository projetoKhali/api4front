import { TrackSchema } from '../schema/Track';
import axios from 'axios';

export async function getDataMocked(): Promise<TrackSchema[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockedData: any = {
      name: 'Track 1',
      expertises: [
        {
          name: 'Expertise 1',
          qualifier: [{ name: 'Qualifier 1' }, { name: 'Qualifier 2' }],
        },
        {
          name: 'Expertise 2',
          qualifier: [{ name: 'Qualifier 3' }, { name: 'Qualifier 4' }],
        },
        {
          name: 'Expertise 4',
          qualifier: [{ name: 'Qualifier 3' }, { name: 'Qualifier 4' }],
        },
      ],
      partners: [
        {
          name: 'Partner 1',
          location: 'Location 1',
          startDate: '2024-01-01T00:00:00.000Z',
          expertises: [
            {
              name: 'Expertise 1',
              startDate: '2024-01-01T00:00:00.000Z',
              endDate: null,
            },
            {
              name: 'Expertise 2',
              startDate: '2024-01-01T00:00:00.000Z',
              endDate: '2024-02-01T00:00:00.000Z',
            },
          ],
          qualifiers: [
            {
              name: 'Qualifier 1',
              startDate: '2024-01-01T00:00:00.000Z',
              endDate: '2024-01-15T00:00:00.000Z',
            },
            {
              name: 'Qualifier 2',
              startDate: '2024-01-16T00:00:00.000Z',
              endDate: null,
            },
          ],
        },
        {
          name: 'Partner 2',
          location: 'Location 2',
          startDate: '2024-01-01T00:00:00.000Z',
          expertises: [
            {
              name: 'Expertise 1',
              startDate: '2024-01-01T00:00:00.000Z',
              endDate: '2024-02-01T00:00:00.000Z',
            },
            {
              name: 'Expertise 2',
              startDate: '2024-01-01T00:00:00.000Z',
              endDate: null,
            },
          ],
          qualifiers: [
            {
              name: 'Qualifier 3',
              startDate: '2024-01-01T00:00:00.000Z',
              endDate: '2024-02-01T00:00:00.000Z',
            },
            {
              name: 'Qualifier 4',
              startDate: '2024-01-01T00:00:00.000Z',
              endDate: '2024-01-15T00:00:00.000Z',
            },
          ],
        },
      ],
    };

    const Track: TrackSchema[] = [mockedData];
    return Track;
  } catch (error) {
    console.error('Erro ao obter dados mockados do Parceiro:', error);
    throw error;
  }
}

export async function getDataFromEndpoint1(
  url: string,
): Promise<TrackSchema[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await axios.get<any[]>(url);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tracks: TrackSchema[] = response.data.map((item: any) => ({
      name: item.name,

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expertises: item.expertises.map((expertiseItem: any) => ({
        name: expertiseItem.name,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        qualifier: expertiseItem.qualifier.map((qualifierItem: any) => ({
          name: qualifierItem.name,
        })),
      })),

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      partners: item.partners.map((partnerItem: any) => ({
        name: partnerItem.name,
        location: partnerItem.location,
        startDate: partnerItem.startDate
          ? new Date(partnerItem.startDate)
          : null,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expertises: partnerItem.expertises.map((expertise: any) => ({
          name: expertise.name,
          startDate: expertise.startDate ? new Date(expertise.startDate) : null,
          endDate: expertise.endDate ? new Date(expertise.endDate) : null,
        })),

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        qualifiers: partnerItem.qualifiers.map((qualifier: any) => ({
          name: qualifier.name,
          startDate: qualifier.startDate ? new Date(qualifier.startDate) : null,
          endDate: qualifier.endDate ? new Date(qualifier.endDate) : null,
        })),
      })),
    }));
    return tracks;
  } catch (error) {
    console.error('Erro ao obter dados das Tracks:', error);
    throw error;
  }
}
