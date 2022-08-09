import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HighligthDirective } from './highligth.directive';

describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        HighligthDirective
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

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have three highligth elements', () => {
    const elemenets = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    expect(elemenets.length).toBe(4);
  });

  it('Deberian hacer match con el backgroundColor', () => {
    const elemenets = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    const [element1, element2, element3] = elemenets;
    const dir = element2.injector.get(HighligthDirective);
    expect(element1.nativeElement.style.backgroundColor).toBe(dir.defaultColor);
    expect(element2.nativeElement.style.backgroundColor).toBe('yellow');
    expect(element3.nativeElement.style.backgroundColor).toBe('blue');
  });

  it('Debe hacer bind de nuestro input', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputE1: HTMLInputElement = inputDe.nativeElement;
    const dir = inputDe.injector.get(HighligthDirective);

    expect(inputE1.style.backgroundColor).toBe(dir.defaultColor);

    const newColor = 'red';
    inputE1.value = newColor;
    inputE1.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputE1.style.backgroundColor).toBe(newColor);
    // inputE1.dispatchEvent()
  });
});


@Component({
  template: `
    <h5 highligth>default</h5>
    <h5 highligth="yellow">yellow</h5>
    <p highligth="blue">Parrafo</p>
    <p>Otro Parrafo</p>
    <input type="text" [(ngModel)]="color" [highligth]="color">
  `
})
export class HostComponent {

  public color: string = '';

  constructor() { }

  ngOnInit() { }
}
