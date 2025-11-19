import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDescription } from './weather-description';

describe('WeatherDescription', () => {
  let component: WeatherDescription;
  let fixture: ComponentFixture<WeatherDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
