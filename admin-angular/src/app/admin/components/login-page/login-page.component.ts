import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginUser} from "../../../interfaces";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Subs} from "../../../utils/subs";
import {AuthState} from "../../../states/auth.state";
import {finalize} from "rxjs/operators";

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private _subs = new Subs();
  submitted = false;
  form!: FormGroup;

  constructor(
    private _authService: AuthService,
    public authState: AuthState,
    private _router: Router,
    private _fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.form = this._fb.nonNullable.group<LoginForm>({
      email: this._fb.control(
        '', [
          Validators.required,
          Validators.email
        ]
      ),
      password: this._fb.control(
        '', [
          Validators.required,
          Validators.minLength(6)
        ]
      )
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    const user: LoginUser = this.form.value;

    this._subs.add = this._authService.login(user).pipe(
      finalize(() => this.submitted = false)
    ).subscribe(() => {
      this.form.reset();
      this._router.navigate(['/admin', 'articles']).then();
    })

  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
