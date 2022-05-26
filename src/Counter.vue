<template>
  <div>
    <p>Run the tests to see the problem (yarn test:unit)</p>
    <p>This is just to verify the code works:</p>
    <p>
      count: {{ count }}<br />
      countPlus1: {{ countPlus1 }}
      <button @click="count += 1">inc</button>
    </p>
  </div>
</template>

<script>
/* eslint-disable */
import { useGlobal } from "./use_global.js";

export default {
  name: "Counter",
  setup() {
    const { count, countPlus1 } = useGlobal();

    // should trigger countPlus1 computed to update and watchers
    count.value = Math.ceil(Math.random() * 1000);

    return { count, countPlus1 };
  },
};
</script>
