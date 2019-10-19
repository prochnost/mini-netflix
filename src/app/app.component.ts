import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from './movies/shared';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ExceptionsService } from './common';

@Component({
  selector: 'mnf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MINI NETFLIX';
  searchTerms: string;

  constructor(private movieService: MovieService, private dialog: MatDialog, private exceptions: ExceptionsService) {}

  searchMovies(terms: string) {
    this.movieService.searchMovies(terms, 1).subscribe(
      next => {
        this.dialog.open(
          SearchResultsComponent,
          { maxWidth: '90%', minWidth: '60%', data: { searchResults: next, searchTerms: terms } }
        );
      },
      () => {
        this.exceptions.requestError();
      }
    );
  }
}
