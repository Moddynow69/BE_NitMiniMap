import { connectToDB } from "@utils/database";
import Student from "@models/student";
export async function GET(request) {
    try {
        await connectToDB();
        const students = await Student.find({}).populate('domain_id');
        return new Response(JSON.stringify(students));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}

export async function POST(request) {
    try {
        await connectToDB();
        const { name, password, branch, subsection, roll_no, domain_id } = await request.json();
        const stud = new Student({
            name: name,
            password: password,
            branch: branch,
            subsection: subsection,
            roll_no: roll_no,
            domain_id: domain_id
        })
        const newStudent = await stud.save()
        return new Response(JSON.stringify({ status: true }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}
