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
    const stud = new Student({
        name: req.body.name,
        password: req.body.password,
        branch: req.body.branch,
        subsection: req.body.subsection,
        roll_no: req.body.roll_no,
        domain_id: req.body.domain_id
    })

    try {
        const newStudent = await stud.save()
        return new Response(json(newStudent)).status(201);
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}
