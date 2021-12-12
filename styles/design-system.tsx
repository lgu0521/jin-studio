import styled from "styled-components";

const Title1 = styled.h1`
  letter-spacing: -1px;
  line-height: 1.3;
  @media only screen and (max-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.title1};
  }
  @media only screen and (min-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.title1};
  }
  @media only screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.title1};
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => props.theme.fontSizes.title1};
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => props.theme.fontSizes.title1};
  }
`;

const Title2 = styled.h2`
  letter-spacing: -1px;
  line-height: 1.36;
  @media only screen and (max-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.title2};
  }
  @media only screen and (min-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.title2};
  }
  @media only screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.title2};
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => props.theme.fontSizes.title2};
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => props.theme.fontSizes.title2};
  }
`;

const Title3 = styled.h3`
  letter-spacing: -1px;
  line-height: 1.36;
  @media only screen and (max-width: 310px) {
    font-size: ${(props) => props.theme.fontSizes.title3};
  }
  @media only screen and (min-width: 310px) {
    font-size: ${(props) => props.theme.fontSizes.title3};
  }
  @media only screen and (min-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.title3};
  }
  @media only screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.title3};
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => props.theme.fontSizes.title3};
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => props.theme.fontSizes.title3};
  }
`;

const Title4 = styled.h4`
  letter-spacing: 0px;
  line-height: 1.4;
  @media only screen and (max-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.title7};
  }
  @media only screen and (min-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.title7};
  }
  @media only screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.title4};
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => props.theme.fontSizes.title4};
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => props.theme.fontSizes.title4};
  }
`;

const Title5 = styled.h5`
  letter-spacing: 0px;
  line-height: 1.3;
  @media only screen and (max-width: 600px) {
    font-size: 0.9rem;
  }
  @media only screen and (min-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.title8};
  }
  @media only screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.title6};
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => props.theme.fontSizes.title6};
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => props.theme.fontSizes.title5};
  }
`;

const Title6 = styled.p`
  letter-spacing: 0px;
  line-height: 1.7;
  @media only screen and (max-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.title8};
  }
  @media only screen and (min-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.title8};
  }
  @media only screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.title5};
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => props.theme.fontSizes.title5};
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => props.theme.fontSizes.title6};
  }
`;

interface PropsType {
  width?: string;
}

const Button = styled.button<PropsType>`
  padding: 15px 10px;
  text-align: center;
  margin-top: 30px;
  border-radius: 30px;
  border: 0px;
  height: 60px;
  ${({ width }) => {
    return width ? `width: ${width};` : "width: 70%;";
  }}
  color: white;
  font-size: 18px;
  font-weight: bold;
  background-color: #175436;
  &:hover {
    background-color: #ffce32;
    transition: background-color 0.3s;
    -webkit-transition: background-color 0.3s;
  }
  cursor: pointer;
`;

const PageMaxNoCSSLayout = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  padding: 0px 20px;
  /* @media only screen and (max-width: 600px) {
    padding: 0 20px;
  }
  @media only screen and (min-width: 600px) {
    padding: 0 20px;
  }
  @media only screen and (min-width: 768px) {
    padding: 0 30px;
  }
  @media only screen and (min-width: 992px) {
    padding: 0 40px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0px;
  } */
`;
const MarginOrPaddingLayout = styled.div`
  margin: 80px 0px;
`;

const PageMarginTopAndBottomLayout = styled.div`
  @media only screen and (max-width: 600px) {
    margin: ${(props) => props.theme.margins.small} 0px;
  }
  @media only screen and (min-width: 600px) {
    margin: ${(props) => props.theme.margins.base} 0px;
  }
  @media only screen and (min-width: 768px) {
    margin: ${(props) => props.theme.margins.xl} 0px;
  }
  @media only screen and (min-width: 992px) {
    margin: ${(props) => props.theme.margins.xxl} 0px;
  }
  @media only screen and (min-width: 1200px) {
    margin: ${(props) => props.theme.margins.xxxl} 0px;
  }
`;
const PageFullWidthLayout = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: visible;
  text-align: center;
  position: relative;
`;

const PageMainContentMargin = styled.div`
  @media only screen and (max-width: 600px) {
    margin-top: ${(props) => props.theme.margins.small};
  }
  @media only screen and (min-width: 600px) {
    margin-top: ${(props) => props.theme.margins.base};
  }
  @media only screen and (min-width: 768px) {
    margin-top: ${(props) => props.theme.margins.xl};
  }
  @media only screen and (min-width: 992px) {
    margin-top: ${(props) => props.theme.margins.xxl};
  }
  @media only screen and (min-width: 1200px) {
    margin-top: ${(props) => props.theme.margins.xxxl};
  }
`;

export {
  Title1,
  Title2,
  Title3,
  Title4,
  Title5,
  Title6,
  Button,
  PageFullWidthLayout,
  PageMaxNoCSSLayout,
  MarginOrPaddingLayout,
  PageMainContentMargin,
  PageMarginTopAndBottomLayout,
};
