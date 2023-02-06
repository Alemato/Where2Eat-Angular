import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RegistrazionePageComponent} from "./registrazione-page.component";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";


const routes: Routes = [{path: '', component: RegistrazionePageComponent}];

@NgModule({
  declarations: [RegistrazionePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    TranslateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule
  ]
})
export class RegistrazionePageModule {
}
