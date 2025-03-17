<script setup>
import { ref, watch, watchEffect, onMounted, onUnmounted } from 'vue'

const model = ref({ name: 'Alice', email: '', age: 10 });
const logs = ref([]);
const deep = ref(true);
const immediate = ref(false);
const flush = ref('post'); // 默认值为 'post'

let stopWatch;

watchEffect(() => {
  if (stopWatch) stopWatch();
  stopWatch = watch(
    () => model.value.name + model.value.email,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        logs.value.push(`() => model.value.name+model.value.email---changed from ${oldValue} to ${newValue}`);
      }
    },
    { deep: deep.value, immediate: immediate.value, flush: flush.value }
  );

});

let intervalId;

onMounted(() => {
  intervalId = setInterval(() => {
    logs.value = [];
  }, 10000);
});

onUnmounted(() => {
  clearInterval(intervalId);
  if (stopWatch) stopWatch();
});
</script>

<template>
  <main>
    <div>
      <label>
        <input type="checkbox" v-model="deep" />
        Deep
      </label>
      <label>
        <input type="checkbox" v-model="immediate" />
        Immediate
      </label>
      <label>
        Flush:
        <select v-model="flush">
          <option value="pre">Pre</option>
          <option value="post">Post</option>
          <option value="sync">Sync</option>
        </select>
      </label>
    </div>

    <form>
      <div>
        <label for="name">Name: </label>
        <input id="name" v-model="model.name" type="text" />
      </div>
      <div>
        <label for="email">Email: </label>
        <input id="email" v-model="model.email" type="email" />
      </div>
    </form>

    <div>
      <h3>Logs:</h3>
      <ul>
        <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
      </ul>
    </div>
  </main>
</template>
