import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from './movies/shared';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ExceptionsService } from './common';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'mnf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NETFLIX';
  searchTerms: string;
  isSmallScreen: Observable<any>;

  constructor(
    private movieService: MovieService,
    private dialog: MatDialog,
    private exceptions: ExceptionsService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isSmallScreen = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(result => result.matches), shareReplay());
  }

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
