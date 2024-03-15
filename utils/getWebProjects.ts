import axios from 'axios';

export default async function getWebProjects() {
    const res = await axios.get('https://strapi-production-739f.up.railway.app/api/projects?populate=*', {
        headers: {
            'Cache-Control': 'no-cache'
        }
    })

    if (res.status !== 200) {
        throw new Error('Failed to fetch projects')
    }

    console.log("data", res.data); // Log the data to the console

    return {
        projects: res.data
    }
}