import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RicercaRistorantiPageComponent} from './ricerca-ristoranti-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TranslateModule} from "@ngx-translate/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {
  SharedRistoranteCardComponentModule
} from "../../components/shared-ristorante-card/shared-ristorante-card-component.module";

const routes: Routes = [{path: '', component: RicercaRistorantiPageComponent}];


@NgModule({
  declarations: [
    RicercaRistorantiPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDividerModule,
    SharedRistoranteCardComponentModule,
    MatProgressSpinnerModule,
    TranslateModule,
    MatPaginatorModule,
  ]
})
export class RicercaRistorantiPageModule {
}
