import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const client = await clientPromise
            const db = client.db('chatbot')
            const { userId, message } = req.body

            const result = await db.collection('responses').insertOne({
                userId,
                message,
                timestamp: new Date()
            })

            res.status(200).json({ success: true, id: result.insertedId })
        } catch (e) {
            console.error(e)
            res.status(500).json({ success: false, error: 'Failed to save response' })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}