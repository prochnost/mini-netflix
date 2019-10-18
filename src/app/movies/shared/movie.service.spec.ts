import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: MovieService;
  const MOVIES = [{ id: 1, title: 'Joker' }, { id: 2, title: 'Terminator' }];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    service = new MovieService(TestBed.get(HttpClient));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies from the HttpClient service', () => {
    httpClientSpy.get.and.returnValue(of(MOVIES));
    service.getMovies(1).subscribe(movies => {
      expect(movies.length).not.toEqual(0, 'a non-empty array of movies');
      expect(httpClientSpy.get.calls.count()).toBe(1, 'Only one call');
    });
  });

  it('should get a specific movie based on its id', () => {
    httpClientSpy.get.and.returnValue(of(MOVIES[1]));
    service.getMovie(2).subscribe(movie => {
      expect(movie.title).toEqual('Terminator');
      expect(httpClientSpy.get.calls.count()).toBe(1, 'Only one call');
    });
  });
});
