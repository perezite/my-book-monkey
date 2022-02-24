import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbn'
})
export class IsbnPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) { return null; }
    return `${value.substring(0, 3)}-${value.substring(3)}`;
  }

}
