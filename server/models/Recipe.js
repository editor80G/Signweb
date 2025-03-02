import { Schema, model } from "mongoose";

const recipesSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minlength: [2, 'Title must be at least 2 characters long!'],
        index: true // Add an index to the title field
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients are required!'],
        minlength: [10, 'Ingredients must be at least 10 characters long!'],
        maxlength: [200, 'Ingredients must be less than 200 characters long!']
    },
    instructions: {
        type: String,
        required: [true, 'Instructions are required!'],
        minlength: [10, 'Instructions must be at least 10 characters long!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minlength: [10, 'Description must be at least 10 characters long!'],
        maxlength: [100, 'Description must be less than 100 characters long!']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image URL must start with http:// or https://']
    },
    recommendList: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date, default: Date.now,
        index: true // Add an index to the createdAt field
    }
});

// Create a compound index on title and createdAt fields
recipesSchema.index({ title: 1, createdAt: -1 });

const Recipes = model('Recipes', recipesSchema);
export default Recipes;