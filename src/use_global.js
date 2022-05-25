import { ref, computed } from "@vue/composition-api";

let global = null;

export function useGlobal() {
  if (global) return global;

  // only initialized once
  const count = ref(0);
  const countPlus1 = computed(() => {
    const newVal = count.value + 1;
    console.log("countPlus1 updated to", newVal);
    return newVal;
  });

  global = { count, countPlus1 };
  return global;
}
