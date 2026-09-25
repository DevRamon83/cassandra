import pg from "pg";

const databaseUrl = Deno.env.get("DATABASE_URL");

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing into .env");
}

const caCertificate = await Deno.readTextFile("./prod-ca-2021.crt");

const client = new pg.Client({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: true,
    ca: caCertificate,
  },
});

await client.connect();

export default client;
