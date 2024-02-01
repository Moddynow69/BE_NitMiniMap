import { Schema, model, models } from 'mongoose';

const clubSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roll_no: {
        type: [Schema.Types.Mixed],
        default: []
    },
    meetings: {
        type: [Schema.Types.Mixed],
        default: []
    },
    events: {
        type: [Schema.Types.Mixed],
        default: []
    }
})

const Club = models.Club || model('Club', clubSchema)
export default Club;