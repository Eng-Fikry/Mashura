export interface History {

  patientId: number;
  visitDate: string; // يمكن تحويلها إلى Date إذا كنت بحاجة إلى التعامل مع التاريخ بشكل مباشر
  mainComplaint: string;
  diagnosis: string;
  requiredTests: string;
  prescribedTreatment: string;
  additionalNotes: string;

}
