import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import clientPromise from '../../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { username, password } = req.body
            const client = await clientPromise
            const db = client.db('chatbot')

            const user = await db.collection('users').findOne({ username })
            if (!user) {
                return res.status(400).json({ success: false, error: 'Invalid credentials' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ success: false, error: 'Invalid credentials' })
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' })

            res.status(200).json({ success: true, token, user })
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, error: 'Failed to login' })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}