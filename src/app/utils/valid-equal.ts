import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

// функция не используется
export function validEqual(controlNameToCompare: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlToCompare = control.parent!.get(controlNameToCompare);

    if (controlToCompare && controlToCompare.value !== control.value && controlToCompare.dirty) {
      return { 'validEqual': true };
    }

    return null;
  };
}
