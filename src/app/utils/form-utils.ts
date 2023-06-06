import {FormControl} from "@angular/forms";

export type ConvertedToFormControls<T> = {
  [P in keyof T]: FormControl<T[P]>;
};
