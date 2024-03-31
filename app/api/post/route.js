import { NextRequest, NextResponse } from 'next/server'
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';


export async function GET(req) {

    try {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        username: true // Include the author's name
                    }
                }
            }
        })

        return NextResponse.json(posts, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Server", { status: 500 })
    }
}


export async function POST(req) {

    const token = await getToken({ req })
    const { content } = await req.json()

    if (!token) {
        return new NextResponse("User Not Authorized", { status: 401 })
    }

    try {
        const post = await prisma.post.create({
            data: {
                content,
                authorId: token.id
            }
        });

        if (!post) {
            return new NextResponse("Could not make the post", { status: 401 })
        }

        return NextResponse.json(post, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Server", { status: 500 })
    }
}

export async function DELETE() {
    try {

    } catch (error) {
        return new NextResponse("Internal Server", { status: 500 })
    }
}