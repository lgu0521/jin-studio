import useSWR from 'swr'
import fetcher from './fetcher'
const getUseCallProject = (documentId: string, cellectionName: string) => {
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API_URL+ '/api/' + cellectionName + '/' + documentId, fetcher);
    console.log(data);
    return {
        project: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default getUseCallProject;