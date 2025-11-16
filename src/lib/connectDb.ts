import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGODB_URI =
  process.env.DATABASE_URL ||
  "mongodb://localhost:27017/benserhat";

if (!MONGODB_URI) {
  throw new Error("Missing DATABASE_URL");
}

let cached = global.mongooseConn;

if (!cached) {
  cached = global.mongooseConn = { conn: null, promise: null };
}

export async function connectDb() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((m) => m)
      .catch((err) => {
        cached!.promise = null;
        throw err;
      });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}