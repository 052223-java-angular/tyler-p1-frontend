import { TestBed } from '@angular/core/testing';

import { PointService } from './point.service';
import { HttpClientModule } from '@angular/common/http';

describe('PointService', () => {
  let service: PointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
