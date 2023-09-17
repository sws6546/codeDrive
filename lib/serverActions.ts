"use server"

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function login(formData: FormData){
    const user: string = formData.get("username") as string 
    const password: string = formData.get("password") as string

    const userData = await prisma.user.findMany({
        where: {
            name: {
                equals: user ?? ""
            }
        }
    })

    if(userData.length == 0){
        cookies().set("flash", "Bad username", { expires: Date.now() + (1000) })
        return {err: "Bad username"}
    }

    if(!await bcrypt.compare(password, userData[0].password)){
        cookies().set("flash", "Bad password", { expires: Date.now() + (1000) })
        return {err: "Bad password"}
    }

    cookies().delete("flash")
    cookies().set("jwt", jwt.sign({name: userData[0].name}, process.env.JWT_SECRET as string, { expiresIn: "2h" }))
    cookies().set("user", userData[0].name)
    cookies().set("userId", userData[0].id as string)
    redirect("/menu")
}

export async function logOut(){
    cookies().getAll().map(cookie => {
        cookies().delete(cookie.name)
    })
}

export async function addProject(title: string, codes: string[]){
    const userId: string = cookies().get('userId')?.value as string
    if(userId.length == 0){
        return {err: "Nie ma urzytkownika"}
    }
    if(title.length == 0){
        return {err: "Brak Tytułu"}
    }
    if(codes.length == 0){
        return {err: "Brak Kodów"}
    }

    const project = await prisma.project.create({
        data: {
            name: title,
            userId: userId
        }
    })

    codes.map(async (code) => {
        const addedCode = await prisma.code.create({
            data: {
                code: code,
                projectId: project.id
            }
        })
    })
    
    redirect("/menu")
}