import { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { Title2 } from "../styles/design-system";

type Props = {
  options: {
    id: string;
    name: string;
    default?: boolean;
  }[];
  setValue: (id: string) => void;
};
const SegmentedControl = ({ options, setValue }: Props) => {
  const [stateValue, setSateValue] = useState<number>(0);
  return (
    <>
      <div style={{ float: "right" }}>
        <SegmentedMainUl>
          <SegmentedMainLi >
            <MainLabel htmlFor="0" isClick={stateValue != 0 ? true : false} />
            <SegmentedUl>
              {options.map((option, i) => (
                <SegmentedLi key={i} isClickNum={stateValue} >
                  <label htmlFor={option.id} onClick={() => { setSateValue(i) }} >
                    <Title2>{option.name}</Title2>
                  </label>
                  <input type="radio" id={option.id} name="segments" onChange={() => setValue(option.default ? '0' : option.id)} />
                </SegmentedLi>
              ))}
            </SegmentedUl>
          </SegmentedMainLi>
        </SegmentedMainUl>
      </div>
    </>
  );
};

const slideDown = keyframes`
  0% {

    height: 0px;
  }
  50%{
    height: 45px;
  }
  100%{
    height: 500px;
  }
`

const SegmentedMainUl = styled.ul`
  width: 100%;
  clear: both;
`;

const SegmentedUl = styled.ul`
  display: none;
  position: absolute;
  z-index: 9999;
  text-align: center;
  overflow: hidden;
  //inline-block 여백없애기
  margin-top: -1px;
`;

const MainLabel = styled.label<{ isClick: boolean }>`
  display: inline-block;
  position: relative;
  z-index: 9999;
  border: 3px solid #000000;
  font-weight: 600;
  transition: .25s;
  width: 50px;
  height: 36px;
  :before{
    content: '';
    position: absolute;
    background: url('/svg/sildeDown-black.svg') no-repeat;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    transform: translate(-50%, -20%);
  }
  :after{
    content: '';
    position: ${(props) => props.isClick ? 'absolute' : 'relative'};
    background: url('/svg/ellipse.svg') no-repeat;
    top: -10px;
    right: -10px;
    width: 18px;
    height: 18px;
  }

`
const SegmentedMainLi = styled.li`
    position: relative;
    :hover{
    ${SegmentedUl}{
      display:block !important;
      animation: linear ${slideDown} 0.45s forwards;
    };
    ${MainLabel}{
      width: 150px;
    }
  }
`;

const SegmentedLi = styled.li<{ isClickNum: number }>`
  display:flex;
  :nth-child(${(props) => props.isClickNum + 1}){
    label{
      background: black;
    color:white;
    }
  }

  label{
   display: block;
    position: relative;
    z-index: 9999;
    border-top: none !important;
    border: 3px solid #000000;
    width: 150px;
    height:36px;
    background: white;
    font-weight: 600;
    transition: .3s;
    :hover{
      background: black;
      color: white;
    }
  }
`;



export default SegmentedControl;
