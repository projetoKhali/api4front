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
    partner: partnerReport.partnerName,
    track: partnerReport.trackName,
    trackStartDate: partnerReport.trackStartDate,
    trackEndDate: partnerReport.trackEndDate,
    expertise: partnerReport.expertiseName,
    expertiseStartDate: partnerReport.expertiseStartDate,
    expertiseEndDate: partnerReport.expertiseEndDate,
    qualifier: partnerReport.qualifierName,
    qualifierStartDate: partnerReport.qualifierStartDate,
    qualifierEndDate: partnerReport.qualifierEndDate,
    qualifierExpiration: partnerReport.qualifierDueDate,
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

export default async function getPartnerReports(
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
