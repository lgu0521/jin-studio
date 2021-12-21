import useSWR from 'swr'
import fetcher from './fetcher'

const getProjectCatagory = () => {
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API_URL+ '/api/catagory', fetcher);

    return {
        catagoryList: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default getProjectCatagory;