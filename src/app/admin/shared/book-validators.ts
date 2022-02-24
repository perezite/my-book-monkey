import { FormArray, FormControl, ValidationErrors } from '@angular/forms';

export class BookValidators {
  static isbnFormat(control: FormControl): ValidationErrors | null {
    if (!control.value) { return null; }

    const numbers = control.value.replace(/-/g, '');
    const isbnPattern = /(^\d{10}$)|(^\d{13}$)/;

    if (isbnPattern.test(numbers)) {
      return null;
    } else {
      return {
        isbnFormat: { valid: false }
      };
    }
  }

  static atLeastOneAutor(controlArray: FormArray): ValidationErrors | null {
    if (controlArray.controls.some(c => c.value)) {
      return null;
    } else {
      return {
        atLeastOneAuthor: { valid: false }
      };
    }
  }
}
