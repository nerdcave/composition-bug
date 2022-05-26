import VueCompositionAPI from "@vue/composition-api";
import { expect } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import { useGlobal } from "@/use_global.js";

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

describe("bug", function () {
  it("renders", () => {
    // useGlobal(); // calling this anywhere before it's called in the component seems to fix the issue
    const wrapper = mount(App, { localVue });
    const counter = wrapper.findComponent({ name: "Counter" });
    expect(counter.vm.countPlus1).to.eq(counter.vm.count + 1);

    wrapper.destroy(); // seems to kill the countPlus1 computed and the watchers

    const newVal = 123;
    const { count, countPlus1 } = useGlobal();
    count.value = newVal;
    expect(countPlus1.value).to.eq(newVal + 1);
  });
});
