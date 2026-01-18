import swaggerDocument from "../../../../swagger.json";
import { NextResponse } from "next/server";

export async function GET()
{
    return NextResponse.json(swaggerDocument);
}