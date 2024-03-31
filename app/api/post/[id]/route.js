import { NextRequest, NextResponse } from 'next/server'
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request, { params }) {
    const { id } = params

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
            include: {
                user: {
                    select: {
                        username: true // Include the author's name
                    }
                }
            }
        });

        if (!post) {
            return new NextResponse("Post could not be fetched", { status: 401 })
        }
        return NextResponse.json(post, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Server", { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const { id } = params

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
            select: {
                authorId: true
            }
        });

        if (!post || post.authorId !== session.user.id) {
            return new NextResponse("Post not found or Unauthorized", { status: 402 })
        }

        await prisma.post.delete({
            where: {
                id: id
            }
        });

        console.log("Post Deleted Successfully")

        return NextResponse.json("Post Deleted Successfully", { status: 200 })

    } catch (error) {
        return new NextResponse("Internal Server", { status: 500 })

    }
}