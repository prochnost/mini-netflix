import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MovieService } from './shared';
import { MoviesListComponent } from './movies-list/movies-list.component';

const ROUTES: Routes = [
  { path: 'movies', component: MoviesListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  declarations: [
    MoviesListComponent
  ],
  providers: [
    MovieService
  ],
  exports: [
    MoviesListComponent
  ]
})
export class MovieModule {}
