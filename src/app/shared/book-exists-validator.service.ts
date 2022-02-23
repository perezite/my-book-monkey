import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BookStoreService } from './book-store.service';

@Injectable({
  providedIn: 'root'
})
export class BookExistsValidatorService {
  constructor(private bs: BookStoreService) { }

  validate(control: FormControl): Observable<ValidationErrors | null> {
    return this.bs.check(control.value).pipe(
      map(exists => exists === false ? null : {
        isbnExists: { valid: false }
      }),
      catchError(() => of(null))
    );
  }
}
