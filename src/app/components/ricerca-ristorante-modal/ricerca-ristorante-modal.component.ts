import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

export interface Ricerca {
  cosa: string | null;
  dove: string | null;
}

@Component({
  selector: 'app-ricerca-ristorante-modal',
  templateUrl: './ricerca-ristorante-modal.component.html',
  styleUrls: ['./ricerca-ristorante-modal.component.css']
})
export class RicercaRistoranteModalComponent {
  searchFormModelModal: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<RicercaRistoranteModalComponent>,
              private router: Router) {
    this.searchFormModelModal = this.formBuilder.group({
      cosa: ['', []],
      dove: ['', []]
    });
  }

  search() {
    this.dialogRef.close();
    const ricerca: Ricerca = this.searchFormModelModal.value;
    this.router.navigate(['/search'], {queryParams: ricerca});
  }
}
