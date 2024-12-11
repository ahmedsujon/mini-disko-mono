/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useMemo,
    type PropsWithChildren,
} from "react";
import type { TState } from "./state";

export const storeContext = createContext<{ store: TState }>({
    store: {} as TState,
});

export type TStoreProviderProps = PropsWithChildren<{
    store: TState;
}>;

export function StoreProvider({ store, children }: TStoreProviderProps) {
    const value = useMemo(
        () => ({
            store,
        }),
        [store]
    );

    return (
        <storeContext.Provider value={value}>{children}</storeContext.Provider>
    );
}

export function useStore(): TState {
    const contextValue = useContext(storeContext);
    if (!contextValue) {
        throw new Error(
            "must be called within a state context provider subtree"
        );
    }
    return contextValue.store;
}
