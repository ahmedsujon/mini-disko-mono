import { useMemo } from "react";
import Admin from "./interfaces/Admin";
import Public from "./interfaces/Public";
import { makeState } from "./state/state";
import { StoreProvider } from "./state/context";

const App = () => {
    const store = useMemo(() => {
        return makeState();
    }, []);

    return (
        <StoreProvider store={store}>
            {window.location.pathname.startsWith("/admin") ? (
                <Admin />
            ) : (
                <Public />
            )}
        </StoreProvider>
    );
};

export default App;
