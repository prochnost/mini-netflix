import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie, MoviesResp, MovieService } from '../movies/shared';
import { ExceptionsService } from '../common';

@Component({
  selector: 'mnf-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  movies: Movie[];
  totalResults: number;
  page: number;
  searchTerms: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { searchResults: MoviesResp, searchTerms: string },
    private dialogRef: MatDialogRef<SearchResultsComponent>,
    private movieService: MovieService,
    private exceptions: ExceptionsService
  ) { }

  ngOnInit(): void {
    this.searchTerms = this.data.searchTerms;
    this.totalResults = this.data.searchResults.total_results;
    this.page = this.data.searchResults.page;

    this.movies = (this.data.searchResults.results.length !== 0)
      ? this.data.searchResults.results.map(
          movie => {
            movie.poster_url = this.movieService.getImgUrl() + movie.poster_path;
            return movie;
          }
        )
      : []
    ;
  }

  closeModal() {
    this.dialogRef.close();
  }

  loadMore() {
    this.page = this.page + 1;

    this.movieService.searchMovies(this.searchTerms, this.page)
      .subscribe(
        next => {
          this.movies.push(
            ...next.results.map(
              movie => {
                movie.poster_url = this.movieService.getImgUrl() + movie.poster_path;
                return movie;
              }
            )
          );
        },
        () => {
          this.exceptions.requestError();
        }
      );
  }

}
