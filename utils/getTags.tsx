export default async function getTags() {
    const res = await fetch('https://strapi-production-739f.up.railway.app/api/programming-tags')

    if (!res.ok) {
        throw new Error('Failed to fetch tags')
    }

    return {
        tags: await res.json()
    }
}