import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService, Movie } from '../shared';
import { ExceptionsService } from '../../common';

@Component({
  selector: 'mnf-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  ratingColors: string[];
  genreNames: string[];
  languageNames: string[];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private exceptions: ExceptionsService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.getMovie(+params.id);
    });
  }

  addFavorite() {
    let favorites = sessionStorage.getItem('favoriteMovies');
    if (favorites === null) {
      sessionStorage.setItem('favoriteMovies', this.movie.id.toString());
    } else if (favorites.indexOf(this.movie.id.toString()) === -1) {
      favorites = favorites + '-' + this.movie.id;
      sessionStorage.setItem('favoriteMovies', favorites);
    }
  }

  private getMovie(id): void {
    this.ratingColors = [];
    this.genreNames = [];
    this.languageNames = [];

    this.movieService
      .getMovie(id)
      .subscribe(movie => {
        this.movie = movie;
        for (let i = 0; i < 10; i++) {
          this.ratingColors.push(i < Math.round(movie.vote_average) ? 'accent' : '');
        }
        for (const genre of movie.genres) {
          this.genreNames.push(genre.name);
        }
        for (const lang of movie.spoken_languages) {
          this.languageNames.push(lang.name);
        }
      },
      () => {
        this.exceptions.requestError();
      }
    );
  }

}
