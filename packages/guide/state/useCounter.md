# useCounter

Create a simple composable function for managing a counter.

## Why Do We Need useCounter?

Web applications frequently require functionality to increment and decrement numbers:

- Like button counts
- Shopping cart item quantities
- Pagination page numbers
- Timer or stopwatch seconds

Implementing these with `ref` and functions every time is redundant. `useCounter` allows you to reuse counter functionality in a consistent way.

## Basic Implementation

Let's start with the simplest version.

```ts
import { ref } from "vue";

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const inc = () => count.value++;
  const dec = () => count.value--;
  const reset = () => (count.value = initialValue);

  return { count, inc, dec, reset };
}
```

### Usage

```vue
<script setup lang="ts">
import { useCounter } from "./useCounter";

const { count, inc, dec, reset } = useCounter(0);
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="inc">+1</button>
    <button @click="dec">-1</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

This alone provides basic counter functionality. However, there's still room for improvement.

## Feature Extensions

The current implementation only has minimal functionality. Let's add the following features:

- Increment/decrement by arbitrary values (+5, -3, etc.)
- Min/max value constraints
- Set to a specific value

```ts
import { ref, computed } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity } = options;

  const count = ref(initialValue);

  const inc = (delta = 1) => {
    count.value = Math.min(max, count.value + delta);
  };

  const dec = (delta = 1) => {
    count.value = Math.max(min, count.value - delta);
  };

  const set = (value: number) => {
    count.value = Math.max(min, Math.min(max, value));
  };

  const reset = () => {
    count.value = initialValue;
  };

  const isMin = computed(() => count.value <= min);
  const isMax = computed(() => count.value >= max);

  return { count, inc, dec, set, reset, isMin, isMax };
}
```

### What Has Been Improved?

1. **Arbitrary increment/decrement**: By adding the `delta` argument, you can now increment/decrement by arbitrary values.
2. **Value constraints**: Added `min` and `max` options to keep the counter value within a specific range.
3. **Derived state**: Added `isMin` and `isMax` computed properties to easily determine if the current value has reached the minimum or maximum.

### Usage (Extended Version)

```vue
<script setup lang="ts">
import { useCounter } from "./useCounter";

// Constrain to range 0-10
const { count, inc, dec, set, reset, isMin, isMax } = useCounter(5, {
  min: 0,
  max: 10,
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="inc()" :disabled="isMax">+1</button>
    <button @click="inc(5)" :disabled="isMax">+5</button>
    <button @click="dec()" :disabled="isMin">-1</button>
    <button @click="set(7)">Set to 7</button>
    <button @click="reset">Reset</button>
    <p v-if="isMin">Minimum value reached</p>
    <p v-if="isMax">Maximum value reached</p>
  </div>
</template>
```

## Comparison with VueUse

Let's look at the actual VueUse [useCounter](https://github.com/vueuse/vueuse/blob/main/packages/shared/useCounter/index.ts) implementation.

Key differences:

1. **MaybeRef type support**: VueUse allows passing a `Ref` as `initialValue`
2. **More detailed type definitions**: Return value types are clearly defined
3. **Edge case handling**: More robust error handling

VueUse's implementation is more versatile, but the basic structure is the same as what we've created.

## Advanced Patterns

With the implementation so far, you understand the basics, but advanced implementations like VueUse use several additional techniques.

### shallowRef vs ref

When dealing with **primitive values** like numbers, there's essentially no difference between `ref` and `shallowRef`. However, it's important to understand the concept.

```ts
import { ref, shallowRef } from "vue";

// ref: deep reactivity
const deepState = ref({ nested: { value: 0 } });
deepState.value.nested.value++; // reactively updated

// shallowRef: shallow reactivity
const shallowState = shallowRef({ nested: { value: 0 } });
shallowState.value.nested.value++; // NOT reactively updated
shallowState.value = { nested: { value: 1 } }; // This IS reactive
```

**Choice for useCounter:**

- Numbers are primitive, so `ref` is sufficient
- However, VueUse sometimes uses `shallowRef` for consistency
- Performance impact is negligible for primitive values

### MaybeRef Type and unref/toValue

One of VueUse's most powerful features is **argument flexibility**.

```ts
import type { MaybeRef } from "vue";
import { ref, unref } from "vue";

// MaybeRef<T> = T | Ref<T>
// Can accept both static and reactive values
export function useCounter(initialValue: MaybeRef<number> = 0) {
  // unref extracts the value (if Ref, .value; otherwise, as-is)
  const count = ref(unref(initialValue));

  // ...
}

// Usage flexibility
const counter1 = useCounter(5); // static value
const initialRef = ref(10);
const counter2 = useCounter(initialRef); // reactive value
```

**unref vs toValue:**

```ts
import { unref } from "vue";
import { toValue } from "@vueuse/shared";

const value = ref(5);
const getter = () => 10;

unref(value); // 5 (gets Ref value)
unref(getter); // () => 10 (functions remain as-is)

toValue(value); // 5 (gets Ref value)
toValue(getter); // 10 (executes function and gets result)
```

VueUse uses `toValue` to handle `Ref | Getter | Static` all at once.

### Implementation Example: MaybeRef Support

```ts
import type { MaybeRef } from "vue";
import { ref, computed, unref } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue: MaybeRef<number> = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity } = options;

  // Extract value with unref, then convert to ref
  const count = ref(unref(initialValue));

  const inc = (delta = 1) => {
    count.value = Math.min(max, count.value + delta);
  };

  const dec = (delta = 1) => {
    count.value = Math.max(min, count.value - delta);
  };

  const set = (value: number) => {
    count.value = Math.max(min, Math.min(max, value));
  };

  const reset = () => {
    count.value = unref(initialValue); // Also extract original value on reset
  };

  const isMin = computed(() => count.value <= min);
  const isMax = computed(() => count.value >= max);

  return { count, inc, dec, set, reset, isMin, isMax };
}
```

This implementation enables flexible usage like:

```ts
// Static value
const counter1 = useCounter(5);

