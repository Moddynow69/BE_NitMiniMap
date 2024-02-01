import { Schema, model, models } from 'mongoose';

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    subsection: {
        type: Number,
        required: true
    },
    roll_no: {
        type: Number,
        required: true
    },
    domain_id: {
        type: String,
        required: true
    }
})

const Student = models.Student || model('Student', studentSchema)
export default Student;