export interface Admin {
    id?: string;
    username: string;
    email: string;
    password_hash: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Song {
    id?: string;
    url: string;
    title: string;
    artist: string;
    origin: "english" | "arabic";
    duration: number;
    play_count: number;
}

export interface Recording {
    id?: string;
    name: string;
    email: string;
    phone: string;
    file_url: string;
    song_id: number;
}

export interface DatabaseSchema {
    admin: Admin;
    songs: Song;
    recordings: Recording;
}
