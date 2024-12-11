exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("recordings", {
        id: {
            type: "bigserial",
            primaryKey: true,
        },
        name: {
            type: "text",
        },
        email: {
            type: "text",
            notNull: true,
        },
        phone: {
            type: "text",
            notNull: true,
        },
        file_url: {
            type: "text",
            notNull: true,
        },
        song_id: {
            type: "int",
            notNull: true,
            references: "songs",
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        updated_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("recordings");
};
