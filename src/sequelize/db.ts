import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { Sequelize } from "sequelize";

// Load .env if present (no dotenv package required)
const envPath = resolve(process.cwd(), ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) {
      const key = m[1];
      const val = m[2].replace(/^["']|["']$/g, "").trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

// Supabase is PostgreSQL — use connection string or individual env vars
let databaseUrl = process.env.DATABASE_URL;

// Remove sslmode from URL so our dialectOptions.ssl (rejectUnauthorized: false) is used.
// Otherwise URL query params override and Node rejects Supabase's cert.
if (databaseUrl?.includes("sslmode=")) {
  databaseUrl = databaseUrl
    .replace(/\?sslmode=[^&]+&?/, "?")
    .replace(/&sslmode=[^&]+/, "")
    .replace(/\?$/, "");
}

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: { rejectUnauthorized: false },
      },
    })
  : new Sequelize(
      process.env.SUPABASE_DB_NAME ?? "postgres",
      process.env.SUPABASE_DB_USER ?? "postgres",
      process.env.SUPABASE_DB_PASSWORD ?? "",
      {
        host: process.env.SUPABASE_DB_HOST ?? "db.<project-ref>.supabase.co",
        dialect: "postgres",
        port: Number(process.env.SUPABASE_DB_PORT) || 5432,
        logging: false,
        dialectOptions: {
          ssl: { rejectUnauthorized: false },
        },
      }
    );

export default sequelize;
