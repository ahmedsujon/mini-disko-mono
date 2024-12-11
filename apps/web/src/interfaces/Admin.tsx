import { useState } from "react";
import ManageSongs from "../components/ManageSongs";
import { useStore } from "../state/context";
import Login from "../components/Login";
import { observer } from "mobx-react-lite";
import { HiLogout } from "react-icons/hi";

export type AdminScreen = "songs" | "recordings" | "config";

const Admin = observer(() => {
    const store = useStore();
    const [screen, setScreen] = useState<AdminScreen>("songs");

    return (
        <>
            {store.token === "" ? (
                <Login />
            ) : (
                <div className="text-primary h-dvh w-dvw grid grid-cols-[50px_auto] relative">
                    <div
                        onClick={() => store.setToken("")}
                        className={`absolute left-0 bottom-0 cursor-pointer w-[50px] border-t border-primary py-4 text-2xl flex items-center justify-center transition-all hover:bg-primary hover:text-[#000]`}
                    >
                        <HiLogout />
                    </div>
                    <div className="border-x border-primary flex justify-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div
                                onClick={() => setScreen("songs")}
                                className={`py-3 border-x border-primary cursor-pointer text-center w-[110px] -rotate-90 origin-center -translate-y-[50px] ${
                                    screen === "songs" &&
                                    "bg-primary text-[#000]"
                                }`}
                            >
                                <div className="">Songs</div>
                            </div>
                            <div
                                onClick={() => setScreen("recordings")}
                                className={`py-3 cursor-pointer text-center w-[110px] -rotate-90 origin-center ${
                                    screen === "recordings" &&
                                    "bg-primary text-[#000]"
                                }`}
                            >
                                Recordings
                            </div>
                            <div
                                onClick={() => setScreen("config")}
                                className={`py-3 border-x border-primary cursor-pointer text-center w-[110px] -rotate-90 origin-center translate-y-[50px] ${
                                    screen === "config" &&
                                    "bg-primary text-[#000]"
                                }`}
                            >
                                Config
                            </div>
                        </div>
                    </div>
                    <div className="h-dvh overflow-hidden px-[10px]">
                        {screen === "songs" ? (
                            <ManageSongs />
                        ) : screen === "recordings" ? (
                            <div>Recordings</div>
                        ) : (
                            <div>Config</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
});

export default Admin;
