import { Auth } from './../models/auth.model';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

describe('Auth Service', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        TokenService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpController.verify();
  });

  it('Auth service debe de crearse de la manera correcta', () => {
    expect(authService).toBeTruthy();
  })

  describe('Pruebas para el login', () => {
    it('Debe retornar un token', (doneFn) => {
      const mockData: Auth = {
        access_token: '123'
      }
      const email = 'casillasmanuel9@gmail.com';
      const password = '123qwe';

      authService.login(email, password).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      const req = httpController.expectOne(`${environment.API_URL}/api/auth/login`);
      req.flush(mockData);
    })

    it('Probar que se haga llamado el token en el storage', (doneFn) => {
      const mockData: Auth = {
        access_token: '123'
      }
      const email = 'casillasmanuel9@gmail.com';
      const password = '123qwe';
      spyOn(tokenService, 'saveToken').and.callThrough();

      authService.login(email, password).subscribe((data) => {
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('123');
        doneFn();
      });

      const req = httpController.expectOne(`${environment.API_URL}/api/auth/login`);
      req.flush(mockData);
    })
  })
});
