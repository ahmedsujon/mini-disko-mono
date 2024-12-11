exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("songs", {
        id: {
            type: "bigserial",
            primaryKey: true,
        },
        url: { type: "text", notNull: true },
        title: { type: "text", notNull: true },
        artist: { type: "text", notNull: true },
        origin: { type: "text", notNull: true },
        duration: { type: "int", notNull: true },
        play_count: { type: "int", notNull: true, default: 0 },
    });
    pgm.createIndex("songs", "url", { unique: true });
};

exports.down = (pgm) => {
    pgm.dropTable("songs");
};
