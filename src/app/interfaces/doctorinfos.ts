import { AppointmentForm } from './appointment-form';
import { Clinic } from './clinic';
export interface Doctorinfos{
    id: number;
    firstName: string;
    lastName: string;
    specialtyId: number;
    profilePicture: string;
    specialty: string;
    phoneNumber: string;
    email: string;
  }
  export  type Full=Doctorinfos & AppointmentForm & Clinic