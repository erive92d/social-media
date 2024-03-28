import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request) {
    //grab the data received from the client
    const req = await request.json()
    try {
        //validate if any necessary data is empty   
        if (!req.email || !req.username || !req.password) {
            return NextResponse.json({ message: "Invalid Input Fields" }, { status: 404 })
        }

        // Hash password using bcrypt with appropriate salt rounds
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.password, saltRounds);

        //check if email already exists in db
        const checkEmail = await prisma.user.findUnique({ where: { email: req.email } });

        if (checkEmail) {
            return NextResponse.json({ message: "Email is already taken" }, { status: 404 })
        }

        //creating a user with given data
        const createUser = await prisma.user.create({
            data: {
                email: req.email,
                username: req.username,
                password: hashedPassword
            }
        })

        console.log("Successfully added a user", createUser)

        return NextResponse.json({ message: "Successfully added a user" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

