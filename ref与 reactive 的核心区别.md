# Vue 3 中 `ref` 与 `reactive` 的核心区别

## 1. 适用数据类型

### `ref`
- 可包装基本类型（如 `string`、`number`、`boolean`）或单一对象。
- 若包装对象或数组，内部会自动通过 `reactive` 转换为响应式代理。

### `reactive`
- 仅用于包装对象或数组等复杂类型，无法直接处理基本类型。
- 若强制用 `reactive` 包装基本类型（如 `reactive(0)`），会触发警告。

## 2. 访问与修改方式

### `ref`
- 在 JavaScript 中需通过 `.value` 访问或修改值：
  ```javascript
  const num = ref(0);
  num.value = 1; // ✅ 修改值
  ```
- 在模板中无需使用 `.value`，自动解包。

### `reactive`
- 直接通过属性名访问或修改：
  ```javascript
  const state = reactive({ count: 0 });
  state.count = 1; // ✅ 修改属性
  ```
- 无需 `.value`，模板和 JS 中操作一致。

## 3. 响应式实现原理

### `ref`
- 对基本类型使用 `Object.defineProperty` 实现数据劫持。
- 对对象类型，内部调用 `reactive` 转换为代理对象。

### `reactive`
- 基于 `Proxy` 代理对象，深度监听所有属性（包括嵌套属性）。
- 使用 `Reflect` 操作源对象，确保响应式更新。

## 4. 可变性与赋值限制

### `ref`
- 允许重新赋值（即替换整个对象）：
  ```javascript
  const obj = ref({ a: 1 });
  obj.value = { b: 2 }; // ✅ 替换对象
  ```

### `reactive`
- 不允许直接替换整个对象，仅支持修改内部属性：
  ```javascript
  const state = reactive({ a: 1 });
  state = { b: 2 }; // ❌ 报错
  state.a = 2;      // ✅ 修改属性
  ```

## 5. 应用场景

### `ref`
- 适合独立的基本类型变量（如计数器、开关状态）。
- 需在模板中解构时保留响应性（如传递给子组件）。

### `reactive`
- 适合复杂对象或嵌套数据结构（如用户信息、表单数据）。
- 需要深度响应式追踪（如动态增删对象属性）。

## 6. 初始化与模板使用

### `ref`
- 可接受基本类型或对象作为初始值：
  ```javascript
  ref(0);          // ✅ 基本类型
  ref({ a: 1 });   // ✅ 对象
  ```

### `reactive`
- 必须接受对象或数组作为初始值：
  ```javascript
  reactive({ a: 1 }); // ✅ 对象
  reactive([1, 2]);   // ✅ 数组
  reactive(0);        // ❌ 报错
  ```

## 总结对比表

| 特性         | `ref`                        | `reactive`                |
|--------------|------------------------------|---------------------------|
| 数据类型     | 基本类型、对象或数组         | 对象或数组                |
| 访问方式     | 需 `.value`（JS 中）         | 直接访问属性              |
| 响应式原理   | 基本类型用数据劫持，对象用 `Proxy` | 完全基于 `Proxy`          |
| 重新赋值     | 支持替换整个对象             | 仅允许修改内部属性        |
| 深度监听     | 需手动启用 `deep: true`（对 `ref` 对象） | 默认深度监听              |
| 典型场景     | 独立变量、解构场景           | 复杂对象、表单状态        |