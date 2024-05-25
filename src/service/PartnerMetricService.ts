import { PartnerMetricSchema } from '@/schemas/partner/PartnerMetric';

import axios from 'axios';

const API_URL: string = 'http://localhost:8080';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parsePartnerMetric(
  partnerMetric: any,
): Promise<PartnerMetricSchema> {
  return {
    id: partnerMetric.pt_id,
    name: partnerMetric.pt_name,
    city: partnerMetric.pt_city,
    tracks: partnerMetric.tracks,
    completedTracks: partnerMetric.completed_tracks,
    qualifiers: partnerMetric.qualifiers,
    completedQualifiers: partnerMetric.completed_qualifiers,
  };
}

export async function mapPartnersMetric(
  partnersMetric: any,
): Promise<PartnerMetricSchema[]> {
  return partnersMetric
    ? await Promise.all(
        partnersMetric.map(async (p: any) => await parsePartnerMetric(p)),
      )
    : [];
}
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-enable @typescript-eslint/no-explicit-any */
export async function getPartnerMetrics(): Promise<PartnerMetricSchema[]> {
  const response = await axios.get(`${API_URL}/partnerMetrics`);
  return mapPartnersMetric(response.data);
}

export async function getPartnerMetric(
  partnerId: number,
): Promise<PartnerMetricSchema> {
  const response = await axios.get(`${API_URL}/partnerMetrics/${partnerId}`);
  return parsePartnerMetric(response.data);
}
