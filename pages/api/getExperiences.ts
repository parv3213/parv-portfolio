// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { client as sanityClient } from '../../sanity'
import { Experience } from '../../typings'

const query = groq`
*[_type=="experience"]{
    ...,
    technologies[]->
      
  } 
  | order(dateStarted desc)
  | order(dateEnded desc)
  | order(isCurrentlyWorkingHere desc)
`

type Data = {
  experiences: Experience[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const experiences: Experience[] = await sanityClient.fetch(query)
  res.status(200).json({ experiences })
}
