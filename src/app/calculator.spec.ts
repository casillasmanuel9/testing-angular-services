import { Calculator } from './calculator';

describe('Test for calculator', () => {
  describe('Test for multiply', () => {
    it('#multiply should return a nine', () => {
      //AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.multiply(3,3);
      // Assert
      expect(rta).toEqual(9);
    });

    it('#multiply should return a four', () => {
      //AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.multiply(1,4);
      // Assert
      expect(rta).toEqual(4);
    });
  });

  describe('Test for divide', () => {
    it('#divide should return a 3', () => {
      //AAA
      // Arrange
      const calculator = new Calculator();
      // Act and Assert
      expect(calculator.divide(9,3)).toEqual(3);
      expect(calculator.divide(5,2)).toEqual(2.5);
    });

    it('#divide a 0', () => {
      //AAA
      // Arrange
      const calculator = new Calculator();
      // Act and Assert
      expect(calculator.divide(9,0)).toBeUndefined();
      expect(calculator.divide(5,0)).toBeUndefined();
    });
  })

  it('Test matchers', () => {
    const name = 'manuel';
    let name2;

    // Esperar si esta definiodo
    expect( name ).toBeDefined();
    expect( name2 ).toBeUndefined();

    // Esperar valores booleanos
    expect(1 + 3 === 4).toBeTruthy();
    expect(1 + 1 === 3).toBeFalsy();

    // esperar mayor o menor
    expect(5).toBeLessThan(10);
    expect(20).toBeGreaterThan(10);

    // Esperar un match con un regex
    expect('123456').toMatch(/123/);

    //Esperar que lo contenga un array
    expect(['apples', 'oranges', 'pears']).toContain('oranges');
  })
});
