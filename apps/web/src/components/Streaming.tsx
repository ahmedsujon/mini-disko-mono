import { useEffect, useState } from "react";
import { MdOutlineMusicNote } from "react-icons/md";
import { useStore } from "../state/context";
import "../styles/reord.css";
import Recorder from "./Recorder";

const Streaming = () => {
    const store = useStore();
    const [count, setCount] = useState<number>(
        store.publicInputs.song?.duration || 0
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount === 0) {
                    // store.setPublicScreen("outro");
                    return 0;
                } else {
                    return prevCount - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <Recorder />
            <div className="music-animtion">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="absolute bottom-5 left-5 text-primary">
                <div className="flex items-center gap-2">
                    <MdOutlineMusicNote />
                    <span className="border-r border-primary pr-3 mr-1">
                        {store.publicInputs.song?.title} -{" "}
                        {store.publicInputs.song?.artist}
                    </span>
                    <span>
                        {Math.floor(count / 60)}:
                        {count % 60 < 10 ? `0${count % 60}` : count % 60}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Streaming;
