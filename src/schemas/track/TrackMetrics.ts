export interface TrackMetricsSchema {
  trackId: number;
  trackName: string;
  expertiseCount: number;
  qualifierCount: number;
  partnerCount: number;
  expertiseCompletedOnTime: number;
  qualifierCompletedOnTime: number;
  expertiseCompletedOnPercentage: number;
  qualifierCompletedOnPercentage: number;
  avgExpiredQualifiers: number;
  avgTrackCompletionPercentage: number;
  avgTrackCompletionTime: number;
}
