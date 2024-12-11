import { useState } from "react";
import { useStore } from "../state/context";
import Axios from "../lib/axios";

const useApi = () => {
    const [fetching, setFetching] = useState(false);
    const store = useStore();

    const fetch = async (endpoint: {
        method: "get" | "post" | "put" | "delete";
        url: string;
        body?: any;
    }) => {
        setFetching(true);
        try {
            const response = await (Axios as any)[endpoint?.method](
                endpoint?.url,
                endpoint?.body
            );
            const data = response?.data;
            setFetching(false);
            return data;
        } catch (error) {
            setFetching(false);
            store.setToken("");
            return error;
        }
    };

    return { fetch, fetching };
};

export default useApi;
