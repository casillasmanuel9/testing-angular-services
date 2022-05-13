import { TokenService } from './token.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { environment } from './../../environments/environment';
import { generateOneProduct } from './../models/product.mock';
import { ProductsService } from './product.service';
import { TestBed } from '@angular/core/testing';
import { generateProducts } from '../models/product.mock';
import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let htttpController: HttpTestingController;
  let tokenService: TokenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    productsService = TestBed.inject(ProductsService);
    tokenService = TestBed.inject(TokenService);
    htttpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    htttpController.verify();
  });


  it('Should be create', () => {
    expect(productsService).toBeTruthy();
  })

  describe('Pruebas para el metodo getAllSimple', () => {
    it('deberia retornar una lista de products', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateProducts();
      spyOn(tokenService, 'getToken').and.returnValue('123');
      // Act
      productsService.getAllSimple().subscribe((data) => {
        // Assert
        expect(data.length).toBe(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });

      // httpConfig
      const req = htttpController.expectOne(`${environment.API_URL}/api/v1/products`);
      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe('Bearer 123');
      req.flush(mockData);


    })
  })

  describe('Pruebas para el metodo getAll', () => {
    it('deberia retornar una lista de products', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateProducts();
      // Act
      productsService.getAllSimple().subscribe((data) => {
        // Assert
        expect(data.length).toBe(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });

      // httpConfig
      const req = htttpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);


    })

    it('deberia retornar una lista de products with taxes', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100 // 19
        },
        {
          ...generateOneProduct(),
          price: 200 // 38
        }
      ];
      // Act
      productsService.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toBe(mockData.length);
        expect(data[0]?.taxes).toBe(19);
        expect(data[1]?.taxes).toBe(38);
        //expect(data).not.toEqual(mockData);
        doneFn();
      });

      // httpConfig
      const req = htttpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);


    })

    it('should send query params with limit 10 and offset 2', (doneFn) => {
      // Arrange
      const limit = 10;
      const offset = 2;
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100 // 19
        },
        {
          ...generateOneProduct(),
          price: 200 // 38
        }
      ];
      // Act
      productsService.getAll(limit, offset).subscribe((data) => {
        // Assert
        expect(data.length).toBe(mockData.length);
        expect(data[0]?.taxes).toBe(19);
        expect(data[1]?.taxes).toBe(38);
        //expect(data).not.toEqual(mockData);
        doneFn();
      });

      // httpConfig
      const req = htttpController.expectOne(`${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.has('limit')).toBeTruthy();
      expect(params.get('limit')).toBe(`${limit}`);
      expect(params.has('offset')).toBeTruthy();
      expect(params.get('offset')).toBe(`${offset}`);


    })
  })

  describe('Test for create', () => {
    it('Should be return a new product', (doneFn) => {
      // arrage
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new Pruduct',
        price: 100,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 12
      }

      //act
      productsService.create({...dto})
      .subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      })

      const req = htttpController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');

    })
  })

  describe('Test for update', () => {
    it('Should be update a product', (doneFn) => {
      // arrage
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'new Pruduct'
      }

      const id = '1';

      //act
      productsService.update(id, {...dto})
      .subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      })

      const req = htttpController.expectOne(`${environment.API_URL}/api/v1/products/${id}`);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');

    })
  })

  describe('Test for getOne', () => {
    it('Should be return a product', (doneFn) => {
      // arrage
      const mockData = generateOneProduct();
      const id = '1';

      //act
      productsService.getOne(id)
      .subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      })

      const req = htttpController.expectOne(`${environment.API_URL}/api/v1/products/${id}`);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');

    })

    it('Should be return a 404 ERROR', (doneFn) => {
      // arrage
      const id = '1';
      const msgError = '404 error';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      }

      //act
      productsService.getOne(id)
      .subscribe(({
        error: (err) => {
          expect(err).toEqual('El producto no existe');
          doneFn();
        }
      }))

      const req = htttpController.expectOne(`${environment.API_URL}/api/v1/products/${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);

    })
  })

  describe('Test for delete', () => {
    it('Should be delete a product', (doneFn) => {
      // arrage
      const mockData = true;

      const id = '1';

      //act
      productsService.delete(id)
      .subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      })

      const req = htttpController.expectOne(`${environment.API_URL}/api/v1/products/${id}`);
      req.flush(mockData);
      expect(req.request.method).toEqual('DELETE');

    })
  })
});
