import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { Movie, MovieService } from '../shared';
import { ExceptionsService } from '../../common';

@Component({
  selector: 'mnf-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  isSmallScreen: Observable<boolean>;
  isMediumScreen: Observable<boolean>;
  movies: Movie[];
  pageEvent: PageEvent = { pageIndex: 0, pageSize: 20, length: 20 };
  favorites: string;

  constructor(
    private movieService: MovieService,
    private breakpointObserver: BreakpointObserver,
    private exceptions: ExceptionsService
  ) {
    this.isSmallScreen = this.breakpointObserver
      .observe(Breakpoints.HandsetPortrait)
      .pipe(map(result => result.matches), shareReplay());

    this.isMediumScreen = this.breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.TabletPortrait])
      .pipe(map(result => result.matches));
  }

  ngOnInit(): void {
    this.getMovies(1);
    const fav = sessionStorage.getItem('favoriteMovies');
    this.favorites = fav === null ? '' : fav;
  }

  updatePageData(e) {
    this.pageEvent = e;
    this.getMovies(e.pageIndex + 1);
  }

  getMovies(pageNumber: number): void {
    this.movieService.getMovies(pageNumber).subscribe(
      next => {
        this.pageEvent.length = next.total_results;

        this.movies = next.results.map(
          movie => {
            const title = movie.title;
            movie.poster_url = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movie.poster_path;

            // reduce title length to avoid overflow on the tile's header
            if (title.length >= 50) {
              movie.title = title.substr(0, 47) + '...';
            }

            return movie;
          }
        );
      },
      () => {
        this.exceptions.requestError();
      }
    );
  }

}
