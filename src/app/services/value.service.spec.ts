import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ValueService ]
    })
    service = TestBed.inject(ValueService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  })

  describe('Test for getValue', () => {
    it('Should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    })
  })

  describe('Test for setValue', () => {
    it('Should return "my value"', () => {
      service.setValue('hola');
      expect(service.getValue()).toBe('hola');
    })
  })

  describe('Test for getPromiseValue', () => {
    it('should return "my value"', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('my value');
        doneFn();
      });
    })
  })

  describe('Test for getObservableValue', () => {
    it('should return "my value"', (doneFn) => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('my value');
        doneFn();
      });
    })
  })

  describe('Test for getObservableValue Sync', () => {
    it('should return "my value"', async () => {
      const value = await firstValueFrom(service.getObservableValue());
      expect(value).toBe('my value');
    })
  })
});
