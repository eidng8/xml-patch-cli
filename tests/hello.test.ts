import sayHello from '../src';

test('it says hello', () => {
  expect(sayHello('World')).toBe('Hello World!');
});
