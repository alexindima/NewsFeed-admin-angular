import {Injectable, OnDestroy} from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AutocompleteOptionsFiler } from '../utils/autocomplete-options-filer';
import {CategoryTagState, NameableWithId} from "../interfaces";
import {Subs} from "../utils/subs";

@Injectable()
export abstract class BaseFormAutocompleteService<T extends NameableWithId> implements OnDestroy {
  private _subs: Subs = new Subs();
  private _itemsList: T[] = [];
  private _autocompleteOptions: AutocompleteOptionsFiler<T>[] = [];
  private _controls: FormArray<FormControl<string>> = new FormArray<FormControl<string>>([]);
  private _autocompleteOptionsSubject = new BehaviorSubject<AutocompleteOptionsFiler<T>[]>(this._autocompleteOptions);
  private _controlsSubject = new BehaviorSubject<FormArray<FormControl<string>>>(this._controls);
  autocompleteOptions$ = this._autocompleteOptionsSubject.asObservable();
  controls$ = this._controlsSubject.asObservable();

  protected constructor(
    protected _itemsState: CategoryTagState<T>
  ) {
    this._subs.add = this._itemsState.items$.subscribe((data: T[]) => {
      this._itemsList = data;
    });
  }

  addItem() {
    this._autocompleteOptions.push(
      new AutocompleteOptionsFiler(
        new FormControl('', { nonNullable: true }),
        this._itemsList
      )
    );
    this.updateControls();
  }

  removeItem(index: number) {
    this._autocompleteOptions.splice(index, 1);
    this.updateControls();
  }

  private updateControls() {
    const newControls = this._autocompleteOptions.map((options) => {
      return options.control;
    });
    this._controls.clear();
    newControls.forEach(control => this._controls.push(control));

    this._autocompleteOptionsSubject.next(this._autocompleteOptions);
    this._controlsSubject.next(this._controls);
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
