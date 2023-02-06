import {Component, OnInit} from '@angular/core';
import {RistoranteService} from "../../services/ristorante.service";
import {Ristorante} from "../../model/ristorante";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  loading = true;

  ristornati?: Array<Ristorante>;

  constructor(private ristoranteService: RistoranteService) {
  }

  ngOnInit(): void {
    this.ristoranteService.getRestHome().subscribe({
      next: (data) => {
        console.log(data);
        this.ristornati = data;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 500) {
          console.error('login request error: ' + error.status);
          window.alert("Errore server 500");
        }
        this.loading = false;
      }
    });
  }
}
