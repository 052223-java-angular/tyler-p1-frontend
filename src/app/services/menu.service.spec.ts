import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MessageService],
    });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
