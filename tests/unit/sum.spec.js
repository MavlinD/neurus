/**
 * @jest-environment jsdom
 */
// let { mount } = require('@vue/test-utils')
import {mount, shallowMount} from '@vue/test-utils'
import flushPromises from 'flush-promises'
// const HelloWorld = require('@/components/HelloWorld')
// import {HelloWorld} from '@/components/HelloWorld'
// require("@babel/core").transformSync("code", {
//   plugins: ["@babel/plugin-syntax-import-meta"]
// });
import "regenerator-runtime/runtime.js";
global.fetch = require("node-fetch");
import HelloWorld from '@/components/HelloWorld'
import {sleep} from '@/common/tools'
// import * as dotenv from '@vue/test-utils'
// const sum = require('./sum');
const dotenv = require('dotenv');
dotenv.config();
test('adds',  async (done) => {
  // expect((1+ 2)).toBe(3);
    const msg = 'new message'
    // const value = await Promise.resolve(true);
    // expect(value).toBe(true);
    const wrapper = await mount(HelloWorld, {props: {msg}})
    // console.log(wrapper.getData)
    // console.log(wrapper.msg)
    console.log(wrapper.componentVM.msg)
    // await sleep(100)
    // await flushPromises()
    // wrapper.vm.$nextTick(() => {
    //   expect(wrapper.text()).toBe('value')
    //   done()
    // })
    done()
    // const wrapper = await mount(HelloWorld, {
    //   props: { msg }
    // })

});

console.log(process.env.VITE_REPORT_SERVER_DOMAIN)


// describe('HelloWorld.vue', async () => {
//   it('renders props.msg when passed',   () => {
//     const msg = 'new message'
//     const wrapper = mount(HelloWorld, {
//       props: { msg }
//     })
//     // expect(wrapper.text()).toMatch(msg)
//   })
//       done()
// })
