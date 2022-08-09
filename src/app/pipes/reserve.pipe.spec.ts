import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReservePipe } from './reserve.pipe';

describe('ReservePipe', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        ReservePipe
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create an instance', () => {
    const pipe = new ReservePipe();
    expect(pipe).toBeTruthy();
  });

  it('Debe transformar "roma" -> "amor"', () => {
    const pipe = new ReservePipe();
    const rta = pipe.transform('roma');
    expect(rta).toBe('amor')
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe el h5 mostar roma', () => {
    const h5de = fixture.debugElement.query(By.css('h5'));
    expect(h5de.nativeElement.textContent).toBe('roma')
  });

  it('deberia aplicar reverse pipe cuando cambiamos el typing en el input', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl = inputDe.nativeElement as HTMLInputElement;

    let pDe = fixture.debugElement.query(By.css('p'));
    expect(pDe.nativeElement.textContent).toBe('');
    const mockValue = '123';
    inputEl.value = mockValue;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    pDe = fixture.debugElement.query(By.css('p'));
    expect(pDe.nativeElement.textContent).toBe('321');
  });

});



@Component({
  template: `
    <h5>{{ 'amor' | reserve }}</h5>
    <input type="text" [(ngModel)]="text">
    <p>{{ text | reserve }}</p>
  `
})
export class HostComponent {

  public text: string = '';

  constructor() { }

  ngOnInit() { }
}
