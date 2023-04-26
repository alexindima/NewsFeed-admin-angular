import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginUser} from "../../../interfaces";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subs} from "../../../utils/subs";
import {AuthState} from "../../../states/auth.state";

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
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
  message: string = ''; // мусор

  constructor(
    private _authService: AuthService,
    public authState: AuthState,
    public route: ActivatedRoute, // мусор
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    // не, используй FormBuilder для форм, много текста иначе
    this.form = new FormGroup<LoginForm>({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)]
      })
    });

    // это задача резолвера, не компонента
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/admin', 'articles']).then();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    // можно проще body = this.form.value
    const user: LoginUser = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this._subs.add = this._authService.login(user).subscribe(() => {
      this.form.reset();
      this._router.navigate(['/admin', 'articles']).then();
      this.submitted = false;
    }, () => {
      this.submitted = false; // дублируешь строку, делают через pipe(finalize(() => this.submitted = false) в апи запросе
    })

  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
