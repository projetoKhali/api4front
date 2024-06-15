import {
  ExpertisePartnerMetricSchema,
  PartnerExpertiseMetricSchema,
} from '../schemas/partner/PartnerExpertise';
import { PartnerMetricSchema } from '../schemas/partner/PartnerMetric';
import {
  PartnerTrackMetricSchema,
  TrackDetailSchema,
} from '../schemas/partner/PartnerTrack';

import axios from 'axios';

const API_URL: string = 'http://localhost:8080';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parseMetrics(
  partnerMetrics: any,
): Promise<PartnerMetricSchema> {
  return {
    id: partnerMetrics.pt_id,
    name: partnerMetrics.pt_name,
    city: partnerMetrics.pt_city,
    tracks: partnerMetrics.tracks,
    completedTracks: partnerMetrics.completed_tracks,
    qualifiers: partnerMetrics.qualifiers,
    completedQualifiers: partnerMetrics.completed_qualifiers,
  };
}

export async function mapPartnersMetric(
  partners: any,
): Promise<PartnerMetricSchema[]> {
  return partners
    ? await Promise.all(partners.map(async (p: any) => await parseMetrics(p)))
    : [];
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getPartnerMetrics(): Promise<PartnerMetricSchema[]> {
  const response = await axios.get(`${API_URL}/partnerMetrics`);
  return mapPartnersMetric(response.data);
}

export async function getPartnerMetric(
  partnerId: number,
): Promise<PartnerMetricSchema> {
  const response = await axios.get(`${API_URL}/partnerMetrics/${partnerId}`);
  return parseMetrics(response.data);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getPartnerExpertiseQualifiers(
  partnerNames: string[],
): Promise<ExpertisePartnerMetricSchema[]> {
  const query = partnerNames
    .map(name => `partnerNames=${encodeURIComponent(name)}`)
    .join('&');
  const response = await axios.get(
    `${API_URL}/partner/expertiseQualifierProgress?${query}`,
  );
  return response.data.map(
    (item: any) =>
      ({
        expertise: item.expertise,
        qualifiersExpertise: item.qualifiersExpertise,
        partners: item.partners.map(
          (partner: any) =>
            ({
              partnerName: partner.partnerName,
              location: partner.location,
              finalizedQualifiers: partner.finalizedQualifiers,
            }) as PartnerExpertiseMetricSchema,
        ),
      }) as ExpertisePartnerMetricSchema,
  );
}

export async function getPartnerTrackExpertises(
  partnerNames: string[],
): Promise<PartnerTrackMetricSchema[]> {
  const query = partnerNames
    .map(name => `partnerNames=${encodeURIComponent(name)}`)
    .join('&');
  const response = await axios.get(
    `${API_URL}/partner/trackExpertiseProgress?${query}`,
  );
  return response.data.map(
    (item: any) =>
      ({
        partner: item.partner,
        location: item.location,
        tracks: item.tracks.map(
          (track: any) =>
            ({
              trackName: track.trackName,
              expertisesTrack: track.expertisesTrack,
              progressExpertises: track.progressExpertises,
              finalizedExpertises: track.finalizedExpertises,
            }) as TrackDetailSchema,
        ),
      }) as PartnerTrackMetricSchema,
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */
