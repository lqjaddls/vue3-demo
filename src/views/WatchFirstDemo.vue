<script setup>
import { reactive, ref, watch, watchEffect, onMounted, onUnmounted, nextTick } from 'vue'

const model = reactive({ name: 'Alice', email: '', age: 10, profile: { description: '###' } });
const list = reactive([model]);
const logs = ref([]);
const watchMode = ref('whole'); // 用于切换监听模式
const code = ref('');
const originalCode = ref('');

let stopWatch;

const getTimeStamp = () => {
  const now = new Date();
  return now.toLocaleTimeString();
};

const codeSnippets = {
  whole: `
let _stopWatch =  watch(
  model,
  (newVal, oldVal) => {
    logs.value.unshift(\`\${getTimeStamp()} - mode(whole) -  value changed from \${JSON.stringify(oldVal)} to \${JSON.stringify(newVal)}\`);
  }
  // ,{deep:false}
);
return _stopWatch;
`,
  property: `
let _stopWatch =  watch(
  () => model.name,
  (newVal, oldVal) => {
    logs.value.unshift(\`\${getTimeStamp()} - mode(property) -  value changed from \${JSON.stringify(oldVal)} to \${JSON.stringify(newVal)}\`);
  }
);
return _stopWatch;
`,
  multiple: `
let _stopWatch =  watch(
  () => [model.name, model.email],
  ([newName, newEmail], [oldName, oldEmail]) => {
    if (newName !== oldName) {
      logs.value.unshift(\`\${getTimeStamp()} - mode(multiple) - Name changed from \${oldName} to \${newName}\`);
    }
    if (newEmail !== oldEmail) {
      logs.value.unshift(\`\${getTimeStamp()} - mode(multiple) - Email changed from \${oldEmail} to \${newEmail}\`);
    }
  }
);
return _stopWatch;
`,
  multipleArray: `
let _stopWatch =  watch(
  [() => model.name, () => model.email],
  ([newName, newEmail], [oldName, oldEmail]) => {
    if (newName !== oldName) {
      logs.value.unshift(\`\${getTimeStamp()} - mode(multipleArray) - Name changed from \${oldName} to \${newName}\`);
    }
    if (newEmail !== oldEmail) {
      logs.value.unshift(\`\${getTimeStamp()} - mode(multipleArray) - Email changed from \${oldEmail} to \${newEmail}\`);
    }
  }
);
return _stopWatch;
`,
  nested: `
let _stopWatch =  watch(
  () => model.profile.description,
  (newVal, oldVal) => {
    logs.value.unshift(\`\${getTimeStamp()} - mode(nested) - value changed from \${JSON.stringify(oldVal)} to \${JSON.stringify(newVal)}\`);
  }
  // ,{deep:false}
);
return _stopWatch;
`,
  immediate: `
let _stopWatch =  watch(
  model,
  (newVal, oldVal) => {
    logs.value.unshift(\`\${getTimeStamp()} - mode(immediate) - value changed from \${JSON.stringify(oldVal)} to \${JSON.stringify(newVal)}\`);
  },
  { immediate: true }
);
return _stopWatch;
`,
  watchEffect: `
let _stopWatch =  watchEffect(() => {
  logs.value.unshift(\`\${getTimeStamp()} - mode(watchEffect) - 用户名（自动追踪）:model.name = \${model.name}\`);
  logs.value.unshift(\`\${getTimeStamp()} - mode(watchEffect) - 用户名（自动追踪）:model.email = \${model.email}\`);
  logs.value.unshift(\`\${getTimeStamp()} - mode(watchEffect) - 用户名（自动追踪）:model.profile.description = \${model.profile.description}\`);
});
return _stopWatch;
`,
  array: `
let _stopWatch =  watch(
  list,
  (newList) => {
    logs.value.unshift(\`\${getTimeStamp()} - mode(array) - 数组变化: \${JSON.stringify(newList)}\`);
  },
  { deep: true } // 监听数组元素变化时需要
);
return _stopWatch;
`
};

