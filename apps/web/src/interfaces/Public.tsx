import { observer } from "mobx-react-lite";
import Countdown from "../components/Countdown";
import MusicLibrary from "../components/MusicLibrary";
import Outro from "../components/Outro";
import UserDetails from "../components/UserDetails";
import { useStore } from "../state/context";

const Public = observer(() => {
    const { publicScreen } = useStore();

    return (
        <div className="max-w-[1080px] h-dvh m-auto px-3">
            {publicScreen === "user-details" ? (
                <UserDetails />
            ) : publicScreen === "musics" ? (
                <MusicLibrary />
            ) : publicScreen === "streaming" ? (
                <Countdown />
            ) : (
                <Outro />
            )}
        </div>
    );
});

export default Public;
