import { Action, createReducer, on } from '@ngrx/store';
import { Book } from 'src/app/shared/book';
import * as BookActions from './book.actions';

export const bookFeatureKey = 'book';

export interface State {
  books: Book[];
  loading: boolean;
}

export const initialState: State = {
  books: [],
  loading: false
};

export const reducer = createReducer(
  initialState,

  on(BookActions.loadBooks, state => {
    return { ...state, loading: true };
  }),
  on(BookActions.loadBooksSuccess, (state, action) => {
    return {
      ...state,
      books: action.data,
      loading: false
    };
  }),
  on(BookActions.loadBooksFailure, (state, action) => {
    return {
      ...state,
      loading: false
    };
  }),

);
