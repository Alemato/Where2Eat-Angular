import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {
  SharedRistoranteCardComponentModule
} from "../../components/shared-ristorante-card-component/shared-ristorante-card-component.module";

const routes: Routes = [  {    path: '',    component: HomePageComponent  }];

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatCardModule,
    TranslateModule,
    MatButtonModule,
    MatDividerModule,
    SharedRistoranteCardComponentModule
  ]
})
export class HomePageModule { }
