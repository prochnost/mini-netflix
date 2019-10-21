import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MovieService } from './shared';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const ROUTES: Routes = [
  { path: 'movies', component: MoviesListComponent },
  { path: 'movies/:id', component: MovieDetailsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatGridListModule,
    MatPaginatorModule,
    MatListModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    MoviesListComponent,
    MovieDetailsComponent
  ],
  providers: [
    MovieService
  ],
  exports: [
    MoviesListComponent
  ]
})
export class MovieModule {}
