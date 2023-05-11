import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe<T> implements PipeTransform {
  transform(value: T, separator: string = ', '): T | string {
    if (Array.isArray(value)) {
      return value.join(separator);
    }
    return value;
  }
}
