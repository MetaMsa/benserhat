import { redis } from "./redis";

export async function rateLimit(ip: string) {
    const key = `rl:${ip}`;
    const limit = 5;
    const windowSec = 60;

    const count = await redis.incr(key);

    if (count === 1) {
        await redis.expire(key, windowSec);
    }

    return count <= limit;
}