import { Component, OnInit } from '@angular/core';
import { TestService } from '../shared/test.service';
import { AuthorService } from '../shared/author.service';
import { BookService } from '../shared/book.service';
import { Author } from '../shared/author';
import { Book } from '../shared/book';
import { GenreService } from '../shared/genre.service';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.scss'],
  providers: [TestService, AuthorService, BookService]
})
export class ShowAllComponent implements OnInit {

  authors: Author[] = [];
  books: Book[] = [];
  genres: string[] = [];

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private genreService: GenreService,
    private testService: TestService
  ) { }

  ngOnInit() {
    this.authorService.list().subscribe({
      next: (result: Author[]) => {
        this.authors = result;
        console.log(`получено авторов: ${result.length}`)
      },
      error: error => {
        console.error("AuthorService list error", error);
      },
      complete: () => { console.log("completed") }
    }
    );

    this.bookService.list().subscribe({
      next: (result: Book[]) => {
        this.books = result;
        console.log(`получено книг: ${result.length}`)
      },
      error: error => {
        console.error("BookService list error", error);
      },
      complete: () => { console.log("completed") }
    }
    );

    this.genreService.list().subscribe({
      next: (result: string[]) => {
        this.genres = result;
        console.log(`получено жанров: ${result.length}`)
      },
      error: error => {
        console.error("GenreService list error", error);
      },
      complete: () => { console.log("completed") }
    }
    );

  }

  createTestData() {
    this.testService.createTestData();
  }

}
