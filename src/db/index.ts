import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:ib7UOPuDWeNSeig3@db.jtcrrnngbgrmqczerfve.supabase.co:5432/postgres";

let dbInstance: ReturnType<typeof drizzle> | null = null;
let sqlClient: postgres.Sql | null = null;

export function getDb() {
  if (!dbInstance && connectionString) {
    try {
      // Disable prefetch as recommended for Supabase Transaction Pool mode
      sqlClient = postgres(connectionString, {
        prepare: false,
        max: 10,
        idle_timeout: 20,
        connect_timeout: 10,
      });
      dbInstance = drizzle(sqlClient, { schema });
    } catch (err) {
      console.warn("Drizzle Postgres initialization notice:", err);
    }
  }
  return dbInstance;
}

export const db = getDb();
export { schema, sqlClient };
export default db;
