import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from '../shared';

@Component({
  selector: 'mnf-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  movies: Movie[] = [];
  imgUrl: string;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.fetchFavorites();
    this.imgUrl = this.movieService.getImgUrl();
  }

  removeFavorite(id) {
    let fav = sessionStorage.getItem('favoriteMovies').split('-');
    fav = fav.filter(f => f !== id.toString());
    sessionStorage.setItem('favoriteMovies', fav.join('-'));
    this.movies = [];
    this.fetchFavorites();
  }

  private fetchFavorites() {
    const fav = sessionStorage.getItem('favoriteMovies');
    if (fav !== null) {
      fav.split('-').forEach(id => {
        this.movieService.getMovie(+id).subscribe(movie => {
          this.movies.push(movie);
        });
      });
    }
  }

}
