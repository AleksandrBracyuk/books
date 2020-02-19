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
  newAuthor: Author;
  editAuthor: Author;
  books: Book[] = [];
  genres: string[] = [];

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private genreService: GenreService,
    private testService: TestService
  ) { }

  ngOnInit() {
    this.refreshAuthors();
    this.refreshBooks();
    this.refreshGenres();
  }
  refreshAuthors() {
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
  }
  refreshBooks() {
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
  }
  refreshGenres() {
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

  add() {
    let author: Author = new Author();
    author.surname = this.newAuthor.surname;
    author.name = this.newAuthor.name;
    author.patronymic = this.newAuthor.patronymic;
    author.dateBirth = this.newAuthor.dateBirth;
    author.bookList = this.newAuthor.bookList;
    this.authorService.add(author).subscribe({
      next: (result: Author) => {
        this.refreshAuthors();
        console.log(`получен новый автор: ${result.id}`)
      },
      error: error => {
        console.error("AuthorService add error", error);
      },
      complete: () => { console.log("completed") }
    }
    );
  }

  edit() {
    let author: Author = new Author();
    author.surname = this.editAuthor.surname;
    author.name = this.editAuthor.name;
    author.patronymic = this.editAuthor.patronymic;
    author.dateBirth = this.editAuthor.dateBirth;
    author.bookList = this.editAuthor.bookList;
    this.authorService.edit(author).subscribe({
      next: (result: Author) => {
        this.refreshAuthors();
        console.log(`отредактирован автор: ${result.id}`)
      },
      error: error => {
        console.error("AuthorService edit error", error);
      },
      complete: () => { console.log("completed") }
    }
    );
  }

  delete(author: Author) {
    this.authorService.edit(author).subscribe({
      next: (result: Author) => {
        this.refreshAuthors();
        console.log(`удален автор: ${result.id}`)
      },
      error: error => {
        console.error("AuthorService delete error", error);
      },
      complete: () => { console.log("completed") }
    }
    );
  }

  createTestData() {
    this.testService.createTestData();
  }

}
