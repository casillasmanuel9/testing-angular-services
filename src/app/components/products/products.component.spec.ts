import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, defer } from 'rxjs';
import { generateProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ValueService } from 'src/app/services/value.service';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';

describe('ProductComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueService = jasmine.createSpyObj('ValueService', ['getPromiseValue'])
    await TestBed.configureTestingModule({
      declarations: [
        ProductsComponent,
        ProductComponent
      ],
      providers: [
        {
          provide: ProductsService,
          useValue: productServiceSpy
        },
        {
          provide: ValueService,
          useValue: valueService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    const productsMock = generateProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges(); //ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('Should return product list from service', () => {
      // Arrange
      const productsMock = generateProducts(10);
      productService.getAll.and.returnValue(of(productsMock));
      const countPrev = component.products.length;
      // Act
      component.getAllProducts();
      fixture.detectChanges();
      // Assert
      expect(component.products.length).toBe(productsMock.length + countPrev);
    });

    it('Debe cambiar el cambio de estatus "loading" -> "success"', fakeAsync(() => {
      const productsMock = generateProducts(10);
      productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
      const countPrev = component.products.length;

      // Act
      component.getAllProducts();
      fixture.detectChanges();

      // Assert
      expect(component.status).toEqual('loading');
      tick();
      fixture.detectChanges();
      expect(component.status).toEqual('success');
    }));

    it('Debe de cambiar el status de "loading" -> "error', fakeAsync(() => {
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')));
      const countPrev = component.products.length;

      // Act
      component.getAllProducts();
      fixture.detectChanges();

      // Assert
      expect(component.status).toEqual('loading');
      tick(4000);
      fixture.detectChanges();
      expect(component.status).toEqual('error');
    }));

  });

  describe('Test for callPromise', () => {
    it('Debe de llamar a llamada de promea', fakeAsync(() => {
      //Arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));

      //act
      component.callPromise();
      tick();
      fixture.detectChanges();

      // Assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    }));

    it('Debe de mostrar "my mock string" en el parrafo', fakeAsync(() => {
      //Arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));

      const buttonDebug = fixture.debugElement.query(By.css('.button-promise'));
      //act
      buttonDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const rtaDebug = fixture.debugElement.query(By.css('p.rta'));

      // Assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(rtaDebug.nativeElement.textContent).toEqual(mockMsg);
    }));
  });



});
