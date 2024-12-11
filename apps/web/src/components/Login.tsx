import { observer } from "mobx-react-lite";
import { useState } from "react";
import useApi from "../hooks/useApi";
import { useStore } from "../state/context";

const Login = observer(() => {
    const store = useStore();
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const { fetch: login, fetching } = useApi();

    const handleLogin = async () => {
        const res = await login({
            url: "/login",
            method: "post",
            body: inputs,
        });
        if (res.token) store.setToken(res.token);
    };

    return (
        <div className="h-dvh max-w-[700px] mx-auto">
            <div className="flex items-center h-full">
                <div className="flex flex-col gap-4 w-full">
                    <div>
                        <p className="text-primary tracking-[.08rem] mb-1">
                            Username
                        </p>
                        <input
                            className={`w-full border focus:border-primary p-3 text-primary placeholder:text-neutral-700 outline-none bg-[#000] ${inputs.username ? "border-primary" : "border-neutral-700"}`}
                            type="text"
                            placeholder="ex: johndoe"
                            value={inputs.username}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    username: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <p className="text-primary tracking-[.08rem] mb-1">
                            Password
                        </p>
                        <input
                            className={`w-full border focus:border-primary p-3 text-primary placeholder:text-neutral-700 outline-none bg-[#000] ${inputs.password ? "border-primary" : "border-neutral-700"}`}
                            type="tel"
                            placeholder="ex: *********"
                            value={inputs.password}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        className="border border-primary p-3 text-primary outline-none bg-[#000] flex items-center justify-center w-[120px] gap-2 self-end disabled:opacity-50"
                        disabled={
                            inputs.username === "" ||
                            inputs.password === "" ||
                            fetching
                        }
                    >
                        {fetching ? "Logging in..." : "Log in"}
                    </button>
                </div>
            </div>
        </div>
    );
});

export default Login;
