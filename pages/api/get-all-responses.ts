import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const client = await clientPromise
            const db = client.db('chatbot')

            const responses = await db.collection('responses').find({}).toArray()

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