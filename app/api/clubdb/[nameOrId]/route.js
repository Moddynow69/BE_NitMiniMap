import { connectToDB } from "@utils/database";
import Club from "@models/club";
export async function GET(request, { params }) {
    try {
        await connectToDB();
        const clubs = await Club.find({ name: params.nameOrId });
        return new Response(JSON.stringify(clubs));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}

export async function PATCH(request, { params }) {
    try {
        await connectToDB();
        const {
            name,
            Password,
            meeting,
            roll_no,
            events
        } = await Club.findById(params.nameOrId);
        const {
            nameRJ,
            PasswordRJ,
            meetingRJ,
            roll_noRJ,
            eventsRJ
        } = request.json();
        const changeClub = new Club({
            name: nameRJ ?? name,
            Password: PasswordRJ ?? Password,
            meeting: meetingRJ ?? meeting,
            roll_no: roll_noRJ ?? roll_no,
            events: eventsRJ ?? events
        })
        const newTable = await changeClub.save()
        return new Response(JSON.stringify({ status: true }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDB();
        const table = await Club.findByIdAndDelete({_id:params.nameOrId});
        return new Response(JSON.stringify({ status: true }));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}