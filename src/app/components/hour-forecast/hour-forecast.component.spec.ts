import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourForecastComponent } from './hour-forecast.component';

describe('HourForecastComponent', () => {
  let component: HourForecastComponent;
  let fixture: ComponentFixture<HourForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourForecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
