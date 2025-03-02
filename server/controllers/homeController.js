import { Router } from "express";
import { getRecentRecipes } from '../services/recipesService.js';

const homeController = Router();

// HOME page (all users)
// GET method
homeController.get('/', async (req, res) => {
    const recipes = await getRecentRecipes();
    res.render('home', { recipes });
});

export default homeController;