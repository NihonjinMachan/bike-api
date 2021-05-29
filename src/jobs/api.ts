//module that handles external API calls
import axios from 'axios';
import logger from 'lib-logger';

/**
 * function that makes a GET request to a specified URL and returns the response object
 * @param {string} url 
 * @returns {object} raw api data
*/
const fetch: (url: string) => {[key: string]: any} = (url) => {
    return axios.get(url)
    .then(response => {
        return response.data;
    })
    .catch(err => {
        if(err.response){
            logger.error('API call failed', { status: err.response.status, data: err.response.data });
        }
        throw err;
    });
}

export {fetch}