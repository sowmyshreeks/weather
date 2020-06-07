import { TestBed } from '@angular/core/testing';

import { WeatherStatusServiceService } from './weather-status-service.service';

describe('WeatherStatusServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherStatusServiceService = TestBed.get(WeatherStatusServiceService);
    expect(service).toBeTruthy();
  });
});
