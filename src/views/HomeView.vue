<script setup>
</script>

<template>
  <main>
    <div class="watch-usage">
      <h3>Watch 用法示例:</h3>
      <pre>
        <code>
          在 Vue 3 中，使用 watch 监听对象（尤其是响应式对象）时，可以通过多种方式实现不同粒度的监听。以下是监听对象属性变化的几种常见方法，结合 Composition API 和 Options API 的用法：

          1. 监听整个对象的变化
          默认情况下，直接监听 reactive 对象会自动启用深度监听（无需手动设置 deep: true）。
          示例：
          ```javascript
          import { reactive, watch } from 'vue';

          setup() {
            const user = reactive({ name: 'Alice', age: 25 });

            // 自动深度监听 user 对象的任何属性变化
            watch(user, (newVal, oldVal) => {
              console.log('user 变化:', newVal);
            });

            return { user };
          }
          ```

          2. 监听对象的特定属性
          方法 1：通过函数返回具体属性值
          只监听对象的某个属性，而不是整个对象。
          示例：
          ```javascript
          watch(
            () => user.name, // 监听 user.name
            (newName, oldName) => {
              console.log('用户名变化:', newName);
            }
          );
          ```

          方法 2：监听多个属性
          使用数组监听多个属性：
          示例：
          ```javascript
          watch(
            [() => user.name, () => user.age],
            ([newName, newAge], [oldName, oldAge]) => {
              console.log('姓名或年龄变化:', newName, newAge);
            }
          );
          ```

          3. 监听嵌套对象的深层属性
          通过函数返回嵌套路径的值：
          示例：
          ```javascript
          const data = reactive({
            user: {
              profile: {
                email: 'alice@example.com'
              }
            }
          });

          watch(
            () => data.user.profile.email, // 监听深层属性
            (newEmail) => {
              console.log('邮箱变化:', newEmail);
            }
          );
          ```

          4. 立即触发回调（immediate）
          初始化时立即执行一次回调：
          示例：
          ```javascript
          watch(
            () => user.name,
            (newVal) => {
              console.log('初始值:', newVal);
            },
            { immediate: true } // 立即执行
          );
          ```

          5. 使用 watchEffect 自动追踪依赖
          watchEffect 会自动追踪回调函数中使用的响应式依赖，无需显式指定监听对象。
          示例：
          ```javascript
          import { reactive, watchEffect } from 'vue';

          setup() {
            const user = reactive({ name: 'Charlie' });

            watchEffect(() => {
              console.log('用户名（自动追踪）:', user.name);
            });

            return { user };
          }
          ```

          6. 监听数组变化
          监听数组的变更（如 push/splice）：
          示例：
          ```javascript
          const list = reactive([1, 2, 3]);

          watch(
            list,
            (newList) => {
              console.log('数组变化:', newList);
            },
            { deep: true } // 监听数组元素变化时需要
          );
          ```

          7. 手动启用深度监听（针对 ref 对象）
          如果对象是用 ref 包裹的，默认不会深度监听，需要手动设置 deep: true。
          示例：
          ```javascript
          import { ref, watch } from 'vue';

          setup() {
            const user = ref({ name: 'Bob', age: 30 });

            watch(
              user,
              (newVal) => {
                console.log('user 变化（深度监听）:', newVal);
              },
              { deep: true } // 必须手动启用
            );

            return { user };
          }
          ```

          总结：Vue 3 监听对象的最佳实践
          - 优先使用 reactive：默认深度监听，适合复杂对象。
          - 精确监听属性：用函数返回具体属性值，避免不必要的深度监听。
          - ref 对象需手动深度监听：使用 { deep: true }。
          - 简化依赖追踪：用 watchEffect 自动收集依赖。
        </code>
      </pre>
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

.watch-usage pre {
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

.watch-usage code {
  display: block;
  white-space: pre-wrap;
  line-height: 1.5;
}

.watch-usage h3 {
  margin-bottom: 1rem;
}

.watch-usage ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.watch-usage li {
  margin-bottom: 0.5rem;
}
</style>