// Reactive value
const initialCount = ref(10);
const counter2 = useCounter(initialCount);

// Changing initialCount later won't affect counter2
// (because the value was extracted once with unref)
```

## Learned Patterns

Through this section, you've learned the following patterns:

### 1. Basic Composable Function Structure

```ts
export function useXxx(initialValue, options = {}) {
  // Reactive state
  const state = ref(initialValue)

  // Operation methods
  const method1 = () => { /* ... */ }
  const method2 = () => { /* ... */ }

  // Derived state (computed)
  const derivedState = computed(() => /* calculation based on state */)

  // Return state and methods
  return { state, method1, method2, derivedState }
}
```

### 2. Options Argument Pattern

```ts
export interface UseXxxOptions {
  option1?: Type1;
  option2?: Type2;
}

export function useXxx(initialValue, options: UseXxxOptions = {}) {
  const { option1 = defaultValue1, option2 = defaultValue2 } = options;
  // ...
}
```

### 3. Value Clamping Pattern

```ts
const clampedValue = Math.max(min, Math.min(max, value));
```

### 4. Derived State with computed

```ts
// Define values dependent on state with computed
const isMin = computed(() => count.value <= min);
const isMax = computed(() => count.value >= max);

// Benefits:
// 1. Automatically updates reactively
// 2. Cached for efficiency
// 3. Can be used directly in templates (:disabled="isMax")
```

## Summary

`useCounter` is one of the simplest composable functions, but it's packed with important patterns:

- Managing reactive state (`ref`)
- Defining derived state (`computed`)
- Flexibility through options arguments
- Ensuring type safety
- Value constraints and validation

In the next section, we'll learn more complex state management patterns.

## Practice: Implement useCounter

Let's implement `useCounter` using what you've learned so far.

### Preparation: Development Environment Setup

If you haven't set up your development environment yet, refer to [Setting Up](../setting-up.md) to create the `my-vueyouse` project.

### Step 1: Create Files

In the root of your `my-vueyouse` project, create the following directory and file.

```bash
mkdir -p packages/core/useCounter
```

Create `packages/core/useCounter/index.ts` and copy the following skeleton code.

```ts
import { ref, computed } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity } = options;

  const count = ref(initialValue);

  // TODO: Implement inc, dec, set, reset methods

  const inc = (delta = 1) => {
    // implement here
  };

  const dec = (delta = 1) => {
    // implement here
  };

  const set = (value: number) => {
    // implement here
  };

  const reset = () => {
    // implement here
  };

  const isMin = computed(() => {
    // implement here
    return false;
  });

  const isMax = computed(() => {
    // implement here
    return false;
  });

  return { count, inc, dec, set, reset, isMin, isMax };
}
```

### Step 2: Implement Methods

Implement the following methods:

1. **inc(delta)**: Increment count (clamped to not exceed `max`)
2. **dec(delta)**: Decrement count (clamped to not go below `min`)
3. **set(value)**: Set to specific value (clamped within `min` and `max` range)
4. **reset()**: Return to `initialValue`
5. **isMin**: computed that returns `count.value <= min`
6. **isMax**: computed that returns `count.value >= max`

**Hints:**

- Combine `Math.min(max, value)` and `Math.max(min, value)` to clamp values
- There's an implementation example in the "Feature Extensions" section

### Step 3: Export and Use

Export from `packages/index.ts`.

```ts
export { useCounter } from "./core/useCounter";
```

### Step 4: Create Demo File

Create `src/demos/UseCounterDemo.vue` to test.

```vue
<script setup lang="ts">
import { useCounter } from "vueyouse";

