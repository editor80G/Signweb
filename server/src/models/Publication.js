import { Schema, model } from "mongoose";

const publicationSchema = new Schema({
    image: {
        type: String,
        required: [true, 'Image is required!'],
    },
    file: {
        type: String,
        required: [true, 'File is required!'],
    },
    issue: {
        type: String,
        required: [true, 'Issue is required!'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    typeList: [{
        type: String,
        enum: ['Magazine', 'Book'],
        required: [true, 'Type is required!'],
    }],
}, { timestamps: true });

const Publication = model('Publication', publicationSchema);
export default Publication;
