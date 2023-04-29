import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LoaderState} from "./states/loader.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // опасная строка, ещё и на самом корне, я почти уверен оно может тебе в ногу выстрелить и не раз, заставляешь всё приложение работать в режиме пуш изменений, только обновляться через @Input(), опасно, есть смысл как следует погуглить про эту фичу
})
export class AppComponent{
  constructor(
    public loaderState: LoaderState,
  ) {
  }

}
