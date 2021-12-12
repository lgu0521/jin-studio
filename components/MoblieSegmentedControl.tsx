import { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { Title2 } from "../styles/design-system";
import { ProjectCatagoryDTO } from "../interfaces/project-catagory.dto";

type Props = {
  options: ProjectCatagoryDTO[];
  setValue: (catagoryId: string) => void;
};

const MoblieSegmentedControl = ({ options, setValue }: Props) => {
  const [isOutSideClick, setIsOutSideClick] = useState(false);
  const [stateValue, setSateValue] = useState<number>(0);
  const outSideClickRef = useRef<any>();

  useEffect(() => {
    window.addEventListener('mousedown', handleOurSideClickEvent);
    return () => {
      window.removeEventListener('mousedown', handleOurSideClickEvent);
    }
  }, []);

  const handleOurSideClickEvent = (e: MouseEvent) => {
    if (!outSideClickRef.current.contains(e.target)) {
      setIsOutSideClick(false);
    }
    console.log(isOutSideClick);
  }


  return (
    <>
      <SegmentedMainUl>
        <SegmentedMainLi>
          <MainButton isClick={stateValue > 0 ? true : false} ref={outSideClickRef} onClick={() => setIsOutSideClick(!isOutSideClick)} />
          <SegmentedUl>
            {options.map((option, i) => (
              <SegmentedLi key={i} isClickNum={stateValue} >
                <label htmlFor={option.id} onClick={() => { setSateValue(i) }} >
                  <Title2>{option.name}</Title2>
                </label>
                <input type="radio" id={option.id} name="segments" onChange={() => setValue(option.default ? 'all' : option.id)} />
              </SegmentedLi>
            ))}
          </SegmentedUl>
        </SegmentedMainLi>
      </SegmentedMainUl>
    </>
  );
};

const slideDown = keyframes`
  0% {

    width: 0px;
  }
  50%{
    width: 45px;
  }
  100%{
    width: 500px;
  }
`

const SegmentedMainUl = styled.ul`
  width: 100%;
`;

const SegmentedUl = styled.ul`
  display: none;
  z-index: 5555;
  text-align: center;
  overflow: hidden;
  //inline-block 여백없애기
 // margin-top: -1px;
 input{
   display:none;
 }
`;

const MainButton = styled.div<{ isClick: boolean }>`
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
    transform: rotate(-0.25turn) translate(55%, -20%);
  }
  :after{
    content: '';
    position: ${(props) => props.isClick ? 'absolute' : 'relative'};
    background: url('/svg/ellipse.svg') no-repeat;
    top: -10px;
    left: -10px;
    width: 18px;
    height: 18px;
  }

`
const SegmentedMainLi = styled.li`
    position: relative;
    display: inline-flex;
    :hover{
    ${SegmentedUl}{
      display:flex !important;
      animation: linear ${slideDown} 0.2s forwards;
    };
  }
`;

const SegmentedLi = styled.li<{ isClickNum: number }>`
  :nth-child(${(props) => props.isClickNum + 1}){
    label{
      background: black;
    color:white;
    }
  }
  label{
   display: block;
    position: relative;
    z-index: 5555;
    border-left: 0px !important;
    border: 3px solid #000000;
    height:36px;
    padding: 0px 15px;
    background: white;
    font-weight: 600;
    transition: .3s;
    :hover{
      background: black;
      color: white;
    }
  }
`;



export default MoblieSegmentedControl;
