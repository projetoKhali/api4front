import { getTrackMetrics } from '../service/TrackMetricService';
import downloadCSV from './csv';
import { TrackMetricsSchema } from '@/schemas/track/TrackMetrics';

export default async function downloadTrackCSV() {
    let reportData: TrackMetricsSchema[] = await getTrackMetrics();
  
    const filename = 'track_' + new Date().toISOString() + '.csv';
  
    downloadCSV(reportData, filename);
  }