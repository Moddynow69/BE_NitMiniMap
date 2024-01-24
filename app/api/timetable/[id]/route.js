import Timetable from '@models/timetable';
import { connectToDB } from '@utils/database';

async function getTimetable(id) {
    try {
        const timetable = await Timetable.findById(id);
        if (timetable == null) {
            return null;
        }
        return timetable;
    } catch (err) {
        throw new Error(`Error finding timetable by ID: ${err.message}`);
    }
}

export async function PATCH(request) {
    const { id } = request.params;
    await connectToDB();

    const timetable = await getTimetable(id);

    if (!timetable) {
        return new Response(JSON.stringify({ message: 'Timetable not found' }), { status: 404 });
    }

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

    if (subject != null) timetable.subject = subject;
    if (type != null) timetable.type = type;
    if (location != null) timetable.location = location;
    if (day != null) timetable.day = day;
    if (start_time != null) timetable.start_time = start_time;
    if (end_time != null) timetable.end_time = end_time;
    if (teacher != null) timetable.teacher = teacher;
    if (branch != null) timetable.branch = branch;
    if (section != null) timetable.section = section;
    if (subsection != null) timetable.subsection = subsection;

    try {
        const updatedTimetable = await timetable.save();
        return new Response(JSON.stringify(updatedTimetable), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 400 });
    }
}

export async function DELETE(request) {
    const { id } = request.params;
    await connectToDB();

    const timetable = await getTimetableById(id);

    if (!timetable) {
        return new Response(JSON.stringify({ message: 'Timetable not found' }), { status: 404 });
    }

    try {
        await timetable.remove();
        return new Response(JSON.stringify({ message: 'Successfully deleted' }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}