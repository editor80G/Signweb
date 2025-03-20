import { Router } from "express";
import { getRecentPublications } from '../services/pubService.js';

const homeController = Router();

// HOME page (all users)
// GET method
homeController.get('/', async (req, res) => {
    try {
        const publications = await getRecentPublications();
        res.json({ publications }); // Send publications as JSON
    } catch (error) {
        console.error('Error fetching publications:', error);
        res.status(500).json({ error: 'Failed to fetch publications' }); // Handle errors gracefully
    }
});

export default homeController;