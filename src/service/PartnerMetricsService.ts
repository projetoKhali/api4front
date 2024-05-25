import { Page } from '../schemas/Page';
import { PartnerMetricsSchema } from '@/schemas/partner/PartnerMetrics';

import axios from 'axios';

const API_URL: string = 'http://localhost:8080';
const DEFAULT_PAGE_SIZE: number = 10;

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parsePartnerMetrics(
  partnerMetrics: any,
): Promise<PartnerMetricsSchema> {
  return {
    id: partnerMetrics.id,
    name: partnerMetrics.name,
    city: partnerMetrics.city,
    tracks: partnerMetrics.tracks,
    completedTracks: partnerMetrics.completedTracks,
    qualifiers: partnerMetrics.qualifiers,
    completedQualifiers: partnerMetrics.completedQualifiers,
  };
}

export async function mapPartnersMetrics(
  data: any,
): Promise<PartnerMetricsSchema[]> {
  return data
    ? await Promise.all(data.map(async (p: any) => await parsePartnerMetrics(p)))
    : [];
}
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-enable @typescript-eslint/no-explicit-any */
export async function getListPartnerMetrics(
  partialName: string,
  page?: number,
  size?: number,
): Promise<Page<PartnerMetricsSchema>> {
  const response = await axios.post(
    `${API_URL}/partnerMetrics?` +
      `page=${page || 0}&` +
      `size=${size || DEFAULT_PAGE_SIZE}`,
    { partialName },
  );
  return Page.from<PartnerMetricsSchema>({
    ...response.data,
    content: await mapPartnersMetrics(response.data.content),
  });
}

export async function getPartnerMetrics(
  partnerId: number,
): Promise<PartnerMetricsSchema> {
  const response = await axios.get(`${API_URL}/partnerMetrics/${partnerId}`);
  return parsePartnerMetrics(response.data);
}
