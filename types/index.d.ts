export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  unique_id: string;
  is_active: boolean;
  date_created: Date;
  last_updated: Date;
};

export type Workspace = {
  id: number;
  name: string;
  slug: string;
  created_by: number;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;

  creator: User;
};

export type Facility = {
  id: number;
  name: string;
  organization_id: number;
  description: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  country: string;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;

  creator: User;
};

export type Asset = {
  id: number;
  name: string;
  organization_id: number;
  facility_id: number;
  description: string;
  installed_quantity: number;
  serial_number?: string;
  country: string;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;

  creator: User;
};
