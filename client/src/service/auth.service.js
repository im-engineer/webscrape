import axios from 'axios'
const API_URL ="http://localhost:5001/";
let axiosConfig = {
    headers:{
        'Content-Type' : 'application/json',
    }
}
console.log("axiosConfig",axiosConfig)


export const save = async(url) => {
    return axios.post(
        API_URL + "scrape",
        {
            url
        },
        axiosConfig
    )
};

export const getAllScapeDetails = async () => {
    try{
        const response = await axios.get(API_URL + `api/getScrapeDetails`, axiosConfig)
        return response
    }
    catch(error){
        console.log(`error: ${error}`)
    }
}

export const getScrapeDetailsById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/companies/${id}`, axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error fetching scrape details by ID:', error);
        throw error;
    }
};

export const deleteScrapeDetailsById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/api/companies/${id}`, axiosConfig);
        return response.data;
    } catch (error) {
        console.error(`Error deleting scrape details by ID ${id}:`, error);
        throw error;
    }
};

export const allDeleteScrapeDetails = async () => {
    try {
        const response = await axios.delete(`${API_URL}/api/companies/all`, axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error performing all delete operation:', error);
        throw error;
    }
};
