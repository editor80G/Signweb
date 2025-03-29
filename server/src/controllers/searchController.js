import { Router } from "express";
import { getErrorMessage } from '../utils/errorUtils.js';
import * as publicationsService from '../services/pubService.js';

const searchController = Router();


// SEARCH page (all users)
// GET method
searchController.get('/', async (req, res) => {
    const searchQuery = req.query.search || '';
    try {
        if (searchQuery !== '') {
            const publications = await publicationsService.searchPublicationsByQuery(searchQuery);
            res.json({ publications: publications, searchQuery });
        }
        else {
            const publications = await publicationsService.getAllPublicationsByType();
            res.json({ publications });
        }

    } catch (error) {
        console.error('Error occurred during search:', error); // Log the error for debugging
        res.status(500).json({ error: getErrorMessage(error) }); // Return JSON error response
    }
});

export default searchController;