import { connectToDB } from "@utils/database";
import Student from "@models/student";
export async function GET(request, { params }) {
    try {
        const roll_no = params.roll_no;
        await connectToDB();
        const studentRN = await Student.find({ roll_no: roll_no});
        return new Response(JSON.stringify(studentRN));
    }
    catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}

export async function PATCH(request, { params }) {
    try {
        await connectToDB();
        const { 
            name,
            Password,
            branch ,
            subsection,
            roll_no,
            domain_id,
         } = await Student.findById(params.roll_no);
         const { 
            nameRJ,
            PasswordRJ,
            branchRJ,
            subsectionRJ,
            roll_noRJ,
            domain_idRJ
         } = request.json();
        const stud = new Student({
            name:nameRJ??name,
            Password:PasswordRJ??Password,
            branch:branchRJ??branch,
            subsection:subsectionRJ??subsection,
            roll_no:roll_noRJ??roll_no,
            domain_id:domain_idRJ??domain_id,
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
        const table = await Student.findByIdAndDelete({_id:params.roll_no});
        return new Response(JSON.stringify({ status: true }));
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}