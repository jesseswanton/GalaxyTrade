'use server';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'
import { User } from './definitions';

  
export async function addUser(name:string, email: string, password: string) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    try {
        await sql<User>`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`
    } catch (error) {
        console.error(error)
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`
        return user
    } catch (error) {
        console.error(error)
    }
}