import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

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
              private router: Router,
              private translateService: TranslateService) {
    this.loading = true;
    this.utenteForm = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(9), Validators.maxLength(10)]]
      });
  }

  ngOnInit() {
    this.initTranslate();
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

  validationMessages = {
    nome: [
      {type: 'required', message: 'Name is required'},
    ],
    cognome: [
      {type: 'required', message: 'Name is required'},
    ],
    telefono: [
      {type: 'required', message: 'Telephone number is required'},
      {type: 'pattern', message: 'Telephone number is invalid'},
      {type: 'minLength', message: 'Telephone number is invalid'},
      {type: 'maxLength', message: 'Telephone number is invalid'},
    ]
  };

  initTranslate() {
    this.translateService.get('NOME_RICHIESTO_MESSAGE').subscribe((data) => {
      this.validationMessages.nome[0].message = data;
    });
    this.translateService.get('COGNOME_RICHIESTO_MESSAGE').subscribe((data) => {
      this.validationMessages.cognome[0].message = data;
    });
    this.translateService.get('TELEFONO_RICHIESTO_MESSAGE').subscribe((data) => {
      this.validationMessages.telefono[0].message = data;
    });
    this.translateService.get('TELEFONO_NON_CORRETTO_MESSAGE').subscribe((data) => {
      this.validationMessages.telefono[1].message = data;
    });
    this.translateService.get('TELEFONO_NON_CORRETTO_MESSAGE').subscribe((data) => {
      this.validationMessages.telefono[2].message = data;
    });
    this.translateService.get('TELEFONO_NON_CORRETTO_MESSAGE').subscribe((data) => {
      this.validationMessages.telefono[3].message = data;
    });
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
