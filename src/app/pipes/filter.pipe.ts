import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/car-detail-dto';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: CarDetailDto[], filterText: string): CarDetailDto[] {
    return filterText
      ? value.filter((c) =>
          c.carName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
        )
      : value;
  }
}
