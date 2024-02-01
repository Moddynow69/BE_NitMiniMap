import { connectToDB } from "@utils/database";
import Timetable from "@models/timetable";
export async function GET(request, { params }) {
    try {
        await connectToDB();
        const day_id = params.dayOrID;
        const branch = params.teacherOrBranch;
        const section = params.section;
        const subsection = params.subsection;
        const time = params.start_time.replaceAll('_', ':')
        const table = await Timetable.find({ section: section, subsection: subsection, day: day_id, branch: branch, start_time: time});
        return new Response(JSON.stringify(table));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}