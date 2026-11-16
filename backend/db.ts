import pg from "pg";
import { openKv } from "@deno/kv";

export const kv = await openKv();

const databaseUrl = Bun.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing into .env");
}

const caCertificate = await Bun.file("./prod-ca-2021.crt").text();

export const client = new pg.Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: true,
    ca: caCertificate,
  },
  max: 10,
});

await client.connect();
