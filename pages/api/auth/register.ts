import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import clientPromise from '../../../lib/mongodb'
import { User } from '@/models/user'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { username, password } = req.body
            const client = await clientPromise
            const db = client.db('chatbot')

            const existingUser = await db.collection('users').findOne({ username })
            if (existingUser) {
                return res.status(400).json({ success: false, error: 'Username already exists' })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser: User = {
                username,
                password: hashedPassword,
            }

            await db.collection('users').insertOne(newUser)

            res.status(201).json({ success: true, message: 'User registered successfully' })
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, error: 'Failed to register user' })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}