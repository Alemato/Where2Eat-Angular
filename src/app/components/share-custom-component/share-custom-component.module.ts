import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RistoranteCardComponent} from "../ristorante-card/ristorante-card.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [RistoranteCardComponent],
  exports: [RistoranteCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
    RouterLink
  ]
})
export class ShareCustomComponentModule {
}
