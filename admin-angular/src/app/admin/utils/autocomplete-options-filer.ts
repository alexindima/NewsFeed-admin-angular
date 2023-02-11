import {Category, Tag} from "../../interfaces";
import {FormControl} from "@angular/forms";

export class AutocompleteOptionsFiler {
  public options: Tag[] | Category[] = [];
  public control!: FormControl;

  constructor(control: FormControl) {
    this.control = control;
  }

  createFilteredOptions(options: Tag[] | Category[]) {
    this.options = options.filter(option => {
      const isNameString = typeof this.control.value === 'string' ? this.control.value : option?.name;
      return option.name.toLowerCase().includes(isNameString.toLowerCase())
    });
  }
}
