import { BiTrash } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

type songsType = {
    id: number;
    url: string;
    title: string;
    artist: string;
    origin: "english" | "arabic";
    duration: number;
}[];

const ManageSongs = () => {
    const [origin, setOrigin] = useState("all");
    const [songs, setSongs] = useState<songsType>([]);
    const { fetch, fetching } = useApi();
    const { fetch: remove } = useApi();

    useEffect(() => {
        (async () => {
            const res = await fetch({
                url: "/songs",
                method: "get",
            });
            setSongs(res);
        })();
    }, []);

    const handleDelete = async (id: number) => {
        setSongs(songs.filter((song) => song.id !== id));
        await remove({
            url: "/songs/" + id,
            method: "delete",
        });
    };

    const filteredSongs = () => {
        if (origin === "all") {
            return songs;
        } else {
            return songs.filter((song) => song.origin === origin);
        }
    };

    return (
        <div className="">
            <div className="max-w-6xl mx-auto flex items-center justify-between h-[70px]">
                <div className="flex items-center gap-3">
                    {["all", "arabic", "english"].map((o) => (
                        <button
                            key={o}
                            onClick={() => setOrigin(o)}
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
                <button className="flex gap-2 items-center py-2 pl-3 pr-1 text-primary hover:text-primary/80 transition-all">
                    <GrAdd /> Add
                </button>
            </div>
            <div className="h-[calc(100vh-70px)] overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <table className="border border-primary mb-5">
                        <thead>
                            <tr className="[&>th]:border-primary [&>th]:border sticky top-[-.5px] text-black bg-primary border border-primary">
                                <td className="text-center w-[60px]">Serial</td>
                                <td className="text-center">Title</td>
                                <td className="text-center">Artist</td>
                                <td className="text-center">Origin</td>
                                <td className="text-center">Duration</td>
                                <td className="text-center">Plays</td>
                                <td className="text-center w-[70px]">
                                    Actions
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {!fetching &&
                                filteredSongs().map((song, index) => (
                                    <tr
                                        className="[&>td]:border-primary [&>td]:border hover:bg-primary/85 hover:text-[#000]"
                                        key={index}
                                    >
                                        <td className="text-center">
                                            {index < 9
                                                ? `0${index + 1}`
                                                : index + 1}
                                        </td>
                                        <td>{song.title}</td>
                                        <td>{song.artist}</td>
                                        <td className="text-center">
                                            {song.origin}
                                        </td>
                                        <td className="text-center">
                                            0{Math.floor(song.duration / 60)}:
                                            {song.duration % 60 <= 9
                                                ? `0${song.duration % 60}`
                                                : song.duration % 60}
                                        </td>
                                        <td className="text-center">
                                            {index * 11 * ((index % 3) + 1)}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleDelete(song.id)
                                                }
                                                className="w-full flex items-center justify-center cursor-pointer"
                                            >
                                                <BiTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {fetching && (
                        <div className="h-[calc(100vh-130px)] flex items-center justify-center">
                            <div className="loader"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageSongs;
