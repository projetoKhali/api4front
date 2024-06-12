import { Page } from '../schemas/Page';
import { PartnerReportSchema } from '../schemas/partner/PartnerReport';
import axios from 'axios';

const API_URL: string = 'http://localhost:8080';
const DEFAULT_PAGE_SIZE: number = 10;

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function parseReport(
  partnerReport: any,
): Promise<PartnerReportSchema> {
  return {
    partner: partnerReport.partner,
    track: partnerReport.track,
    trackStartDate: partnerReport.trackStart,
    trackEndDate: partnerReport.trackEnd,
    expertise: partnerReport.expertise,
    expertiseStartDate: partnerReport.expertiseStart,
    expertiseEndDate: partnerReport.expertiseEnd,
    qualifier: partnerReport.qualifier,
    qualifierStartDate: partnerReport.qualifierStart,
    qualifierEndDate: partnerReport.qualifierEnd,
    qualifierExpiration: partnerReport.qualifierExpiration,
  };
}

export async function mapPartnersReport(
  reports: any,
): Promise<PartnerReportSchema[]> {
  return reports
    ? await Promise.all(reports.map(async (p: any) => await parseReport(p)))
    : [];
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getPartnerReports(
  page?: number,
  size?: number,
): Promise<Page<PartnerReportSchema>> {
  const response = await axios.get(
    `${API_URL}/partnerReports?page=${page || 0}&size=${size || DEFAULT_PAGE_SIZE}`,
  );
  return Page.from<PartnerReportSchema>({
    ...response.data,
    content: await mapPartnersReport(response.data.content),
  });
}
