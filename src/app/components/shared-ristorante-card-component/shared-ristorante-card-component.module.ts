import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RistoranteCardComponent} from "../ristorante-card/ristorante-card.component";
import {RecensioniAverageRankPipe} from "../../pipes/recensioni-average-rank.pipe";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [RistoranteCardComponent, RecensioniAverageRankPipe],
  exports: [RistoranteCardComponent, RecensioniAverageRankPipe],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,
    RouterLink
  ]
})
export class SharedRistoranteCardComponentModule {
}
