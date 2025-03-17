<script setup>
</script>

<template>
  <main>
    <div class="watch-usage">
      <h3>Vue 3 中 `ref` 与 `reactive` 的核心区别</h3>
      <div class="markdown-content">
        <h4>1. 适用数据类型</h4>
        <h5>`ref`</h5>
        <ul>
          <li>可包装基本类型（如 `string`、`number`、`boolean`）或单一对象。</li>
          <li>若包装对象或数组，内部会自动通过 `reactive` 转换为响应式代理。</li>
        </ul>
        <h5>`reactive`</h5>
        <ul>
          <li>仅用于包装对象或数组等复杂类型，无法直接处理基本类型。</li>
          <li>若强制用 `reactive` 包装基本类型（如 `reactive(0)`），会触发警告。</li>
        </ul>

        <h4>2. 访问与修改方式</h4>
        <h5>`ref`</h5>
        <ul>
          <li>在 JavaScript 中需通过 `.value` 访问或修改值：</li>
          <pre><code>const num = ref(0);
num.value = 1; // ✅ 修改值</code></pre>
          <li>在模板中无需使用 `.value`，自动解包。</li>
        </ul>
        <h5>`reactive`</h5>
        <ul>
          <li>直接通过属性名访问或修改：</li>
          <pre><code>const state = reactive({ count: 0 });
state.count = 1; // ✅ 修改属性</code></pre>
          <li>无需 `.value`，模板和 JS 中操作一致。</li>
        </ul>

        <h4>3. 响应式实现原理</h4>
        <h5>`ref`</h5>
        <ul>
          <li>对基本类型使用 `Object.defineProperty` 实现数据劫持。</li>
          <li>对对象类型，内部调用 `reactive` 转换为代理对象。</li>
        </ul>
        <h5>`reactive`</h5>
        <ul>
          <li>基于 `Proxy` 代理对象，深度监听所有属性（包括嵌套属性）。</li>
          <li>使用 `Reflect` 操作源对象，确保响应式更新。</li>
        </ul>

        <h4>4. 可变性与赋值限制</h4>
        <h5>`ref`</h5>
        <ul>
          <li>允许重新赋值（即替换整个对象）：</li>
          <pre><code>const obj = ref({ a: 1 });
obj.value = { b: 2 }; // ✅ 替换对象</code></pre>
        </ul>
        <h5>`reactive`</h5>
        <ul>
          <li>不允许直接替换整个对象，仅支持修改内部属性：</li>
          <pre><code>const state = reactive({ a: 1 });
state = { b: 2 }; // ❌ 报错
state.a = 2;      // ✅ 修改属性</code></pre>
        </ul>

        <h4>5. 应用场景</h4>
        <h5>`ref`</h5>
        <ul>
          <li>适合独立的基本类型变量（如计数器、开关状态）。</li>
          <li>需在模板中解构时保留响应性（如传递给子组件）。</li>
        </ul>
        <h5>`reactive`</h5>
        <ul>
          <li>适合复杂对象或嵌套数据结构（如用户信息、表单数据）。</li>
          <li>需要深度响应式追踪（如动态增删对象属性）。</li>
        </ul>

        <h4>6. 初始化与模板使用</h4>
        <h5>`ref`</h5>
        <ul>
          <li>可接受基本类型或对象作为初始值：</li>
          <pre><code>ref(0);          // ✅ 基本类型
ref({ a: 1 });   // ✅ 对象</code></pre>
        </ul>
        <h5>`reactive`</h5>
        <ul>
          <li>必须接受对象或数组作为初始值：</li>
          <pre><code>reactive({ a: 1 }); // ✅ 对象
reactive([1, 2]);   // ✅ 数组
reactive(0);        // ❌ 报错</code></pre>
        </ul>

        <h4>总结对比表</h4>
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>`ref`</th>
              <th>`reactive`</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>数据类型</td>
              <td>基本类型、对象或数组</td>
              <td>对象或数组</td>
            </tr>
            <tr>
              <td>访问方式</td>
              <td>需 `.value`（JS 中）</td>
              <td>直接访问属性</td>
            </tr>
            <tr>
              <td>响应式原理</td>
              <td>基本类型用数据劫持，对象用 `Proxy`</td>
              <td>完全基于 `Proxy`</td>
            </tr>
            <tr>
              <td>重新赋值</td>
              <td>支持替换整个对象</td>
              <td>仅允许修改内部属性</td>
            </tr>
            <tr>
              <td>深度监听</td>
              <td>需手动启用 `deep: true`（对 `ref` 对象）</td>
              <td>默认深度监听</td>
            </tr>
            <tr>
              <td>典型场景</td>
              <td>独立变量、解构场景</td>
              <td>复杂对象、表单状态</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped>
.watch-usage {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.markdown-content {
  padding: 1rem;
  border-radius: 4px;
}

.markdown-content h4 {
  margin-top: 1rem;
}

.markdown-content h5 {
  margin-top: 0.5rem;
}

.markdown-content ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.markdown-content pre {
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin-top: 0.5rem;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.markdown-content th, .markdown-content td {
  padding: 0.5rem;
  text-align: left;
}

.markdown-content th {
  background-color: hwb(247 0% 0%);
}
</style>
