import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {
  transform(value: any[] | undefined, separator: string = ', '): string {
    // надёжнее тогда будет проверять через Array.isArray(value)
    if (value) {
      return value.join(separator);
    }
    return '';
  }
}
