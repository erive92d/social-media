import { NextRequest, NextResponse } from 'next/server'
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
    const { id } = params

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
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