import { connectToDB } from "@utils/database";
import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: `${process.env.EMAIL_ID}`,
        pass: `${process.env.PASS}`
    }
});
export async function POST(request) {
    try {
        await connectToDB();
        const { to, otp, name } = await request.json();
        const sub = "OTP verification";
        const mailDetails = {
            from: `${process.env.EMAIL_ID}`,
            to: to,
            subject: sub,
            html: `<p> Hi ${name},</p>
            <p>Your One Time Password for NIT-miniMap is: <b>${otp}</b></p>`
        };
        const res = await transporter.sendMail(mailDetails);
        return new Response(JSON.stringify({ success: true, res: res }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }));
    }
}

export async function GET() {
    return new Response("This is a GET request")
}