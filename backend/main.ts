import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors"; // Il middleware CORS è già dentro Hono!

const app = new Hono();

// 1. ATTIVAZIONE DEL CORS (In una sola riga, accetta tutte le origini di default)
app.use("/api/*", cors({ origin: "http://localhost:5173" }));

// 2. LA TUA ROTTA DI TEST
app.get("/api/test", (c) => {
  return c.json({
    status: "OK",
    message: "Il backend del portfolio con Hono è attivo!",
  });
});

// 3. AVVIO DEL SERVER NATIVO
// Deno.serve ha bisogno di app.fetch per agganciare il motore di Hono
if (import.meta.main) {
  Deno.serve(app.fetch);
}