const applyCode = (newCode) => {
  if (stopWatch) {
    console.log(`${watchMode.value} stopWatch is called`);
    stopWatch();
  }
  try {
    console.log(`应用代码: ${newCode}`);
    // 动态执行 textarea 中的代码
    const fn = new Function('model', 'list', 'logs', 'watch', 'watchEffect', 'getTimeStamp', newCode);
    stopWatch = fn(model, list, logs, watch, watchEffect, getTimeStamp);
    originalCode.value = newCode;
  } catch (error) {
    console.error('Error executing code:', error);
  }
};

watchEffect(() => {
  if (code.value === '') {
    code.value = codeSnippets[watchMode.value];
    applyCode(code.value);
  }
  if (originalCode.value === '') {
    originalCode.value = code.value;
  }
});

watch(watchMode, (newMode, oldMode) => {
  if (stopWatch) {
    console.log(`${oldMode} stopWatch is called`);
    stopWatch();
  }
  code.value = codeSnippets[newMode];
  originalCode.value = code.value;
  applyCode(code.value);
});

watch(code, (newCode) => {
  if (newCode !== originalCode.value) {
    document.getElementById('applyButton').disabled = false;
  } else {
    document.getElementById('applyButton').disabled = true;
  }
});

watch(logs, async () => {
  await nextTick();
  const logsContainer = document.querySelector('.logs');
  if (logsContainer) {
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }
});

let intervalId;

onMounted(() => {
  intervalId = setInterval(() => {
    logs.value = [];
  }, 20000);
});

onUnmounted(() => {
  clearInterval(intervalId);
  if (stopWatch) stopWatch();
});
</script>

<template>
  <main>
    <div>
      <label for="watchMode">选择监听模式:</label>
      <select id="watchMode" v-model="watchMode">
        <option value="whole">监听整个对象</option>
        <option value="property">监听对象的某个属性</option>
        <option value="multiple">监听多个属性</option>
        <option value="multipleArray">监听多个属性（数组）</option>
        <option value="nested">监听嵌套对象的深层属性</option>
        <option value="immediate">立即触发回调（immediate）</option>
        <option value="watchEffect">使用 watchEffect 自动追踪依赖</option>
        <option value="array">监听数组变化</option>
      </select>
    </div>

    <div>
      <h3>代码示例:</h3>
      <textarea v-model="code" rows="13" cols="80"></textarea>
      <button id="applyButton" @click="applyCode(code)" :disabled="code === originalCode">生效</button>
    </div>

    <form>
      <div v-if="watchMode === 'whole' || watchMode === 'array' ||  watchMode === 'property' || watchMode === 'multiple' || watchMode === 'multipleArray' || watchMode === 'nested' || watchMode === 'immediate' || watchMode === 'watchEffect'">
        <label for="name">Name: </label>
        <input id="name" v-model="model.name" type="text" />
      </div>
      <div v-if="watchMode === 'whole' || watchMode === 'array' || watchMode === 'multiple' || watchMode === 'multipleArray' || watchMode === 'nested' || watchMode === 'immediate' || watchMode === 'watchEffect'">
        <label for="email">Email: </label>
        <input id="email" v-model="model.email" type="email" />
      </div>
      <div v-if="watchMode === 'whole' || watchMode === 'array' || watchMode === 'nested' || watchMode === 'immediate' || watchMode === 'watchEffect'">
        <label for="description">Description: </label>
        <input id="description" v-model="model.profile.description" type="text" />
      </div>
    </form>

    <div>
      <h3>Logs:</h3>
      <ul class="logs">
        <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}

form {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

select {
  margin-bottom: 1rem;
}

textarea {
  width: 100%;
  margin-bottom: 1rem;
}

button {
  margin-top: 0;
}

h3 {
  margin-top: 1rem;
}

ul.logs {
  max-height: 300px;
  overflow-y: auto;
  list-style-type: disc;
  padding-left: 1.5rem;
}
</style>
