import { TestBed } from '@angular/core/testing';

import { TvshowService } from './tvshow.service';

describe('TvshowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TvshowService = TestBed.get(TvshowService);
    expect(service).toBeTruthy();
  });
});
