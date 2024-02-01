import { Schema, model, models } from 'mongoose';

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const Teacher = models.Teacher || model('Teacher', teacherSchema)
export default Teacher;