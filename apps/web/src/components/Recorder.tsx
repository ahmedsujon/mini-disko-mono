import { useEffect, useRef, useState } from "react";
import { useStore } from "../state/context";
import Axios from "../lib/axios";

const Recorder = () => {
    const store = useStore();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const hasStartedRecording = useRef(false);
    const [, setIsRecording] = useState(false);

    const startRecording = async () => {
        if (!store.publicInputs.song?.duration || !store.publicInputs.song?.id)
            return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }

            const mediaRecorder = new MediaRecorder(stream);
            const chunks: Blob[] = [];

            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                const videoBlob = new Blob(chunks, { type: "video/webm" });
                const formData = new FormData();
                formData.append("video", videoBlob, "recording.webm");
                formData.append("name", store.publicInputs.name);
                formData.append("email", store.publicInputs.email);
                formData.append("phone", store.publicInputs.phone);
                formData.append(
                    "song_id",
                    store.publicInputs.song?.id?.toString() || ""
                );

                // Upload video to backend
                const data = await Axios.post("/recordings", formData);
                console.log({ data });
                store.setPublicInputs({
                    name: "",
                    email: "",
                    phone: "",
                    song: null,
                });
                store.setPublicScreen("user-details");
            };

            mediaRecorder.start();
            setIsRecording(true);

            setTimeout(() => {
                mediaRecorder.stop();
                setIsRecording(false);
                // Stop the camera
                stream.getTracks().forEach((track) => track.stop());
            }, store.publicInputs.song?.duration * 1000);

            mediaRecorderRef.current = mediaRecorder;
        } catch (error) {
            console.error("Error accessing the camera:", error);
        }
    };

    useEffect(() => {
        if (!hasStartedRecording.current) {
            hasStartedRecording.current = true;
            startRecording();
        }
    }, []);

    return (
        <div className="fixed top-2 left-2">
            <video ref={videoRef} style={{ width: "200px" }} />
        </div>
    );
};

export default Recorder;
