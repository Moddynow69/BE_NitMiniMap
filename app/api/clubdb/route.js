import { connectToDB } from "@utils/database";
import Club from "@models/club";
export async function GET(request) {
    try {
        await connectToDB();
        const clubs = await Club.find();
        return new Response(JSON.stringify(clubs));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}


export async function POST(request) {
    try {
        await connectToDB();
        const { name, password, meetings, events } = await request.json();
        const clubPost = new Club({
            name: name,
            password: password,
            meetings: meetings,
            events: events
        })
        const newClub = await clubPost.save()
        return new Response(JSON.stringify({ status: true }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}
