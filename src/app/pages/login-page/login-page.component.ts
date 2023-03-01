import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Account, UserService} from "../../services/user.service";
import {TranslateService} from "@ngx-translate/core";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginFormModel: FormGroup;
  showPassword: boolean = false;
  showErrorAuth: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private translateService: TranslateService,
              private router: Router) {
    this.loginFormModel = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(6),
        // tslint:disable-next-line:max-line-length
        //Validators.pattern('(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4)
      ]]
    });
  }

  ngOnInit(): void {
    this.initTranslate();
  }

  validationMessages = {
    username: [
      {type: 'required', message: 'email is required.'},
      {type: 'minlength', message: 'email must be at least 6 characters long.'},
      {type: 'pattern', message: 'Your email is invalid'},
      {type: 'incorrect', message: 'is invalid'}
    ],
    password: [
      {type: 'required', message: 'Password is required'},
      {type: 'minlength', message: 'Password must be at least 4 characters long.'},
      {type: 'incorrect', message: 'is invalid'}
    ]
  };

  initTranslate() {
    this.translateService.get('EMAIL_REQUIRED_MESSAGE').subscribe((data) => {
      this.validationMessages.username[0].message = data;
    });
    this.translateService.get('EMAIL_MIN_LENGTH_MESSAGE').subscribe((data) => {
      this.validationMessages.username[1].message = data;
    });
    this.translateService.get('EMAIL_PATTERN_MESSAGE').subscribe((data) => {
      this.validationMessages.username[2].message = data;
    });
    this.translateService.get('PASSWORD_REQUIRED_MESSAGE').subscribe((data) => {
      this.validationMessages.password[0].message = data;
    });
    this.translateService.get('PASSWORD_MIN_LENGTH_MESSAGE').subscribe((data) => {
      this.validationMessages.password[1].message = data;
    });
    this.translateService.get('CREDENZIALI_INVALID_MESSAGE').subscribe((data) => {
      this.validationMessages.username[3].message = data;
      this.validationMessages.password[2].message = data;
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginFormModel.status === 'VALID') {
      const account: Account = this.loginFormModel.value;
      console.log(account);
      this.userService.login(account).subscribe({
        next: (data) =>
        {
          this.loginFormModel.reset();
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) =>
        {
          console.log(error);
          if (error.status === 401) {
            console.error('login request error: ' + error.status);
            this.loginFormModel.controls['username'].setErrors({'incorrect': true});
            this.loginFormModel.controls['password'].setErrors({'incorrect': true});
          }
          if (error.status === 500) {
            console.error('login request error: ' + error.status);
            window.alert("Errore server 500");
          }
        }
      });

    }
  }
}
