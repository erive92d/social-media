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
                <div className='px-2 py-4 border-b' key={index}>
                    <Link href={`/posts/${post.id}`}>{post.user.username}</Link>
                    <div className='font-thin'>
                        <p>{post.content}</p>
                        <p className='text-sm font-thin text-right'>{formatDate(post.createdAt)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
