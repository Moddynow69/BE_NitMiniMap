import { connectToDB } from "@utils/database";
import Teacher from "@models/teacher";
export async function GET(request, { params }) {
    try {
        await connectToDB();
        const teachers = await Teacher.findById(params.id);
        return new Response(JSON.stringify(teachers));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}

export async function PATCH(request, { params }) {
    try {
        await connectToDB();
        const {
            name,
            Password
        } = await Teacher.findById(params.id);
        const {
            nameRJ,
            PasswordRJ
        } = request.json();
        const stud = new Teacher({
            name: nameRJ ?? name,
            Password: PasswordRJ ?? Password,
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
        const table = await Teacher.findByIdAndDelete({ _id: params.id });
        return new Response(JSON.stringify({ status: true }));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}