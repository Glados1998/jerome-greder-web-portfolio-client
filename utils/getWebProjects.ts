
export default async function getWebProjects() {
    const res = await fetch(`https://strapi-production-739f.up.railway.app/api/projects?populate=*`, {
        next : {
            revalidate: 0
        }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch projects')
    }

    const data = await res.json();

    return {
        projects: data
    }
}