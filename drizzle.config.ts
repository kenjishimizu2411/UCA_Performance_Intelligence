import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./src/db/schema/*.ts", // Aponta para seus arquivos de schema
  out: "./drizzle", // Onde ele vai salvar os arquivos SQL gerados
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});