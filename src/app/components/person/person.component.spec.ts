import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Life
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia tener un nombre', () => {
    component.person = new Person('Juan Manuel', 'Galindo Casillas', 25, 89, 1.4);
    expect(component.person.name).toBe('Juan Manuel')
  });

  it('Deberia terner un elemento h3', () => {
    // Arrange
    component.person = new Person('Juan Manuel', 'Galindo Casillas', 25, 89, 1.4);
    const expectMessage = `Hola, ${component.person.name}`
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug = personDebug.query(By.css('h3'));
    const h3Element = h3Debug.nativeElement as HTMLElement;
    // Act
    fixture.detectChanges();

    // Assert
    expect(h3Element?.textContent).toBe(expectMessage);
  });

  it('Debe contener un texto P', () => {
    component.person = new Person('Juan Manuel', 'Galindo Casillas', 25, 89, 1.4);
    const expectMessage = `Mi altura es ${component.person.heigth}`;
    const personDebug = fixture.debugElement;
    const pDebug = personDebug.query(By.css('p'));
    const pElement = pDebug.nativeElement as HTMLElement;

    // Act
    fixture.detectChanges();

    // Assert
    expect(pElement?.textContent).toBe(expectMessage);
  });

  it('debe de mostrar el texto de IMC', () => {
    // Arrange
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    const expectMessage = 'overweigth';
    const buttonDebug = fixture.debugElement.query(By.css('.btn-imc'));
    const buttonElement = buttonDebug.nativeElement as HTMLElement;

    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(buttonElement.textContent).toContain(expectMessage);
  });

  it('Debe de emitir valor cuando se le de click en el boton selected', () => {
    // Arrange
    let selectedPerson: Person | undefined;
    const expectPerson = new Person('Juan', 'Perez', 30, 120, 1.65);
    component.person = expectPerson;
    const buttonDebug = fixture.debugElement.query(By.css('.btn-choose'));
    // Act
    component.onSelected.subscribe((person) => selectedPerson = person);
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(selectedPerson).toEqual(expectPerson)
  });
});


describe('Pruebas al componente desde un componente padre', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        PersonComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de renderizar el nombre de la persona', () => {
    // Arrange
    const expectName = `${component.person.name}`;
    const personDebug = fixture.debugElement.query(By.css('app-person h3'));
    const h3El = personDebug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3El.textContent).toContain(expectName);
  });


  it('Debe de seleccionar la persona seleccionada el nombre de la persona', () => {
    // Arrange
    const buttonDebug = fixture.debugElement.query(By.css('app-person button.btn-choose'));
    buttonDebug.triggerEventHandler('click', null);
    // Act
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(component.person);
  });

});

@Component({
  template: `<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>`
})

export class HostComponent {
  public person = new Person('Juan', 'Perez', 30, 120, 1.65);
  public selectedPerson: Person | undefined;

  constructor() { }

  ngOnInit() { }

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}
