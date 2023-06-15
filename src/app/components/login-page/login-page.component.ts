import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Subs} from "../../utils/subs";
import {AuthState} from "../../states/auth.state";
import {finalize} from "rxjs/operators";
import {LoginUser} from "../../entities/user.interface";
import {ConvertedToFormControls} from "../../utils/form-utils";

// тут точно такой же интерфейс, что и LoginUser, можно использовать LoginUser
interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private _subs = new Subs();
  // тоже в loading бы переименовала как описала в BaseEditPageComponent
  submitted = false;
  form!: FormGroup<ConvertedToFormControls<LoginForm>>;

  constructor(
    private _authService: AuthService,
    public authState: AuthState,
    private _router: Router,
    private _fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.form = this._fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    const user: LoginUser = this.form.value as LoginUser;

    this._subs.add = this._authService.login(user).pipe(
      finalize(() => this.submitted = false)
    ).subscribe(() => {
      this.form.reset();
      this._router.navigate(['articles']).then();
    })

  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
