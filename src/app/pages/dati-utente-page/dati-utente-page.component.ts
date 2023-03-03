import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-dati-utente-page',
  templateUrl: './dati-utente-page.component.html',
  styleUrls: ['./dati-utente-page.component.css']
})
export class DatiUtentePageComponent {

  utenteForm: FormGroup;
  user?: User;
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.loading = true;
    this.utenteForm = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(9), Validators.maxLength(10)]]
      });
  }

  ngOnInit() {
    this.userService.getUserFromServer().subscribe({
      next: user => {
        this.user = user;
        this.utenteForm.controls['nome'].setValue(this.user.nome);
        this.utenteForm.controls['cognome'].setValue(this.user.cognome);
        this.utenteForm.controls['telefono'].setValue(this.user.telefono);
        this.loading = false;
      }, error: (error: HttpErrorResponse) => {
        if (error.status === 500) {
          console.error('Ristorante Page request error: ' + error.status);
          window.alert("Errore server 500");
        }
        this.loading = false;
        if (error.status === 403) {
          console.error('Ristorante Page request error: ' + error.status);
          window.alert("Accesso negato");
          this.userService.logout();
          this.router.navigate(["/login"]);
        }
      }
    })
  }

  salvaDati(): void {
    if (this.utenteForm.status === 'VALID') {
      if (this.user !== undefined) {
        const utenteModificato: User = this.utenteForm.value;
        utenteModificato.id = this.user.id;
        utenteModificato.statoAccount = this.user.statoAccount;
        this.userService.editUserData(utenteModificato).subscribe({
          next: (data) => {
            this.userService.editUserLocalData(utenteModificato)
            this.router.navigate(['/home']);
          }
        });

      }
    }

  }
}
