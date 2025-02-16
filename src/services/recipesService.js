import Recipe from '../models/Recipe.js';

// Create a new recipe
export async function createRecipe(data) {
    try {
        return await Recipe.create(data);
    } catch (error) {
        throw new Error('Error creating recipe: ' + error.message);
    }
}

// Edit a recipe
export async function editRecipe(recipeId, userId, data) {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe.owner.equals(userId)) {
        throw new Error('Error deleting recipe: User is not the owner of the recipe.');
    }
    try {
        return await Recipe.findByIdAndUpdate(recipeId, data, { runValidators: true });
    } catch (error) {
        throw new Error('Error editing recipe: ' + error.message);
    }
}

// Delete a recipe
export async function deleteRecipe(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe.owner.equals(userId)) {
        throw new Error('Error deleting recipe: User is not the owner of the recipe.');
    }
    try {
        return await Recipe.findByIdAndDelete(recipeId);
    } catch (error) {
        throw new Error('Error deleting recipe: ' + error.message);
    }
}

// Get all recipes
export async function getAllRecipes() {
    try {
        // Temporarily pass an empty array to test the {{else}} block
        // const recipes = [];
        const recipes = await Recipe.find().sort({ createdAt: -1 }).lean();
        return recipes;
    } catch (error) {
        throw new Error('Error fetching recipes: ' + error.message);
    }
}

// Get the 3 most recent recipes
export async function getRecentRecipes() {
    try {
        // Temporarily pass an empty array to test the {{else}} block
        // const recipes = []; 
        const recipes = await Recipe.find().sort({ createdAt: -1 }).limit(3).lean(); // Get the 3 most recent recipes
        return recipes;
    } catch (error) {
        throw new Error('Error fetching recipes: ' + error.message);
    }
}

// Get a recipe by ID
export async function getRecipeById(id) {
    try {
        return await Recipe.findById(id).lean();
    } catch (error) {
        throw new Error('Error fetching recipe: ' + error.message);
    }
}

// Recommend a recipe
export async function recommendRecipe(recipeId, userId) {
    try {
        const recipe = await Recipe.findById(recipeId);
        if (recipe.owner.equals(userId)) {
            throw new Error('Error recommending own recipe!');
        }
        if (recipe.recommendList.includes(userId)) {
            throw new Error('Error recommending recipe: User has already recommended this recipe.');
        }
        recipe.recommendList.push(userId);
        await recipe.save();
    } catch (error) {
        throw new Error('Error recommending recipe: ' + error.message);
    }
}

// Search recipes by title
export async function searchRecipes(searchQuery) {
    try {
        const query = searchQuery ? { title: { $regex: searchQuery, $options: 'i' } } : {};
        return await Recipe.find(query).lean();
    } catch (error) {
        throw new Error('Error searching recipes: ' + error.message);
    }
}

