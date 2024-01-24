import Timetable from '@models/timetable';
import { connectToDB } from '@utils/database';
export async function GET(request) {
    await connectToDB();
    if (Timetable) {
        const classes = await Timetable.find();
        return new Response(JSON.stringify(classes));
    } else {
        return new Response('Timetable is not defined');
    }
}

export async function POST(request) {
    await connectToDB();
    const {
        subject,
        type,
        location,
        day,
        start_time,
        end_time,
        teacher,
        branch,
        section,
        subsection,
    } = request.body;

    const cls = new Timetable({
        subject,
        type,
        location,
        day,
        start_time,
        end_time,
        teacher,
        branch,
        section,
        subsection,
    });

    try {
        const newClass = await cls.save();
        return new Response(JSON.stringify(newClass), { status: 201 });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 400 });
    }
}