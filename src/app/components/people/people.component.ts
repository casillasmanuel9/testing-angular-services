import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  public persons: Person[] = [
    new Person('Juan Manuel', 'Galindo Casillas', 25, 50, 1.70),
    new Person('Jesus Joaquin', 'Galindo Casillas', 20, 40, 1.65),
    new Person('Jesus Joaquin', 'Galindo Casillas', 15, 30, 1.50)
  ];
  public selectedPerson: Person | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(person: Person) {
    this.selectedPerson = person;
  }

}
