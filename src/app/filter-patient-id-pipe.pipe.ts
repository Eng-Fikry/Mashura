import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPatientId',
  standalone: true
})
export class FilterPatientIdPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    return items.filter(item => 
      item.patientId && item.patientId.toString().includes(searchTerm)
    );
  }
}
