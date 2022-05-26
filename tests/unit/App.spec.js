/* eslint-disable */
import VueCompositionAPI from "@vue/composition-api";
import { expect } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import { useGlobal } from "@/use_global.js";

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

describe("bug", function () {
  // same test twice

  it("renders first", async () => {
    // useGlobal(); // calling this anywhere before it's called in the component seems to fix the issue
    const wrapper = mount(App, { localVue });
    const counterEl = wrapper.findComponent({ name: "Counter" });
    expect(counterEl.vm.countPlus1).to.eq(counterEl.vm.count + 1);
    wrapper.destroy(); // seems to kill the countPlus1 computed from updating and the watchers
  });

  // this test fails but should pass
  it("renders second", async () => {
    const wrapper = mount(App, { localVue });
    const counterEl = wrapper.findComponent({ name: "Counter" });
    expect(counterEl.vm.countPlus1).to.eq(counterEl.vm.count + 1);
    wrapper.destroy();
  });
});
