import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundPageComponent} from './not-found-page.component';
import {MatButtonModule} from "@angular/material/button";
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";


const routes: Routes = [
  {
    path: '',
    component: NotFoundPageComponent
  }
];


@NgModule({
  declarations: [
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    TranslateModule,
    RouterLink
  ]
})
export class NotFoundPageModule {
}
