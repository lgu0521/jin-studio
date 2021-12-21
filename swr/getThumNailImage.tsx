import useSWR from 'swr'
import fetcher from './fetcher'

const getThumNailImage = () => {
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API_URL+ '/api/project/thumnail', fetcher);
    return {
        thumNailImages: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default getThumNailImage;