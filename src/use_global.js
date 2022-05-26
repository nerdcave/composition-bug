import { ref, computed, watch, watchEffect } from "@vue/composition-api";

let global = null;

export function useGlobal() {
  if (global) return global;

  // global stuff only initialized once
  const count = ref(0);
  const countPlus1 = computed(() => {
    const newVal = count.value + 1;
    console.log("countPlus1 updated to", newVal);
    return newVal;
  });

  watch(count, (val) => console.log("(watch) count updated to", val));
  watchEffect(() => console.log("(watchEffect) count updated to", count.value));

  global = { count, countPlus1 };
  return global;
}
