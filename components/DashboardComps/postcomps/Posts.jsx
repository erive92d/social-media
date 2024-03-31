import getPosts from '@/actions/getPosts'
import { formatDate } from '@/utils/formatData'
import Link from 'next/link'

export default async function Posts() {

    const posts = await getPosts()
    if (!posts) {
        return <span>Loading..</span>
    }

    return (
        <div>
            {posts?.map((post, index) => (
                <Link href={`/posts/${post.id}`} className='border-b px-2 py-4' key={index}>
                    <span className='font-bold'>{post.user.username}</span>
                    <div className='mx-2 font-thin'>
                        <p>{post.content}</p>
                        <p className='text-sm font-thin text-right'>{formatDate(post.createdAt)}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
