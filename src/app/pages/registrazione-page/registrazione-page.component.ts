import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewUser, UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-registrazione-page',
  templateUrl: './registrazione-page.component.html',
  styleUrls: ['./registrazione-page.component.css']
})
export class RegistrazionePageComponent {

  registrazioneForm: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilderRegistrazione: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.registrazioneForm = this.formBuilderRegistrazione.group(
      {
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        email: ['', [Validators.required, Validators.minLength(5), Validators.pattern('(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@([a-zA-Z]*.[!-~a-zA-Z]*)$')]],
        telefono: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(9), Validators.maxLength(10)]],
        password: ['', [ Validators.required, Validators.minLength(4)]]
      });
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  salvaDati(): void {
    if (this.registrazioneForm?.status === 'VALID') {
      const newUser: NewUser = this.registrazioneForm.value;
      console.log("newUser");
      console.log(newUser);
      this.userService.registration(newUser).subscribe({
        next: (data) => {
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) =>
        {
          if (error.status === 500) {
            console.error('registrazione request error: ' + error.status);
            window.alert("Errore server 500");
          }
        }
      });

    }
  }
}
