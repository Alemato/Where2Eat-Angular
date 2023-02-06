import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DatiUtentePageComponent} from "./dati-utente-page.component";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [{path: '', component: DatiUtentePageComponent}];

@NgModule({
  declarations: [
    DatiUtentePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    TranslateModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class DatiUtentePageModule {
}
