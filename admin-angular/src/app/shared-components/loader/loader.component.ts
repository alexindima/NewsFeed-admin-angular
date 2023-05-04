import {Component} from '@angular/core';
import {LoaderState} from "../../states/loader.state";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(
    public loaderState: LoaderState,
  ) {
  }
}
