import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let mapsService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapsService
      ]
    });
    mapsService = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapsService).toBeTruthy();
  });

  describe('test for getCurrentPosition', () => {
    it('Esto deberia guardar las coordenadas', () => {
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successFn) => {
        const mockLocalitation: GeolocationPosition = {
          coords: {
            latitude: 1000,
            longitude: 2000,
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0,
          },
          timestamp: new Date().getTime()
        }
        successFn(mockLocalitation);
      });

      mapsService.getCurrentPosition();
      expect(mapsService.center).toEqual({lat: 1000, lng: 2000})
    })
  })
});
