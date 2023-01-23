import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../interfaces";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  submitted = false;
  form: FormGroup = new FormGroup({});
  message: string = ''

  constructor(public auth: AuthService,
              private router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, login again'
      }
    })
    this.form.addControl('email', new FormControl(null, [Validators.email, Validators.required]));
    this.form.addControl('password', new FormControl(null, [Validators.minLength(6), Validators.required]));
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'articles']);
    })

    this.submitted = false
  }

}
