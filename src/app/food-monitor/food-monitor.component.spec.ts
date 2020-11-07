import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodMonitorComponent } from './food-monitor.component';

describe('FoodMonitorComponent', () => {
  let component: FoodMonitorComponent;
  let fixture: ComponentFixture<FoodMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
