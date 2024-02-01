import { connectToDB } from "@utils/database";
import Timetable from "@models/timetable";
export async function GET(request, { params }) {
    try {
        await connectToDB();
        const day_id = params.dayOrID;
        const table = await Timetable.find({ day: day_id }).sort({ start_time: 1 });
        return new Response(JSON.stringify(table));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}

export async function PATCH(request, { params }) {
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
            subsection } = await Timetable.findById(params.dayOrID);
        const { subjectRJ,
            typeRJ,
            locationRJ,
            dayRJ,
            start_timeRJ,
            end_timeRJ,
            teacherRJ,
            branchRJ,
            sectionRJ,
            subsectionRJ } = request.json();
        const stud = new Timetable({
            subject: subjectRJ ?? subject,
            type: typeRJ ?? type,
            location: locationRJ ?? location,
            day: dayRJ ?? day,
            start_time: start_timeRJ ?? start_time,
            end_time: end_timeRJ ?? end_time,
            teacher: teacherRJ ?? teacher,
            branch: branchRJ ?? branch,
            section: sectionRJ ?? section,
            subsection: subsectionRJ ?? subsection
        })
        const newTable = await stud.save()
        return new Response(JSON.stringify({ status: true }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDB();
        const day_id = params.dayOrID;
        const table = await Timetable.findByIdAndDelete({ _id: day_id });
        return new Response(JSON.stringify({ status: true }));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}