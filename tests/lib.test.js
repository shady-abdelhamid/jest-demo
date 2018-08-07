const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

// testing numbers
describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
    // you should always group your test to certain function
    // this is done by jest describe function

    // for jest matcher funtions spec, pls, visit https://jestjs.io/docs/en/using-matchers
});


// Testing strings
describe('greet', () => {
    // when testing strings, make sure you are not too spesific
    it('should return the greeting message', () => {
        const result = lib.greet('Shady');
        expect(result).toMatch(/Shady/);
        // OR
        // expect(result).toContain('Shady');
    })
});

// Testing arrays
describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        // avoid too general and too spesific

        // Too general - avoid
        // expect(result).toBeDefined();
        // expect(result).not.toBeNull();

        // Too spesific - avoid
        // expect(result[0]).toBe('USD');
        // expect(result[1]).tobe('AUD');
        // expect(result[1]).tobe('EUR');

        // expect(result.length).toBe(3);

        // Proper way
        // expect(result).toContain('USD');
        // expect(result).toContain('AUD');
        // expect(result).toContain('EUR');

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
    });
});


// Testing object
describe('getProduct', () => {
    it('should return the product with given id ', () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({ id: 1, price: 10 });
        // when testing objects use toEqual. this function checks for object equality.
        // unlike ToBe function which checks for reference value.

        // other matchers can be used
        // expect(result).toMatchObject({id: 1});
        expect(result).toHaveProperty('id', 1);

    });
});

// Testing exceptions
describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => expect(() => { lib.registerUser(a) }).toThrow());
    })

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('Shady');
        expect(result).toMatchObject({ username: 'Shady' });
        expect(result.id).toBeGreaterThan(0);
    });
});


describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {

        // override function implementation with fake
        db.getCustomerSync = function (customerId) {
            console.log('fake reading function...');
            return { id: customerId, points: 20 };
        }

        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

// interaction testing
describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {

        // fake
        db.getCustomerSync = function (customerId) {
            return { email: 'a' };
        }

        // interaction test
        let mailSent = false;
        mail.send = function (mail, mesage) {
            mailSent = true;
        }

        lib.notifyCustomer({ customerId: 1 })
        expect(mailSent).toBe(true);
    });
});

// testing againest Jest mock funtion
describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {

        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 })
        
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});