import Publication from '../models/Publication.js';

// Create a new publication 
export async function createPublication(data) {
    try {
        return await Publication.create(data);
    } catch (error) {
        throw new Error('Error creating publication: ' + error.message);
    }
}

// Get all publications by type
export async function getAllPublicationsByType(type) {
    try {

        let magazines = [];
        let catalogs = [];

        if (type === 'magazine') {
            magazines = await Publication.find({ type: '1' }).lean();
        } if (type === 'catalog') {
            catalogs = await Publication.find({ type: '2' }).lean();
        }
        return {
            magazines,
            catalogs
        };

    } catch (error) {
        throw new Error('Error fetching publications: ' + error.message);
    }
}

// Edit a publication
export async function editPublication(publicationId, userId, data) {
    const publication = await Publication.findById(publicationId);
    if (!publication.owner.equals(userId)) {
        throw new Error('Error deleting publication: User is not the owner of the publication.');
    }
    try {
        return await Publication.findByIdAndUpdate(publicationId, data, { runValidators: true });
    } catch (error) {
        throw new Error('Error editing publication: ' + error.message);
    }
}

// Delete a publication
export async function deletePublication(publicationId, userId) {
    const recipe = await Publication.findById(publicationId);
    if (!recipe.owner.equals(userId)) {
        throw new Error('Error deleting publication: User is not the owner of the publication.');
    }
    try {
        return await Publication.findByIdAndDelete(publicationId);
    } catch (error) {
        throw new Error('Error deleting publication: ' + error.message);
    }
}



// Get the 3 most recent publications
export async function getRecentPublications() {
    try {
        // Temporarily pass an empty array to test the {{else}} block
        // const publications = []; 
        const recipes = await Publication.find().sort({ createdAt: -1 }).limit(3).lean(); // Get the 3 most recent recipes
        return recipes;
    } catch (error) {
        throw new Error('Error fetching publications: ' + error.message);
    }
}

// Get a publication by ID
export async function getPublicationById(id) {
    try {
        return await Publication.findById(id).lean();
    } catch (error) {
        throw new Error('Error fetching publication: ' + error.message);
    }
}

// Recommend a publication
export async function recommendPublication(publicationId, userId) {
    try {
        const publication = await Publication.findById(publicationId);
        if (publication.owner.equals(userId)) {
            throw new Error('Error recommending own publication!');
        }
        if (publication.recommendList.includes(userId)) {
            throw new Error('Error recommending publication: User has already recommended this publication.');
        }
        publication.recommendList.push(userId);
        await publication.save();
    } catch (error) {
        throw new Error('Error recommending publication: ' + error.message);
    }
}

// Search publication by title
export async function searchPublications(searchQuery) {
    try {
        const query = searchQuery ? { title: { $regex: searchQuery, $options: 'i' } } : {};
        return await Publication.find(query).lean();
    } catch (error) {
        throw new Error('Error searching publications: ' + error.message);
    }
}

