import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookExistsValidatorService as BookExistsValidatorService } from '../shared/book-exists-validator.service';
import { BookValidators } from '../shared/book-validators';
import { Thumbnail } from '../shared/thumbnail';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnChanges {

  bookForm: FormGroup;

  @Input() book: Book;
  @Input() editing = false;
  @Output() submitBook = new EventEmitter<Book>();

  constructor(private fb: FormBuilder, private bookExistsValidator: BookExistsValidatorService) { }

  ngOnChanges() {
    this.initForm();
    this.setFormValues(this.book);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.bookForm) { return; }

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: [{ value: '', disabled: this.editing }, [Validators.required, BookValidators.isbnFormat], this.editing ?
        null : [this.bookExistsValidator]],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbnailsArray([{ title: '', url: '' }]),
      published: []
    });
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }

  submitForm() {
    const formValue = this.bookForm.value;
    const authors = formValue.authors.filter(author => author);                 // filter authors without name
    const thumbnails = formValue.thumbnails.filter(thumbnail => thumbnail.url); // filter thumbnails without url
    const isbn = this.editing ? this.book.isbn : formValue.isbn;                // disabled isbn field is not present in edit mode

    const newBook: Book = { ...formValue, isbn, authors, thumbnails };
    this.submitBook.emit(newBook);
    this.bookForm.reset();
  }

  addAuthorControl() {
    this.authors.push(this.fb.control(''));
  }

  addThumbnailControl() {
    this.thumbnails.push(this.fb.group({ url: '', title: '' }));
  }

  private buildAuthorsArray(authors: string[]): FormArray {
    return this.fb.array(authors, BookValidators.atLeastOneAutor);
  }

  private buildThumbnailsArray(thumbnails: Thumbnail[]): FormArray {
    return this.fb.array(
      thumbnails.map(thumbnail => this.fb.group(thumbnail))
    );
  }

  private setFormValues(book: Book) {
    this.bookForm.patchValue(book);
    this.bookForm.setControl('authors', this.buildAuthorsArray(book.authors));
    this.bookForm.setControl('thumbnails', this.buildThumbnailsArray(book.thumbnails));
  }
}
