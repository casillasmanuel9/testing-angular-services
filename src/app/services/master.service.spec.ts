import { ValueService } from './value.service';
import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy }
      ]
    })
    masterService = TestBed.inject(MasterService);
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  it('should be call to getValue from valueService', () => {
    valueService.getValue.and.returnValue('my value');
    expect(masterService.getValue()).toBe('my value');

    expect(valueService.getValue).toHaveBeenCalled();
    expect(valueService.getValue).toHaveBeenCalledTimes(1);
  });
});
