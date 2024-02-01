import { connectToDB } from "@utils/database";
import Teacher from "@models/teacher";
export async function GET(request) {
    try {
        await connectToDB();
        const teachers = await Teacher.find();
        return new Response(JSON.stringify(teachers));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}


export async function POST(request) {
    try {
        await connectToDB();
        const { name, password } = await request.json();
        const teach = new Teacher({
            name: name,
            password: password
        })
        const teachers = await teach.save()
        return new Response(JSON.stringify({ status: true }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}
