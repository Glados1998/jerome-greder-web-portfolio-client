export default async function getTags() {

    const res = await fetch(`https://strapi-production-739f.up.railway.app/api/programming-tags`, {
            next: {
                revalidate: 0
            }
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch tags')
    }

    return {
        tags: await res.json()
    }
}