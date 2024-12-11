import { useEffect, useState } from "react";
import { GoChevronDown, GoChevronLeft, GoChevronUp } from "react-icons/go";
import { VscDebugStart } from "react-icons/vsc";
import useApi from "../hooks/useApi";
import { useStore } from "../state/context";
import { observer } from "mobx-react-lite";

type songsType = {
    id: number;
    url: string;
    title: string;
    artist: string;
    origin: "english" | "arabic";
    duration: number;
}[];

const MusicLibrary = observer(() => {
    const store = useStore();
    const [origin, setOrigin] = useState("all");
    const [songs, setSongs] = useState<songsType>([]);
    const [page, setPage] = useState(0);
    const { fetch, fetching } = useApi();

    const [heights, setHeights] = useState(() => ({
        containerHeight: window.innerHeight - 130,
        itemHeight: 50,
        items: Math.floor((window.innerHeight - 130) / 50),
        gap: 15,
    }));

    useEffect(() => {
        (async () => {
            const res = await fetch({
                url: "/songs",
                method: "get",
            });
            setSongs(res);
        })();
    }, []);

    useEffect(() => {
        const updateContainerSize = () => {
            const containerHeight = window.innerHeight - 130;
            const itemHeight = 50;
            const iniGap = 15;
            const items = Math.floor(
                (containerHeight + iniGap) / (itemHeight + iniGap)
            );
            const gap =
                items > 1
                    ? (containerHeight - items * itemHeight) / (items - 1)
                    : iniGap;

            setHeights({ containerHeight, itemHeight, items, gap });
        };

        updateContainerSize();
        window.addEventListener("resize", updateContainerSize);
        return () => window.removeEventListener("resize", updateContainerSize);
    }, []);

    const totalHeight =
        heights.items * heights.itemHeight + (heights.items - 1) * heights.gap;

    const filteredSongs = () => {
        if (origin === "all") {
            return songs;
        } else {
            return songs.filter((song) => song.origin === origin);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between py-3">
                <h2 className="text-primary text-4xl">Mini disKo</h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => store.setPublicScreen("user-details")}
                        className="border border-primary p-3 text-primary outline-none bg-[#000] flex items-center justify-center w-[120px] gap-2"
                    >
                        <GoChevronLeft /> <span>Back</span>
                    </button>
                    <button
                        disabled={!store.publicInputs.song}
                        onClick={() => store.setPublicScreen("streaming")}
                        className="border border-primary p-3 text-primary outline-none bg-[#000] flex items-center justify-center w-[120px] gap-2 disabled:opacity-50"
                    >
                        <span>Start</span> <VscDebugStart />
                    </button>
                </div>
            </div>
            {fetching ? (
                <div className="h-[calc(100vh-130px)] flex items-center justify-center">
                    <div className="loader"></div>
                </div>
            ) : (
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        {["all", "arabic", "english"].map((o) => (
                            <button
                                key={o}
                                onClick={() => {
                                    setOrigin(o);
                                    setPage(0);
                                }}
                                className={`p-2 hover:text-primary transition-all capitalize ${
                                    origin === o
                                        ? "text-primary"
                                        : "text-primary/50"
                                }`}
                            >
                                {o}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-[auto_42px] gap-[14px]">
                        <div className="h-[calc(100vh-130px)] overflow-hidden">
                            <div
                                className="flex flex-col gap-[14px] w-full transition-transform"
                                style={{
                                    gap: heights.gap,
                                    transform: `translateY(-${page * totalHeight + heights.gap * page}px)`,
                                }}
                            >
                                {filteredSongs().map((song, index) => (
                                    <div
                                        onClick={() =>
                                            store.setPublicInputs({
                                                ...store.publicInputs,
                                                song: song,
                                            })
                                        }
                                        key={index}
                                        className={
                                            `border border-primary p-3 cursor-pointer transition-all hover:text-black hover:bg-primary/85` +
                                            (store.publicInputs.song?.url ===
                                            song.url
                                                ? " bg-primary/85 text-black"
                                                : " text-primary")
                                        }
                                    >
                                        {index < 9
                                            ? `0${index + 1}`
                                            : index + 1}
                                        {". "}
                                        {song.artist} - {song.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-[calc(100vh-130px)] flex flex-col justify-between">
                            <button
                                disabled={page === 0}
                                onClick={() => setPage(page - 1)}
                                className="border border-primary p-3 text-primary outline-none bg-[#000] flex items-center justify-center h-[120px] disabled:opacity-30"
                            >
                                <GoChevronUp />
                            </button>
                            <button
                                disabled={
                                    (page + 1) * heights.items >=
                                    filteredSongs().length
                                }
                                onClick={() => setPage(page + 1)}
                                className="border border-primary p-3 text-primary outline-none bg-[#000] flex items-center justify-center h-[120px] disabled:opacity-30"
                            >
                                <GoChevronDown />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default MusicLibrary;
