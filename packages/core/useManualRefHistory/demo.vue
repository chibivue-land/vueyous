<script setup lang="ts">
// TODO: make formatDate
import { formatDate } from "@vueuse/core";
import { ref } from "vue";

import { useManualRefHistory } from "../useManualRefHistory";

function format(ts: number) {
  return formatDate(new Date(ts), "YYYY-MM-DD HH:mm:ss");
}

const count = ref(0);
const inc = () => count.value++;
const dec = () => count.value--;
const { canUndo, canRedo, history, commit, undo, redo } = useManualRefHistory(count);
</script>

<template>
  <div>Count: {{ count }}</div>
  <button @click="inc()">Increment</button>
  <button @click="dec()">Decrement</button>
  <span class="ml-2">/</span>
  <button @click="commit()">Commit</button>
  <button :disabled="!canUndo" @click="undo()">Undo</button>
  <button :disabled="!canRedo" @click="redo()">Redo</button>
  <br />
  <br />
  <note>History (limited to 10 records for demo)</note>
  <div class="code-block mt-4">
    <div v-for="i in history" :key="i.timestamp">
      <span class="opacity-50 mr-2 font-mono">{{ format(i.timestamp) }}</span>
      <span class="font-mono">{ value: {{ i.snapshot }} }</span>
    </div>
  </div>
</template>
