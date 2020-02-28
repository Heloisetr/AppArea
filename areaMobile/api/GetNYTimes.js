import axios from 'axios';
import {NYT, NYT_KEY } from './Config.js';


//date = 1, 7 ou 30 jours
async function getMostPopularNYTEmailed(date) {
    try {
        const result = await axios({
            method: 'get',
            url: `${NYT}/mostpopular/v2/emailed/${date}.json?api-key=${NYT_KEY}`,
        });
        
        if (result.status === 200) {
            return result
        }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

//date = 1, 7, 30 jours
async function getMostPopularNYTViewed(date) {
    try {
        const result =  await axios({
            method: 'get',
            url: `${NYT}/mostpopular/v2/viewed/${date}.json?api-key=${NYT_KEY}`,
        });
        if (result.status === 200) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

async function getTopStoriesNYT(article) {
    try {
        const result = await axios({
            method: 'get',
            url: `${NYT}/topstories/v2/${article}.json?api-key=${NYT_KEY}`,
        });
        if (result.status === 200) {
            return result
        }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

async function getSearchNYT(article) {
    try {
        const result = await axios({
            method: 'get',
            url: `${NYT}/search/v2/articlesearch.json?q=${article}&api-key=${NYT_KEY}`,
        });
        if (result.status === 200) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

async function getBookNYT(author) {
    try {
        const result = await axios({
            method: 'get',
            url: `${NYT}/books/v3/reviews.json?author=${author}&api-key=${NYT_KEY}`,
        });
        if (result.status === 200) {
            return result
        }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export {getMostPopularNYTEmailed, getMostPopularNYTViewed, getTopStoriesNYT, getBookNYT, getSearchNYT}