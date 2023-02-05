import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

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

  search(){
    this.dialogRef.close();
    this.router.navigate(['/home']);
  }
}
