import { connectToDB } from "@utils/database";
import Timetable from "@models/timetable";
export async function GET(request, { params }) {
    try {
        await connectToDB();
        const teacherSTR = params.teacherOrBranch.replaceALL("_", " ");
        const day_id = params.dayOrID;
        const table = await Timetable.find({ day: day_id ,teacher : teacherSTR}).sort({ start_time: 1 });
        return new Response(JSON.stringify(table));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}