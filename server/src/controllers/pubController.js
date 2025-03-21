import { Router } from "express";
import { getErrorMessage } from '../utils/errorUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import * as publicationsService from '../services/pubService.js';

const publicationsController = Router();

// CATALOG page (all users)
publicationsController.get('/', async (req, res) => {
    try {
        const publications = await publicationsService.getAllPublications();
        res.json({ publications });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

// CREATE page (authenticated users only)
// GET method
publicationsController.get('/create', isAuth, (req, res) => {
    res.json({ message: 'Create page' });
});

// POST method
publicationsController.post('/create', isAuth, async (req, res) => {
    const productData = req.body;
    productData.owner = req.user._id;
    try {
        await publicationsService.createRecipe(productData);
        res.status(201).json({ message: 'Publication created successfully' });
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
});

// UPDATE page (authenticated users that are owners only)
// GET method
publicationsController.get('/edit/:id', isAuth, async (req, res) => {
    const recipeId = req.params.id;

    try {
        const recipe = await publicationsService.getRecipeById(recipeId);
        if (!recipe.owner.equals(req.user._id)) {
            return res.status(403).json({ error: 'You are not the owner of the recipe' });
        }
        res.json({ recipe });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

// POST method
publicationsController.post('/edit/:id', isAuth, async (req, res) => {
    const recipeId = req.params.id;
    const userId = req.user._id;
    const productData = req.body;
    try {
        const recipe = await publicationsService.getRecipeById(recipeId);
        if (!recipe.owner.equals(req.user._id)) {
            return res.status(403).json({ error: 'You are not the owner of the recipe' });
        }
        await publicationsService.editRecipe(recipeId, userId, productData);
        res.json({ message: 'Recipe updated successfully' });
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
});

// DELETE page (authenticated users that are owners only)
// GET method
publicationsController.delete('/delete/:id', isAuth, async (req, res) => {
    const recipeId = req.params.id;
    const userId = req.user._id;
    try {
        await publicationsService.deleteRecipe(recipeId, userId);
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

// DETAILS page (all users)
// GET method
publicationsController.get('/details/:id', async (req, res) => {
    const recipeId = req.params.id;
    try {
        const recipe = await publicationsService.getRecipeById(recipeId);
        const isOwner = recipe.owner.equals(req.user?._id);
        const hasRecommended = req.user && recipe.recommendList.some(id => id.equals(req.user._id));
        const peopleWhoRecommend = recipe.recommendList.length;
        res.json({ recipe, user: req.user, isOwner, hasRecommended, peopleWhoRecommend });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

// RECOMMEND recipe (authenticated users that are NOT owners only)
// GET method
publicationsController.post('/recommend/:id', isAuth, async (req, res) => {
    const recipeId = req.params.id;
    const userId = req.user._id;
    try {
        await publicationsService.recommendRecipe(recipeId, userId);
        res.json({ message: 'Recipe recommended successfully' });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

export default publicationsController;

// import { Router } from "express";
// import { getErrorMessage } from '../utils/errorUtils.js';
// import { isAuth } from '../middlewares/authMiddleware.js';
// import * as publicationsService from '../services/pubService.js';

// const publicationsController = Router();

// // CATALOG page (all users)
// publicationsController.get('/', async (req, res) => {
//     try {
//         const publications = await publicationsService.gelAllPublications();
//         res.json({ publications });
//     } catch (error) {
//         res.status(500).json({ error: getErrorMessage(error) });
//     }
// });

// // CREATE page (authenticated users only)
// // GET method
// publicationsController.get('/create', isAuth, (req, res) => {
//     res.render('publications/create');
// });
// // POST method
// publicationsController.post('/create', isAuth, async (req, res) => {
//     const productData = req.body;
//     productData.owner = req.user._id;
//     try {
//         await publicationsService.createRecipe(productData);
//         res.redirect('/');
//     } catch (error) {
//         res.render('recipes/create', { error: getErrorMessage(error), product: productData });
//     }
// });

// // UPDATE page (authenticated users that are owners only)
// // GET method
// publicationsController.get('/edit/:id', isAuth, async (req, res) => {
//     const recipeId = req.params.id;

//     try {
//         const recipe = await publicationsService.getRecipeById(recipeId);
//         if (!recipe.owner.equals(req.user._id)) {
//             return res.status(404).render('404', { error: 'You are not the owner of the recipe' });
//         }
//         res.render('recipes/edit', { recipe });
//     } catch (error) {
//         res.render('recipes/edit', { error: getErrorMessage(error) });
//     }
// });

// // POST method
// publicationsController.post('/edit/:id', isAuth, async (req, res) => {
//     const recipeId = req.params.id;
//     const userId = req.user._id;
//     const productData = req.body;
//     try {
//         const recipe = await publicationsService.getRecipeById(recipeId);
//         if (!recipe.owner.equals(req.user._id)) {
//             return res.status(404).render('404', { error: 'You are not the owner of the recipe' });
//         }
//         await publicationsService.editRecipe(recipeId, userId, productData);
//         res.redirect(`/recipes/details/${recipeId}`);
//     } catch (error) {
//         res.render('recipes/edit', { error: getErrorMessage(error), recipe: productData });
//     }
// });

// // DELETE page (authenticated users that are owners only)
// // GET method
// publicationsController.get('/delete/:id', isAuth, async (req, res) => {
//     const recipeId = req.params.id;
//     const userId = req.user._id;
//     try {
//         await publicationsService.deleteRecipe(recipeId, userId);
//         res.redirect('/');
//     } catch (error) {
//         res.render('recipes/details', { error: getErrorMessage(error) });
//     }
// });

// // DETAILS page (all users)
// // GET method
// publicationsController.get('/details/:id', async (req, res) => {
//     const recipeId = req.params.id;
//     try {
//         const recipe = await publicationsService.getRecipeById(recipeId);
//         const isOwner = recipe.owner.equals(req.user?._id);
//         const hasRecommended = req.user && recipe.recommendList.some(id => id.equals(req.user._id));
//         const peopleWhoRecommend = recipe.recommendList.length;
//         res.render('recipes/details', { recipe, user: req.user, isOwner, hasRecommended, peopleWhoRecommend });
//     } catch (error) {
//         res.render('recipes/details', { error: getErrorMessage(error) });
//     }
// });

// // RECCOMEND recipe (authenticated users that are NOT owners only)
// // GET method
// publicationsController.get('/recommend/:id', isAuth, async (req, res) => {
//     const recipeId = req.params.id;
//     const userId = req.user._id;
//     try {
//         await publicationsService.recommendRecipe(recipeId, userId);
//         res.redirect(`/recipes/details/${recipeId}`);
//     } catch (error) {
//         res.render('recipes/details', { error: getErrorMessage(error) });
//     }
// });

// export default publicationsController;