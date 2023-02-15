import {Category, Tag} from "../../interfaces";
import {FormControl} from "@angular/forms";

export class AutocompleteOptionsFiler {
  public options: Tag[] | Category[] = [];
  public control!: FormControl;

  constructor(control: FormControl) {
    this.control = control;
  }

  // не-не, эта фича сейчас явно зависит от более низкоуровневых интерфейсов
  // а по сути, ей ничего точно нельзя знать об этих интерфейсах, т.к. ей пофиг что за данные она прогоняет,
  // лишь бы был name у каждого элемента массива внутри
  createFilteredOptions(options: Tag[] | Category[]) {
    this.options = options.filter(option => {
      const isNameString = typeof this.control.value === 'string' ? this.control.value : option?.name;
      return option.name.toLowerCase().includes(isNameString.toLowerCase())
    });
  }
}
