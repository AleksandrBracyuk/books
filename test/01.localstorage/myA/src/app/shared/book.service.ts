import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';
import { Author } from './author';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  list(): Observable<Book[]> {
    const res = new Observable<Book[]>((observer) => {
      let authorsString = localStorage.getItem("authors");
      let authors = JSON.parse(authorsString);

      //собрать книги у авторов:
      let books: Book[] = [];
      if (authors) {
        authors.forEach(author => {
          if (author.bookList) {
            author.bookList.forEach(book => {
              books.push(book);
            });
          }
        });
      }

      observer.next(books);
      observer.complete();

      return { unsubscribe() { } };
    });
    return res;
  }
}
