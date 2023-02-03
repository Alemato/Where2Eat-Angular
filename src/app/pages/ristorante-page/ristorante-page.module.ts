import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RistorantePageComponent } from './ristorante-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";

const routes: Routes = [
  {
    path: '',
    component: RistorantePageComponent
  }
];

@NgModule({
  declarations: [
    RistorantePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule
  ]
})
export class RistorantePageModule { }
