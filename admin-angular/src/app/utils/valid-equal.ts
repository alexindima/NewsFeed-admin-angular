import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

// спизжено, сразу видно руку мастера
export function appValidEqualFactory(items: string[], key: string): ValidatorFn {
  return (control: AbstractControl) => {
    if (control instanceof FormGroup) {
      let first = control.controls[items[0]].value;
      for (let i = 1; i < items.length; i++) {
        let current = control.controls[items[i]].value;
        if (current !== first) {
          return {
            customKey: {
              key
            }
          };
        }
      }
    }
    return null;
  };
}
