
export default async function getWebProjects() {
    const res = await fetch(`https://strapi-production-739f.up.railway.app/api/projects?populate=*`, {
        headers: {
           cache: 'no-store',
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch projects')
    }

    const data = await res.json();
    console.log("data", data); // Log the data to the console

    return {
        projects: data
    }
}