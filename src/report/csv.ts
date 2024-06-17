import Papa from 'papaparse';
import { saveAs } from 'file-saver';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function downloadCSV(data: any[], filename: string) {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
}
/* eslint-enable @typescript-eslint/no-explicit-any */
