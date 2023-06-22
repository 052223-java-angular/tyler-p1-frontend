import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessComponent } from './success.component';
import { NgEventBus } from 'ng-event-bus';

describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessComponent],
      providers: [NgEventBus],
    });
    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
