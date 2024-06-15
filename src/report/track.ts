import { getTrackMetrics } from '../service/TrackMetricsService';
import downloadCSV from './csv';
import { TrackMetricsSchema } from '@/schemas/track/TrackMetrics';

export default async function downloadTrackCSV() {
  const reportData: TrackMetricsSchema[] = await getTrackMetrics();

  const filename = 'track_' + new Date().toISOString() + '.csv';

  downloadCSV(reportData, filename);
}
