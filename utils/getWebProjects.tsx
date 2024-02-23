export default async function getWebProjects() {
    const res = await fetch('https://strapi-production-739f.up.railway.app/api/projects')

    if (!res.ok) {
        throw new Error('Failed to fetch projects')
    }

    return {
        projects: await res.json()
    }
}