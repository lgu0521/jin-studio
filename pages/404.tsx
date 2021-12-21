import Image from 'next/image';
import styled from 'styled-components';
import gitImage from '../public/image/Loading.gif';
import { PageMarginTopAndBottomLayout, PageMaxNoCSSLayout, Title1, Title3 } from '../styles/design-system';

const Custom404 = () => {
    return (
        <PageMaxNoCSSLayout style={{textAlign:'center'}}>
            <PageMarginTopAndBottomLayout>
                <Title1>404</Title1>
                <Title3>찾을 수 없는 페이지 입니다.</Title3>
                <ImageWrap style={{margin:'0 auto'}}>
                    <Image src={gitImage} height={50} width={50} layout='responsive' />
                </ImageWrap>
            </PageMarginTopAndBottomLayout>
        </PageMaxNoCSSLayout>
    )

}

const ImageWrap = styled.div`
    width: 200px;
`
export default Custom404;