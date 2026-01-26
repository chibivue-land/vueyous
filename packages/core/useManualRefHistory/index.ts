import type { Ref } from "vue";

import { timestamp } from "@vueyous/shared";
// NOTE: 実際は 'vue-demi' からimportされてる
import { computed, markRaw, ref } from "vue";

export interface UseRefHistoryRecord<T> {
  snapshot: T;
  timestamp: number;
}

export interface UseManualHistoryOptions<Raw> {
  setSource?: (source: Ref<Raw>, v: Raw) => void;
}

export interface UseManualRefHistoryReturn<Raw> {
  // TODO: もらう source をなぜ返す必要があるのか?
  // /** Bypassed tracking ref from the argument s*/
  // source: Ref<Raw>;

  /** An array of history records for undo, newest comes to first */
  history: Ref<UseRefHistoryRecord<Raw>[]>;

  /** Last history point, source can be different if paused */
  last: Ref<UseRefHistoryRecord<Raw>>;

  /** Same as {@link UseManualRefHistoryReturn.history | history} */
  undoStack: Ref<UseRefHistoryRecord<Raw>[]>;

  /** Records array for redo */
  redoStack: Ref<UseRefHistoryRecord<Raw>[]>;

  /** A ref representing if undo is possible (non empty undoStack) */
  canUndo: Ref<boolean>;

  /** A ref representing if redo is possible (non empty redoStack) */
  canRedo: Ref<boolean>;

  /** Undo changes */
  undo: () => void;

  /** Redo changes */
  redo: () => void;

  /** Clear all the history */
  clear: () => void;

  /** Create a new history record */
  commit: () => void;

  /** Reset ref's value with latest history */
  reset: () => void;
}

function fnSetSource<F>(source: Ref<F>, value: F) {
  return (source.value = value);
}

export function useManualRefHistory<Raw>(
  source: Ref<Raw>,
  options: UseManualHistoryOptions<Raw> = {},
): UseManualRefHistoryReturn<Raw> {
  const { setSource = fnSetSource } = options;

  function _createHistoryRecord(): UseRefHistoryRecord<Raw> {
    return markRaw({
      snapshot: source.value,
      timestamp: timestamp(),
    });
  }

  const last: Ref<UseRefHistoryRecord<Raw>> = ref(_createHistoryRecord()) as Ref<
    UseRefHistoryRecord<Raw>
  >;

  const undoStack: Ref<UseRefHistoryRecord<Raw>[]> = ref([]);
  const redoStack: Ref<UseRefHistoryRecord<Raw>[]> = ref([]);

  const _setSource = (record: UseRefHistoryRecord<Raw>) => {
    setSource(source, record.snapshot);
    last.value = record;
  };

  const commit = () => {
    undoStack.value.unshift(last.value);
    last.value = _createHistoryRecord();
    // commit した際に redoStack に要素がある場合はそれを全削除
    if (redoStack.value.length) redoStack.value.splice(0, redoStack.value.length);
  };

  const clear = () => {
    undoStack.value.splice(0, undoStack.value.length);
    redoStack.value.splice(0, redoStack.value.length);
  };

  const undo = () => {
    const state = undoStack.value.shift();

    if (state) {
      redoStack.value.unshift(last.value);
      _setSource(state);
    }
  };

  const redo = () => {
    const state = redoStack.value.shift();

    if (state) {
      undoStack.value.unshift(last.value);
      _setSource(state);
    }
  };

  const reset = () => {
    _setSource(last.value);
  };

  const history = computed(() => [last.value, ...undoStack.value]);

  const canUndo = computed(() => undoStack.value.length > 0);
  const canRedo = computed(() => redoStack.value.length > 0);

  return {
    // source,
    undoStack,
    redoStack,
    last,
    history,
    canUndo,
    canRedo,

    clear,
    commit,
    reset,
    undo,
    redo,
  };
}
