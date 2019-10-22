import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.component';

const ROUTES: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
