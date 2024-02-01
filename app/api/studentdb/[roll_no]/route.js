import { connectToDB } from "@utils/database";
import Student from "@models/student";
export async function GET(request, { params }) {
    try {
        const roll_no = params.roll_no;
        await connectToDB();
        const studentRN = await Student.find({ roll_no });
        return new Response(JSON.stringify(studentRN[0]));
    }
    catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}