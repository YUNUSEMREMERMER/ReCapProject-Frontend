import { Pipe, PipeTransform } from '@angular/core';

import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: CarDetail[], filter:string): CarDetail[] {
    filter=filter?filter.toLocaleLowerCase():"";
    return filter?value.filter((c:CarDetail)=>c.brandName.toLocaleLowerCase().indexOf(filter)!==-1):value;
  }

}
