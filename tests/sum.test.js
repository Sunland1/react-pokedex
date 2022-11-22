//create sum function
const sum = (a, b) => a + b;

//do a test for a + b
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
});