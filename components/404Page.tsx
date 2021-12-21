import Image from 'next/image';
import gitImage from '../public/image/Loading.gif';
import { PageMaxNoCSSLayout } from '../styles/design-system';

const ErrorPage = () => {
    return (
        <PageMaxNoCSSLayout style={{ textAlign: 'center' }}>
            <p>접속중...</p>
        </PageMaxNoCSSLayout>
    )
}

export default ErrorPage;