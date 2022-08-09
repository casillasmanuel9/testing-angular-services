import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PeopleComponent,
        PersonComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener una lista de app person', () => {
    // Arrange
    component.persons = [
      new Person('Juan Manuel', 'Galindo Casillas', 25, 50, 1.70),
      new Person('Jesus Joaquin', 'Galindo Casillas', 20, 40, 1.65),
      new Person('Jesus Joaquin', 'Galindo Casillas', 15, 30, 1.50)
    ];
    // Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    // Assert
    expect(component.persons.length).toBe(debugElement.length);

  });

  it('Should raise selected event when clicked', () => {
    // Arrange
    component.persons = [
      new Person('Juan Manuel', 'Galindo Casillas', 25, 50, 1.70),
      new Person('Jesus Joaquin', 'Galindo Casillas', 20, 40, 1.65),
      new Person('Jesus Joaquin', 'Galindo Casillas', 15, 30, 1.50)
    ];
    const [ expectPerson ] = component.persons;
    const personDebug = fixture.debugElement.query(By.css('app-person'));
    const btnChosseDebug = personDebug.query(By.css('.btn-choose'));
    // Act
    btnChosseDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('div ul > li'))?.nativeElement as HTMLElement;
    // Assert
    expect(nameElement?.textContent).toContain(expectPerson.name);
  });

});
