import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() person: Person = new Person('Juan Manuel', 'Galindo Casillas', 25, 58, 1.65);
  @Output() onSelected = new EventEmitter<Person>();
  public imc: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  clickIMC() {
    this.imc = this.person.calcIMC();
  }

  clickPerson() {
    this.onSelected.emit(this.person);
  }

}
