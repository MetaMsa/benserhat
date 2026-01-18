import axios from "axios";

export async function GET()
{
    const apiKey = process.env.YT_API_KEY;
    const apiId = process.env.YT_API_ID;
    const response = await axios(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${apiId}&key=${apiKey}`);

    return Response.json(response.data);
}