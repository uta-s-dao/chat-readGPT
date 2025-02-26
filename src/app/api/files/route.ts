import { promises as fs } from "node:fs";
import { resolve } from "node:path";

export async function GET() {
  const dirPath = resolve(process.cwd(), "./uploads");
  const files = await fs.readdir(dirPath);
  return Response.json({ files });
}
