import { Router } from "express";
import { getRecentPublications } from '../../services/pubService.js';

const homeController = Router();

// HOME page (all users)
// GET method
homeController.get('/', async (req, res) => {
    const publications = await getRecentPublications();
    res.render('home', { publications });
});

export default homeController;