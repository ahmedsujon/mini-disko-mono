import { observer } from "mobx-react-lite";
import { GoChevronRight } from "react-icons/go";
import { useStore } from "../state/context";

const UserDetails = observer(() => {
    const store = useStore();

    return (
        <div className="flex items-center h-full">
            <div className="flex flex-col gap-4 w-full">
                <h2 className="text-primary text-4xl text-center pb-10 -mt-10">
                    Mini disKo
                </h2>
                <div>
                    <p className="text-primary tracking-[.08rem] mb-1">Name</p>
                    <input
                        className={`w-full border focus:border-primary p-3 text-primary placeholder:text-neutral-700 outline-none bg-[#000] ${store.publicInputs.name ? "border-primary" : "border-neutral-700"}`}
                        type="text"
                        placeholder="ex: John Doe"
                        value={store.publicInputs.name}
                        onChange={(e) =>
                            store.setPublicInputs({
                                ...store.publicInputs,
                                name: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <p className="text-primary tracking-[.08rem] mb-1">Email</p>
                    <input
                        className={`autofill:bg-[#000] w-full border focus:border-primary p-3 text-primary placeholder:text-neutral-700 outline-none bg-[#000] ${store.publicInputs.email ? "border-primary" : "border-neutral-700"}`}
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
                </div>
                <div>
                    <p className="text-primary tracking-[.08rem] mb-1">Phone</p>
                    <input
                        className={`w-full border focus:border-primary p-3 text-primary placeholder:text-neutral-700 outline-none bg-[#000] ${store.publicInputs.phone ? "border-primary" : "border-neutral-700"}`}
                        type="tel"
                        placeholder="ex: 11999999999"
                        value={store.publicInputs.phone}
                        onChange={(e) =>
                            store.setPublicInputs({
                                ...store.publicInputs,
                                phone: e.target.value,
                            })
                        }
                    />
                </div>
                <button
                    onClick={() => store.setPublicScreen("musics")}
                    className="border border-primary p-3 text-primary outline-none bg-[#000] flex items-center justify-center w-[120px] gap-2 self-end disabled:opacity-50"
                    disabled={
                        store.publicInputs.name === "" ||
                        store.publicInputs.email === "" ||
                        store.publicInputs.phone === ""
                    }
                >
                    <span>Next</span> <GoChevronRight />
                </button>
            </div>
        </div>
    );
});

export default UserDetails;
