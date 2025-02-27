import { initialSpec, initialData } from "$lib/placeholder";

export const data = $state({
    spec: JSON.stringify(initialSpec, null, 2),
    plotData: JSON.stringify(initialData, null, 2),
})
