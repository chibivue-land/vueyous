import type { Ref } from "vue";
import type { UseManualRefHistoryReturn } from "../useManualRefHistory";

import { watchIgnorable } from "@vueyous/shared";
import { useManualRefHistory } from "../useManualRefHistory";

export interface UseRefHistoryReturn<Raw> extends UseManualRefHistoryReturn<Raw> {}

export function useRefHistory<Raw>(source: Ref<Raw>) {
  const { ignoreUpdates } = watchIgnorable(source, commit);

  function setSource(source: Ref<Raw>, value: Raw) {
    ignoreUpdates(() => {
      source.value = value;
    });
  }

  const manualHistory = useManualRefHistory(source, { setSource });
  const { commit: manualCommit } = manualHistory;

  function commit() {
    manualCommit();
  }

  return {
    ...manualHistory,
  };
}
