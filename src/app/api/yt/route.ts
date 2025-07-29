export async function GET()
{
    const apiKey = process.env.YT_API_KEY;
    const apiId = process.env.YT_API_ID;
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${apiId}&key=${apiKey}`);
    const data = await response.json();

    return Response.json(data);
}