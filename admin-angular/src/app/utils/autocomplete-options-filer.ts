import {FormControl} from "@angular/forms";
import {NameableWithId} from "../interfaces";

export class AutocompleteOptionsFiler<T extends NameableWithId> {
  public options: string[] = [];
  public control!: FormControl<string>;

  constructor(
    control: FormControl<string>,
    private allOptions: NameableWithId[],
  ) {
    this.control = control;
  }

  createFilteredOptions() {
    const allOptionsNames = this.allOptions.map(option => option.name)
    this.options = allOptionsNames.filter(name => {
      console.log(name.toLowerCase().includes(this.control.value.toLowerCase()))
      return name.toLowerCase().includes(this.control.value.toLowerCase())
    });
  }
}
