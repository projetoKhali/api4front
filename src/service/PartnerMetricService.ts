import { Page } from '../schemas/Page';
import { PartnerMetricSchema } from '@/schemas/partner/PartnerMetric';

import axios from 'axios';

const API_URL: string = 'http://localhost:8080';
const DEFAULT_PAGE_SIZE: number = 10;

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parsePartnerMetric(
  partnerMetric: any,
): Promise<PartnerMetricSchema> {
  return {
    id: partnerMetric.id,
    name: partnerMetric.name,
    city: partnerMetric.city,
    tracks: partnerMetric.tracks,
    completedTracks: partnerMetric.completedTracks,
    qualifiers: partnerMetric.qualifiers,
    completedQualifiers: partnerMetric.completedQualifiers,
  };
}

export async function mapPartnersMetric(
  data: any,
): Promise<PartnerMetricSchema[]> {
  return data
    ? await Promise.all(data.map(async (p: any) => await parsePartnerMetric(p)))
    : [];
}
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-enable @typescript-eslint/no-explicit-any */
export async function getPartnerMetrics(
  partialName: string,
  page?: number,
  size?: number,
): Promise<Page<PartnerMetricSchema>> {
  const response = await axios.post(
    `${API_URL}/partnerMetrics?` +
      `page=${page || 0}&` +
      `size=${size || DEFAULT_PAGE_SIZE}`,
    { partialName },
  );
  return Page.from<PartnerMetricSchema>({
    ...response.data,
    content: await mapPartnersMetric(response.data.content),
  });
}

export async function getPartnerMetric(
  partnerId: number,
): Promise<PartnerMetricSchema> {
  const response = await axios.get(`${API_URL}/partnerMetrics/${partnerId}`);
  return parsePartnerMetric(response.data);
}
