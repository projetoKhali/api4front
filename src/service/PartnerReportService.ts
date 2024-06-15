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
    partner: partnerReport.pt_name,
    track: partnerReport.tk_name,
    trackStartDate: partnerReport.tk_start_date,
    trackEndDate: partnerReport.tk_end_date,
    expertise: partnerReport.ex_name,
    expertiseStartDate: partnerReport.ex_start_date,
    expertiseEndDate: partnerReport.ex_end_date,
    qualifier: partnerReport.ql_name,
    qualifierStartDate: partnerReport.ql_start_date,
    qualifierEndDate: partnerReport.ql_end_date,
    qualifierExpiration: partnerReport.ql_due_date,
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
