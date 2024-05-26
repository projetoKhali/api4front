import { ExpertisePartnerMetricSchema, PartnerExpertiseMetricSchema } from '@/schemas/partner/PartnerExpertise';
import { PartnerMetricSchema } from '@/schemas/partner/PartnerMetric';
import { PartnerTrackMetricSchema, TrackDetailSchema } from '@/schemas/partner/PartnerTrack';

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

export async function getPartnerExpertiseQualifiers(partnerNames: string[]): Promise<ExpertisePartnerMetricSchema[]> {
  const query = partnerNames.map(name => `partnerNames=${encodeURIComponent(name)}`).join('&');
  const response = await axios.get(`${API_URL}/partner/expertiseQualifierProgress?${query}`);
  return response.data.map((item: any) => ({
    expertise: item.expertise,
    qualifiersExpertise: item.qualifiersExpertise,
    partners: item.partners.map((partner: any) => ({
      partnerName: partner.partnerName,
      location: partner.location,
      finalizedQualifiers: partner.finalizedQualifiers,
    } as PartnerExpertiseMetricSchema)),
  } as ExpertisePartnerMetricSchema));
}

export async function getPartnerTrackExpertises(partnerNames: string[]): Promise<PartnerTrackMetricSchema[]> {
  const query = partnerNames.map(name => `partnerNames=${encodeURIComponent(name)}`).join('&');
  const response = await axios.get(`${API_URL}/partner/trackExpertiseProgress?${query}`);
  return response.data.map((item: any) => ({
    partner: item.partner,
    location: item.location,
    tracks: item.tracks.map((track: any) => ({
      trackName: track.trackName,
      expertisesTrack: track.expertisesTrack,
      progressExpertises: track.progressExpertises,
      finalizedExpertises: track.finalizedExpertises,
    } as TrackDetailSchema)),
  } as PartnerTrackMetricSchema));
}
