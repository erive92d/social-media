import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcrypt"
import prisma from '@/lib/prisma'

export async function GET(request) {
    try {
        const users = await prisma.user.findMany()
        if (!users) {
            return NextResponse.json({ message: "No users found" }, { status: 403, statusText: "No users found" })

        }
        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Server", { status: 500 })
    }
}

export async function POST(request) {
    const { email, password } = await request.json()

    try {
        // 1. Validate request body (email and password presence)
        if (!email || !password) {
            return NextResponse.json({ message: "Invalid inputs" }, { status: 403, statusText: "Invalid inputs" })
        }
        // 2. Find user by email using Prisma
        const user = await prisma.user.findUnique({
            where: { email },
        });
        // 3. Check if user exists
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 403, statusText: "User not found" })
        }
        // 4. Compare password hash with provided password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // 5. Check password validity
        if (!passwordMatch) {
            return NextResponse.json({ message: "Invalid Password" }, { status: 403, statusText: "Password Invalid" })
        }
        console.log("Success")
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Server", { status: 500 })
    }
}