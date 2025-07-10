import { Day } from "./day";

export interface Clinic {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  logo: string | null;
  price: number;
  doctorId: number;
  doctorName: string;
  doctorPhone: string;
  doctorEmail: string;
  doctorSpecialty: string;
  doctorProfilePicture: string | null;
  visitDuration: number;
  government: string;
  days: Day[]; // ✅ الصيغة الصحيحة
}