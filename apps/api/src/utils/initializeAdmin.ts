import { db } from "../db/db.js";
import bcrypt from "bcrypt";

async function createAdmin(
    username: string,
    email: string,
    password: string
): Promise<void> {
    try {
        const existingAdmin = await db
            .selectFrom("admin")
            .select("id")
            .where((eb) =>
                eb("username", "=", username).or("email", "=", email)
            )
            .executeTakeFirst();

        if (existingAdmin) {
            console.log("Admin user already exists. Skipping creation.");
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await db
            .insertInto("admin")
            .values({
                username,
                email,
                password_hash: passwordHash,
            })
            .execute();

        console.log("Initialized admin!");
    } catch (error) {
        console.error("Error initializing admin:", error);
    }
}

const initializeAdmin = async () => {
    try {
        await createAdmin("admin", "admin@example.com", "password");
    } catch (error) {
        console.error("Error initializing admin:", error);
    }
};

export default initializeAdmin;
