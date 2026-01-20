import type { WatchCallback, WatchSource, WatchStopHandle } from 'vue'
import type { Fn } from '../utils'

import { ref, watch } from 'vue'

export type IgnoredUpdater = (updater: () => void) => void

export interface WatchIgnorableReturn {
  ignoreUpdates: IgnoredUpdater
  stop: WatchStopHandle
}

export function watchIgnorable<T>(
  source: WatchSource<T>,
  cb: WatchCallback<T>,
): WatchIgnorableReturn {
  const disposables: Fn[] = []

  const ignoreCounter = ref(0)

  const ignoreUpdates: IgnoredUpdater = (updater: () => void) => {
    updater()
    ignoreCounter.value++
  }

  disposables.push(
    watch(source, (...args) => {
      const ignore = ignoreCounter.value > 0
      ignoreCounter.value = 0
      if (ignore)
        return
      cb(...args)
    }),
  )

  const stop: () => void = () => {
    disposables.forEach(fn => fn())
  }

  return { stop, ignoreUpdates }
}

// alias
export { watchIgnorable as ignorableWatch }
