export interface PartnerSchema {
  id: number;
  companyId: string;
  name: string;
  adminName: string;
  adminEmail: string;
  slogan: string;
  country: string;
  city: string;
  address: string;
  compliance: boolean;
  credit: boolean;
  status: boolean;
  memberType: boolean;
  insertDate: Date;
}

export type PartnerPostSchema = Omit<PartnerSchema, 'id' | 'insertDate'>;

export type PartnerPatchSchema = Partial<PartnerPostSchema>;
