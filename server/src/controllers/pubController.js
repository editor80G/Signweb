import { Router } from "express";
import { getErrorMessage } from '../utils/errorUtils.js';
import { isAuth, authorize } from '../middlewares/authMiddleware.js';
import * as publicationsService from '../services/pubService.js';


const publicationsController = Router();

// CATALOG page (all users)
// GET method
publicationsController.get('/:type?', async (req, res) => {
    try {
        const type = req.query.type || req.query.type;
        const publications = await publicationsService.getAllPublicationsByType(type);

        if (publications.length === 0) {
            return res.json({ success: false });
        }
        return res.json({ success: true, publications });
    } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
    }
});

// CREATE page (authenticated users only)
// POST method
publicationsController.post('/create', isAuth, authorize(['admin']), async (req, res) => {
    const data = req.body;
    data.owner = req.user._id;
    try {
        await publicationsService.createPublication(data, req.user.userRole);
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
});

// UPDATE page (authenticated users of admin that are owners only)
// GET method
publicationsController.get('/edit/:id', isAuth, authorize(['admin']), async (req, res) => {
    const publicationId = req.params.id; // get the id from the URL

    try {
        const publication = await publicationsService.getPublicationById(publicationId);
        if (!publication.owner.equals(req.user._id) && !req.user.userRole.includes('admin')) {
            return res.status(403).json({ error: 'You are not the owner of the publication' });
        }
        res.status(200).json({ publication: publication });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

// UPDATE page (authenticated users that are owners only)
// PUT method
publicationsController.put('/edit/:id', isAuth, authorize(['admin']), async (req, res) => {
    const publicationId = req.params.id;
    const userId = req.user._id;
    const data = req.body;

    try {
        const publication = await publicationsService.getPublicationById(publicationId);
        if (!publication.owner.equals(req.user._id) && !req.user.userRole.includes('admin')) {
            return res.status(403).json({ error: 'You are not the owner of the recipe' });
        }
        await publicationsService.editPublicationById(publicationId, userId, data, req.user.userRole);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
});

// DELETE (authenticated users that are owners only)
// DELETE method
publicationsController.delete('/delete/:id', isAuth, authorize(['admin']), async (req, res) => {
    const publicationId = req.params.id;
    const userId = req.user._id;
    const publication = await publicationsService.getPublicationById(publicationId);
    if (!publication.owner.equals(req.user._id) && !req.user.userRole.includes('admin')) {
        return res.status(403).json({ error: 'You are not the owner of the publication' });
    }
    try {
        await publicationsService.deletePublicationById(publicationId, userId, req.user.userRole);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

// DETAILS page (all users)
// GET method
publicationsController.get('/details/:id', async (req, res) => {
    const publicationId = req.params.id;
    const userId = req.user?._id; // `req.user` will be undefined for unauthenticated users
    try {
        const publication = await publicationsService.getPublicationById(publicationId);
        if (!publication) {
            return res.status(404).json({ error: 'Publication not found' });
        }
        const isOwner = publication?.owner?.equals(userId) || false;
        //const hasRecommended = req.user && publication.recommendList.some(id => id.equals(req.user._id));
        //const peopleWhoRecommend = publication.recommendList.length;
        //res.json({ recipe: publication, user: req.user, isOwner, hasRecommended, peopleWhoRecommend });
        res.status(200).json({ publication, isOwner });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

// RECOMMEND recipe (authenticated users that are NOT owners only)
// GET method
// publicationsController.post('/recommend/:id', isAuth, async (req, res) => {
//     const recipeId = req.params.id;
//     const userId = req.user._id;
//     try {
//         await publicationsService.recommendRecipe(recipeId, userId);
//         res.json({ message: 'Recipe recommended successfully' });
//     } catch (error) {
//         res.status(500).json({ error: getErrorMessage(error) });
//     }
// });

export default publicationsController;

