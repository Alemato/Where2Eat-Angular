import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  RistorantePrenotazioneVerificaComponent
} from "../../components/ristorante-prenotazione-verifica/ristorante-prenotazione-verifica.component";

@Component({
  selector: 'app-ristorante-page',
  templateUrl: './ristorante-page.component.html',
  styleUrls: ['./ristorante-page.component.css']
})
export class RistorantePageComponent implements OnInit {
  protected idRistorante: number = -1;
  protected str: string = 'test';
  constructor(private route: ActivatedRoute,
              public dialog: MatDialog) {
    console.log("Creo Componente pagina")
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idRistorante = parseInt(params.get('id')!, 0);
    });
  }

  openDialogVerificaPrenotazione(): void {
    const dialogRef = this.dialog.open(RistorantePrenotazioneVerificaComponent, {
      data: {id: this.idRistorante}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
