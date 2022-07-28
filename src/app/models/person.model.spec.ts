import { Person } from "./person.model";

describe('Test for person', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person(
      'Manuel',
      'Galindo',
      25,
      40,
      1.70
    );
  });

  it('attrs', () => {
    expect(person.name).toBe('Manuel');
    expect(person.lastName).toBe('Galindo');
    expect(person.age).toBe(25);
  });

  describe('test for calIMC', () => {
    it('Debe retornar un string que debe de ser down', () => {
      // Arrange
      person.weigth = 40;
      person.heigth = 1.65;

      // Act
      const rta = person.calcIMC();

      // Assert
      expect(rta).toBe('down');
    });
  });

  describe('test for calIMC', () => {
    it('Debe retornar un string que debe de ser normal          ', () => {
      // Arrange
      person.weigth = 58;
      person.heigth = 1.65;

      // Act
      const rta = person.calcIMC();

      // Assert
      expect(rta).toBe('normal');
    });
  });
});
