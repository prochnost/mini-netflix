import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MovieService } from '../shared/index';
import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  const MOVIES = {
    results: [
      { id: 1, title: 'Star Wars', release_date: '2019-10-17', poster_path: '/pi16aubY3qFKJWAh4npvm03ERkH.jpg' },
      { id: 2, title: 'Avengers', release_date: '2018-01-09', poster_path: '/253Bw5I3Zj3e2thCThjO7byEUCL.jpg' },
      { id: 3, title: 'Johnny English', release_date: '2012-11-24', poster_path: '/z5EhMVaY7lVzNjYp8rK7Y3IJ11s.jpg' }
    ]
  };

  let movieServiceSpy: { getMovies: jasmine.Spy };
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async(() => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies']);
    movieServiceSpy.getMovies.and.returnValue(of(MOVIES));

    TestBed.configureTestingModule({
      imports: [ MatGridListModule, MatCardModule, MatPaginatorModule ],
      declarations: [ MoviesListComponent ],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the movies array', () => {
    expect(component.movies.length).toBe(3);
  });

  it('should display all movies correctly', () => {
    const tileHeaders = fixture.nativeElement.querySelectorAll('mat-grid-tile-header');
    const tileFooters = fixture.nativeElement.querySelectorAll('mat-grid-tile-footer');
    const tileImages = fixture.nativeElement.querySelectorAll('mat-grid-tile img');
    fixture.detectChanges();

    tileHeaders.forEach(tileHeader => {
      expect(tileHeader.textContent).toBeTruthy();
    });

    tileFooters.forEach(tileFooter => {
      expect(tileFooter.textContent).toBeTruthy();
    });

    tileImages.forEach(tileImage => {
      expect(tileImage.src).toBeTruthy();
    });
  });
});
