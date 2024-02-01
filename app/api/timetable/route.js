import { connectToDB } from "@utils/database";
import Timetable from "@models/timetable";
export async function GET(request) {
    try {
        await connectToDB();
        const table = await Timetable.find({});
        return new Response(JSON.stringify(table));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}

export async function POST(request) {
    try {
        await connectToDB();
        const { subject,
            type,
            location,
            day,
            start_time,
            end_time,
            teacher,
            branch,
            section,
            subsection } = await request.json();
        const stud = new Timetable({
            subject: subject,
            type: type,
            location: location,
            day: day,
            start_time: start_time,
            end_time: end_time,
            teacher: teacher,
            branch: branch,
            section: section,
            subsection: subsection
        })
        const newTable = await stud.save()
        return new Response(JSON.stringify({ status: true }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}
