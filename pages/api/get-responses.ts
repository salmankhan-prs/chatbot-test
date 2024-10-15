import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                return res.status(401).json({ success: false, error: 'No token provided' })
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
            const userId = decoded.id
            console.log(userId)
            console.log(token)

            const client = await clientPromise
            const db = client.db('chatbot')

            const responses = await db.collection('responses')
                .find({ userId })
                .sort({ timestamp: -1 })
                .toArray()


            console.log(responses)

            res.status(200).json({ success: true, responses })
        } catch (e) {
            console.error(e)
            res.status(500).json({ success: false, error: 'Failed to fetch responses' })
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}