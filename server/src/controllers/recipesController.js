import { Router } from "express";
import { getErrorMessage } from '../utils/errorUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import * as recipesService from '../services/pubService.js';

const recipesController = Router();

// CATALOG page (all users)
recipesController.get('/', async (req, res) => {
    try {
        const recipes = await recipesService.getAllRecipes();
        res.render('recipes/catalog', { recipes });
    } catch (error) {
        res.render('recipes/catalog', { error: getErrorMessage(error) });
    }
});

// CREATE page (authenticated users only)
// GET method
recipesController.get('/create', isAuth, (req, res) => {
    res.render('recipes/create');
});
// POST method
recipesController.post('/create', isAuth, async (req, res) => {
    const productData = req.body;
    productData.owner = req.user._id;
    try {
        await recipesService.createRecipe(productData);
        res.redirect('/');
    } catch (error) {
        res.render('recipes/create', { error: getErrorMessage(error), product: productData });
    }
});

// UPDATE page (authenticated users that are owners only)
// GET method
recipesController.get('/edit/:id', isAuth, async (req, res) => {
    const recipeId = req.params.id;

    try {
        const recipe = await recipesService.getRecipeById(recipeId);
        if (!recipe.owner.equals(req.user._id)) {
            return res.status(404).render('404', { error: 'You are not the owner of the recipe' });
        }
        res.render('recipes/edit', { recipe });
    } catch (error) {
        res.render('recipes/edit', { error: getErrorMessage(error) });
    }
});

// POST method
recipesController.post('/edit/:id', isAuth, async (req, res) => {
    const recipeId = req.params.id;
    const userId = req.user._id;
    const productData = req.body;
    try {
        const recipe = await recipesService.getRecipeById(recipeId);
        if (!recipe.owner.equals(req.user._id)) {
            return res.status(404).render('404', { error: 'You are not the owner of the recipe' });
        }
        await recipesService.editRecipe(recipeId, userId, productData);
        res.redirect(`/recipes/details/${recipeId}`);
    } catch (error) {
        res.render('recipes/edit', { error: getErrorMessage(error), recipe: productData });
    }
});

// DELETE page (authenticated users that are owners only)
// GET method
recipesController.get('/delete/:id', isAuth, async (req, res) => {
    const recipeId = req.params.id;
    const userId = req.user._id;
    try {
        await recipesService.deleteRecipe(recipeId, userId);
        res.redirect('/');
    } catch (error) {
        res.render('recipes/details', { error: getErrorMessage(error) });
    }
});

// DETAILS page (all users)
// GET method
recipesController.get('/details/:id', async (req, res) => {
    const recipeId = req.params.id;
    try {
        const recipe = await recipesService.getRecipeById(recipeId);
        const isOwner = recipe.owner.equals(req.user?._id);
        const hasRecommended = req.user && recipe.recommendList.some(id => id.equals(req.user._id));
        const peopleWhoRecommend = recipe.recommendList.length;
        res.render('recipes/details', { recipe, user: req.user, isOwner, hasRecommended, peopleWhoRecommend });
    } catch (error) {
        res.render('recipes/details', { error: getErrorMessage(error) });
    }
});

// RECCOMEND recipe (authenticated users that are NOT owners only)
// GET method
recipesController.get('/recommend/:id', isAuth, async (req, res) => {
    const recipeId = req.params.id;
    const userId = req.user._id;
    try {
        await recipesService.recommendRecipe(recipeId, userId);
        res.redirect(`/recipes/details/${recipeId}`);
    } catch (error) {
        res.render('recipes/details', { error: getErrorMessage(error) });
    }
});

export default recipesController;