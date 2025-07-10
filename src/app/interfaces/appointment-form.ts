export interface AppointmentForm {

    id: number;
    clinicName: string;
    doctorId: number;
    clinicId: number;
    doctorName: string;
    patientId: number;
    patientName: string;
    day: string;
    time: string;   
    status: 'Pending' | 'Confirmed' | 'Cancelled'|'Completed';  


}
export interface AppointmentForm2 {

    doctorId: number;
    clinicName: string;
    clinicId: number;
    patientId: number;
    dayOfWeek: string;
    time: string;   
    status: 'Pending' | 'Confirmed' | 'Cancelled'|'Completed';  



}

