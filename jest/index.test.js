const myFunctions = require('./index.js');

test('Testing Add Positive -- Success', () => {
    const target = 30;
    const result = myFunctions.add(12, 18);
    expect(target).toBe(result);
});

test('Testing Multiply Positive -- Success', () => {
    const target = 35;
    const result = myFunctions.multiply(5, 7);
    expect(target).toBe(result);
});

test('Testing Multiply Positive -- Success', () => {
    const target = 5;
    const result = myFunctions.subtract(10, 5);
    expect(target).toBe(result);
});
