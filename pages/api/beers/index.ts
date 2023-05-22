import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"
import { getPlaiceholder } from "plaiceholder";
import { BeerItem } from "../../beers";
const PUNK_BEER_API = 'https://api.punkapi.com/v2/beers'
const ITEM_PER_PAGE = 24

interface GetBeersRequest extends NextApiRequest {
    query: {
        page: string;
    }
}

export default async function beerHandler(req: GetBeersRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            await getBeers(req, res)
            break;
        default:
            res.status(405).end(); //Method Not Allowed
            break;
    }
}

const getBeers = async (req: GetBeersRequest, res: NextApiResponse) => {
    try {
        const { page } = req.query
        const URL = `${PUNK_BEER_API}?page=${page ?? 1}&per_page=${ITEM_PER_PAGE}`
        const result = await axios.get(URL)
        if (result.status === 200) {
            const data = result?.data ?? []
            const newData = await Promise.all(data.map(async (item: BeerItem) => {
                const { base64 } = await getPlaiceholder(item?.image_url);
                return {
                    ...item,
                    blurDataUrl: base64
                }
            }))
            res.status(200).json(newData)
        }
    } catch (error: any) {
        const errorMessage = error?.detail || error?.message || 'Failed to fetch data'
        res.status(500).json({ error: errorMessage })
    }
}