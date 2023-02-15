import {Pipe, PipeTransform} from '@angular/core';

// это сделал хорошо
@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {
  transform(value: any[] | undefined, separator: string = ', '): string {
    if (value) {
      return value.join(separator);
    }
    return '';
  }
}
