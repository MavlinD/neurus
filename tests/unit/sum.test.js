// let { mount } = require('@vue/test-utils')
import { mount } from '@vue/test-utils'
// import {HelloWorld} from '@/components/HelloWorld'
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
