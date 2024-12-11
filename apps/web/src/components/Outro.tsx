import { useEffect, useState } from "react";
import { BiLeftArrowAlt, BiSend } from "react-icons/bi";
import { useStore } from "../state/context";

const Outro = () => {
    const store = useStore();
    const [redirectingIn, setRedirectingIn] = useState(60);

    const resetAndRedirect = () => {
        store.setPublicInputs({
            name: "",
            email: "",
            phone: "",
            song: null,
        });
        store.setPublicScreen("user-details");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setRedirectingIn((prev) => {
                if (prev === 0) {
                    resetAndRedirect();
                    return 0;
                } else {
                    return prev - 1;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    });

    return (
        <div className="h-dvh flex items-center">
            <div className=" border-primary max-w-[1000px] mx-auto p-10 text-primary">
                <button
                    className="flex items-center gap-2 -mt-24 mb-24"
                    onClick={() => resetAndRedirect()}
                >
                    <BiLeftArrowAlt className="text-2xl" /> Back to home
                </button>
                <h2 className="text-5xl text-center mt-10 mb-3">
                    Awesome!<br></br> You just rocked it buddy!
                </h2>
                <h3 className="text-l max-w-[800px] mt-10 mb-3">
                    {store.publicInputs.name || "Annonymous"}, we have prepared
                    a reel for you. Would you like to get the download link on
                    your mail?
                </h3>
                <div className="flex items-center gap-3">
                    <input
                        className={`w-full border focus:border-primary p-3 text-primary placeholder:text-neutral-700 outline-none bg-[#000] ${store.publicInputs.email ? "border-primary" : "border-neutral-700"}`}
                        type="email"
                        placeholder="ex: johndoe@hotmail.com"
                        value={store.publicInputs.email}
                        onChange={(e) =>
                            store.setPublicInputs({
                                ...store.publicInputs,
                                email: e.target.value,
                            })
                        }
                    />
                    <button
                        onClick={() => resetAndRedirect()}
                        className="h-[50px] bg-primary text-black w-[70px] flex items-center justify-center text-3xl"
                    >
                        <BiSend />
                    </button>
                </div>
                <h3 className="text-sm max-w-[800px] mt-10 mb-3">
                    Redirecting to the home in 00:
                    {redirectingIn < 10 ? `0${redirectingIn}` : redirectingIn}
                </h3>
            </div>
        </div>
    );
};

export default Outro;