const { count, inc, dec, set, reset, isMin, isMax } = useCounter(5, {
  min: 0,
  max: 10,
});
</script>

<template>
  <div>
    <h2>useCounter Demo</h2>
    <p>Count: {{ count }}</p>
    <button @click="inc()" :disabled="isMax">+1</button>
    <button @click="dec()" :disabled="isMin">-1</button>
    <button @click="set(7)">Set to 7</button>
    <button @click="reset">Reset</button>
    <p v-if="isMin">Minimum value reached</p>
    <p v-if="isMax">Maximum value reached</p>
  </div>
</template>
```

### Step 5: Import in App.vue

Update `src/App.vue` to display the demo.

```vue
<script setup lang="ts">
import UseCounterDemo from "./demos/UseCounterDemo.vue";
</script>

<template>
  <div>
    <h1>VueYous Demos</h1>
    <hr />
    <UseCounterDemo />
  </div>
</template>
```

Start the dev server (`pnpm run dev`) and verify it works!

> [!TIP]
> By separating demo files into `src/demos/`, you can add new sections without overwriting `App.vue`. Create independent demo files for each composable and import them in `App.vue` for display.

## Practice Exercises

Try adding the following features:

1. `double()` method: Double the count (considering max value constraint)
2. `onChange` callback: Function called when value changes
3. `get()` method: Returns current value (instead of count.value)

<details>
<summary>Hints</summary>

```ts
import { ref, computed, watch } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity, onChange } = options;

  const count = ref(initialValue);

  // Existing methods...

  const double = () => {
    // Set count.value * 2 within max value constraint
    set(count.value * 2);
  };

  const get = () => {
    // Return current value
    return count.value;
  };

  // Watch onChange
  if (onChange) {
    watch(count, (newValue) => onChange(newValue));
  }

  return { count, inc, dec, set, reset, double, get, isMin, isMax };
}
```

</details>

<details>
<summary>Solution</summary>

### Complete Implementation

```ts
import { ref, computed, watch } from "vue";

export interface UseCounterOptions {
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min = -Infinity, max = Infinity, onChange } = options;

  const count = ref(initialValue);

  const inc = (delta = 1) => {
    count.value = Math.min(max, count.value + delta);
  };

  const dec = (delta = 1) => {
    count.value = Math.max(min, count.value - delta);
  };

  const set = (value: number) => {
    count.value = Math.max(min, Math.min(max, value));
  };

  const reset = () => {
    count.value = initialValue;
  };

  // 1. double() method
  const double = () => {
    // Using set method automatically applies max value constraint
    set(count.value * 2);
  };

  // 3. get() method
  const get = () => {
    return count.value;
  };

  const isMin = computed(() => count.value <= min);
  const isMax = computed(() => count.value >= max);

  // 2. onChange callback
  if (onChange) {
    watch(count, (newValue) => {
      onChange(newValue);
    });
  }

  return { count, inc, dec, set, reset, double, get, isMin, isMax };
}
```

### Usage

```vue
<script setup lang="ts">
import { useCounter } from "./useCounter";

const { count, inc, dec, double, get, reset } = useCounter(5, {
  min: 0,
  max: 100,
  onChange: (value) => {
    console.log("Count changed:", value);
  },
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Current value: {{ get() }}</p>
    <button @click="inc()">+1</button>
    <button @click="double()">Double</button>
    <button @click="reset()">Reset</button>
  </div>
</template>
```

### Key Points

1. **double()**: By reusing the existing `set()` method, we avoid duplicating value constraint logic
2. **onChange**: Using `watch` automatically executes the callback whenever the value changes
3. **get()**: An alias for `count.value`. Convenient for retrieving the value outside templates

</details>

---

Next: [useToggle](./useToggle.md) (Coming Soon)
