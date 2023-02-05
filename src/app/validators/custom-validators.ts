import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {
  public static dataPrenotazioneValid(control: AbstractControl): ValidationErrors {
    if (control.value) {
      let data = control.value;
      data.setHours(23);
      data.setMinutes(59);

      return data < new Date()
        ? {dateError: {valid: false, value: control.value}}
        : {}
    }
    return {};
  }
}
