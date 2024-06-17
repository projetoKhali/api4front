import downloadCSV from './csv';
import getPartnerReports from '../service/PartnerReportService';
import { PartnerReportSchema } from '@/schemas/partner/PartnerReport';
import { Page } from '../schemas/Page';

const PAGE_SIZE = 100;

export default async function downloadPartnerCSV() {
  let reportData: PartnerReportSchema[] = [];
  let currentPage: Page<PartnerReportSchema> = await getPartnerReports(
    0,
    PAGE_SIZE,
  );

  do {
    reportData = reportData.concat(currentPage.content);
    currentPage = await getPartnerReports(currentPage.index + 1, PAGE_SIZE);
  } while (!!currentPage && !currentPage.last);

  const filename = 'partners_' + new Date().toISOString() + '.csv';

  downloadCSV(reportData, filename);
}
