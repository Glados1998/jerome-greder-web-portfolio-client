export default async function getTags() {
    const timestamp = Date.now();
    const res = await fetch(`https://strapi-production-739f.up.railway.app/api/programming-tags?timestamp=${timestamp}`)

    if (!res.ok) {
        throw new Error('Failed to fetch tags')
    }

    return {
        tags: await res.json()
    }
}