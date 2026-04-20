export interface Student {
  id: number;
  name: string;
  age: number;
  category: string;
  guardian: string;
  phone: string;
  position: string;
  photo: string;
  goals: number;
  assists: number;
  attendance: number;
  yellowCard?: boolean;
  paymentStatus: 'paid' | 'pending' | 'review';
  address?: string;
  tackles?: number;
  yellowCards?: number;
  redCards?: number;
  accessCode?: string;
}

export interface WaitlistPerson {
  id: number;
  name: string;
  age: number;
  category: string;
  guardian: string;
  phone: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Transaction {
  athlete: string;
  val: string;
  date: string;
  type: string;
  status?: string;
}

export type CategoryType = 'sub11' | 'sub13' | 'sub15' | 'sub17';

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  desc: string;
  age: string;
}
