import { Router } from "express";
import { getErrorMessage } from '../utils/errorUtils.js';

import * as recipesService from '../services/pubService.js';

const searchController = Router();

// SEARCH page (all users)
// GET method
searchController.get('/', async (req, res) => {
    const searchQuery = req.query.search || '';
    try {
        if (searchQuery !== '') {
            const recipes = await recipesService.searchRecipes(searchQuery);
            res.render('search/index', { recipes, searchQuery });
        }
        else {
            const recipes = await recipesService.getAllRecipes();
            res.render('search/index', { recipes });
        }

    } catch (error) {
        res.render('search/index', { error: getErrorMessage(error) });
    }
});

export default searchController;