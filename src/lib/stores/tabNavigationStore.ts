import { writable } from "svelte/store";

export interface TabData {
    icon: string,
    link?: string,
    onClick?: () => void,
    disabled?: boolean
}

function customTabs() {
    const { subscribe, set, update } = writable<TabData[]>([]);

    const customSet = (value: TabData[], timeOut = 250) => {
        set([]);
        setTimeout(() => {
            set(value);
        }, timeOut);
    };

    const customUpdate = (updater: (tabs: TabData[]) => TabData[]) => {
        update((currentTabs) => updater([...currentTabs]));
      };

    return {
        subscribe,
        set: customSet,
        update: customUpdate
    };
}


export const tabs = customTabs();