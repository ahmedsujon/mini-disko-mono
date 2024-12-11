import { makeAutoObservable } from "mobx";
import {
    loadFromLocalStorage,
    saveToLocalStorage,
} from "../utils/manageLocalStorage";

export type publicInputsT = {
    name: string;
    email: string;
    phone: string;
    song: {
        id: number;
        url: string;
        title: string;
        artist: string;
        origin: "english" | "arabic";
        duration: number;
    } | null;
};
export type PublicScreensT = "user-details" | "musics" | "streaming" | "outro";

export type TState = {
    token: string;
    setToken: (val: string) => void;
    publicScreen: PublicScreensT;
    setPublicScreen: (val: PublicScreensT) => void;
    publicInputs: publicInputsT;
    setPublicInputs: (val: publicInputsT) => void;
};

export function makeState(): TState {
    return makeAutoObservable({
        token: loadFromLocalStorage("token") || "",
        setToken(val: string) {
            this.token = val;
            saveToLocalStorage("token", val);
        },
        publicScreen: "user-details" as PublicScreensT,
        setPublicScreen(val: PublicScreensT) {
            console.log();
            this.publicScreen = val;
        },
        publicInputs: {
            name: "",
            email: "",
            phone: "",
            song: null as publicInputsT["song"],
        },
        setPublicInputs(val: publicInputsT) {
            console.log({ val });
            this.publicInputs = val;
        },
    }) as TState;
}
