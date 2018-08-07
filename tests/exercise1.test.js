const { fizzBuzz } = require('../exercise1');

describe('FizzBuzz', () =>{
    
    it('should throw if number is not a number', () => {
        const args = ['a', null, undefined, {}];
        args.forEach(a => expect(() => {fizzBuzz(null)}).toThrow());
    });
    
    it('should return Fizz if number is only divisible by 3', () => {
        const result = fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if number is only divisible by 5', () => {
        const result = fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('should return FizzBuzz if number is divisible by 3 and 5', () => {
        const result = fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });
})