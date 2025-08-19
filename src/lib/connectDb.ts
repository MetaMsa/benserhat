import mongoose from "mongoose";

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

export async function connectDb() {
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: false
        };

        cached.promise = mongoose.connect(process.env.DATABASE_URL! || "mongodb://localhost:27017/benserhat", opts).then((mongoose) => {
            console.log("bağlantı başarılı");
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}