import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherLayout } from './weather-layout';

describe('WeatherLayout', () => {
  let component: WeatherLayout;
  let fixture: ComponentFixture<WeatherLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
