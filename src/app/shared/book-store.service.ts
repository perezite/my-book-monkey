import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Book } from './book';
import { BookFactory } from './book-factory';
import { BookRaw } from './book-raw';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api: string;

  constructor(private http: HttpClient, private settingsService: SettingsService) {
    this.api = this.settingsService.settings.apiUrl;
  }

  getAllSearch(searchTerm: string): Observable<Book[]> {
    return this.http.get<BookRaw[]>(`${this.api}/books/search/${searchTerm}`)
      .pipe(
        retry(3),
        map(booksRaw => booksRaw.map(bookRaw => BookFactory.fromRaw(bookRaw))),
        catchError(this.errorHandler)
      );
  }

  getAll(): Observable<Book[]> {
    return this.http.get<BookRaw[]>(`${this.api}/books`)
      .pipe(
        map(booksRaw => booksRaw.map(bookRaw => BookFactory.fromRaw(bookRaw))),
        catchError(this.errorHandler)
      );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<BookRaw>(`${this.api}/book/${isbn}`)
      .pipe(
        retry(3),
        map(bookRaw => BookFactory.fromRaw(bookRaw)),
        catchError(this.errorHandler)
      );
  }

  remove(isbn: string): Observable<any> {
    return this.http.delete(`${this.api}/book/${isbn}`, { responseType: 'text' });
  }

  create(book: Book): Observable<any> {
    return this.http.post(`${this.api}/book`, book, { responseType: 'text' })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(book: Book): Observable<any> {
    return this.http.put(`${this.api}/book/${book.isbn}`, book, { responseType: 'text' })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  check(isbn: string): Observable<boolean> {
    return this.http.get(`${this.api}/book/${isbn}/check`).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error);
  }
}
