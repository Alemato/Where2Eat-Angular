import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dati-utente-page',
  templateUrl: './dati-utente-page.component.html',
  styleUrls: ['./dati-utente-page.component.css']
})
export class DatiUtentePageComponent {

  utenteForm: FormGroup
  user$: BehaviorSubject<User>;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.user$ = userService.getUser();
    this.utenteForm = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        email: ['', [Validators.required, Validators.minLength(5), Validators.pattern('(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@([a-zA-Z]*.[!-~a-zA-Z]*)$')]],
        telefono: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(9), Validators.maxLength(10)]]
      });
  }

  ngOnInit() {
    this.utenteForm = this.formBuilder.group(
      {
        nome: [this.user$.value.nome, Validators.required],
        cognome: [this.user$.value.cognome, Validators.required],
        email: [this.user$.value.email, [Validators.required, Validators.pattern('(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@([a-zA-Z]*.[!-~a-zA-Z]*)$')]],
        telefono: [this.user$.value.telefono, [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(9), Validators.maxLength(10)]]
      });
  }

  salvaDati(): void {
    if (this.utenteForm?.status === 'VALID') {
      const user: User = this.utenteForm.value;
      user.id = this.user$.value.id;
      user.ruolo = this.user$.value.ruolo;
      user.statoAccount = this.user$.value.statoAccount;
      if (this.user$.value.email != this.utenteForm.value.email) {
        this.userService.editUserData(user).subscribe({
          next: (data) => {
            this.userService.logout();
            this.router.navigate(['/login']);
          }
        });
      } else {
        this.userService.editUserData(user).subscribe({
          next: (data) => {
            this.userService.editUserLocalData(user)
            this.router.navigate(['/home']);
          }
        });
      }
    }
  }
}
