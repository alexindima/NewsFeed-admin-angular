import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LoaderState} from "./states/loader.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{
  constructor(
    public loaderState: LoaderState,
  ) {
  }

}
