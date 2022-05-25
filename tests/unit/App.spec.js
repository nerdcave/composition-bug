import VueCompositionAPI from "@vue/composition-api";
import { expect } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

describe("bug", function () {
  // same test twice

  it("renders first", async () => {
    const wrapper = mount(App, { localVue });
    const counterEl = wrapper.findComponent({ name: "Counter" });
    expect(counterEl.vm.countPlus1).to.eq(counterEl.vm.count + 1);
    wrapper.destroy(); // this (unexpectedly) kills the countPlus1 computed from updating in the next test
  });

  // this test fails but should pass
  it("renders second", async () => {
    const wrapper = mount(App, { localVue });
    const counterEl = wrapper.findComponent({ name: "Counter" });
    expect(counterEl.vm.countPlus1).to.eq(counterEl.vm.count + 1);
    wrapper.destroy();
  });
});
