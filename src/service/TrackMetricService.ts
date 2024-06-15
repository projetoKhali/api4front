import { TrackMetricsSchema } from '../schemas/track/TrackMetrics';
import axios from 'axios';

const API_URL: string = 'http://localhost:8080';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parseMetrics(
  trackMetrics: any,
): Promise<TrackMetricsSchema> {
  return {
    trackId: trackMetrics.tkId,
    trackName: trackMetrics.tkName,
    expertiseCount: trackMetrics.expertiseCount,
    qualifierCount: trackMetrics.qualifierCount,
    partnerCount: trackMetrics.partnerCount,
    expertiseCompletedOnTime: trackMetrics.avgExpertiseCompletionTime,
    qualifierCompletedOnTime: trackMetrics.avgQualifierCompletionTime,
    expertiseCompletedOnPercentage:
      trackMetrics.avgExpertiseCompletionPercentage,
    qualifierCompletedOnPercentage:
      trackMetrics.avgQualifierCompletionPercentage,
    avgExpiredQualifiers: trackMetrics.avgExpiredQualifiers,
    avgTrackCompletionPercentage: trackMetrics.avgTrackCompletionPercentage,
    avgTrackCompletionTime: trackMetrics.avgTrackCompletionTime,
  };
}

export async function mapTrackMetrics(
  tracks: any,
): Promise<TrackMetricsSchema[]> {
  return tracks
    ? await Promise.all(tracks.map(async (t: any) => await parseMetrics(t)))
    : [];
}

/* eslint-enable @typescript-eslint/no-explicit-any */
export async function getTrackMetrics(): Promise<TrackMetricsSchema[]> {
  const response = await axios.get(`${API_URL}/trackmetrics`);
  return await mapTrackMetrics(response.data);
}

export async function getTrackMetric(
  trackId: number,
): Promise<TrackMetricsSchema> {
  const response = await axios.get(`${API_URL}/trackmetrics/${trackId}`);
  return await parseMetrics(response.data);
}
