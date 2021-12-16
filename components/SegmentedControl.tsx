import { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { Title2 } from "../styles/design-system";
import { ProjectCatagoryDTO } from "../interfaces/project-catagory.dto";

type Props = {
  options: ProjectCatagoryDTO[];
  setValue: (catagoryId: string) => void;
};

const SegmentedControl = ({ options, setValue }: Props) => {
  const [isOutSideClick, setIsOutSideClick] = useState(false);
  const [stateValue, setSateValue] = useState<number>(-1);
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
    console.log(stateValue);
  }
  const getUserClickCatagory = (catagoryIndex: number, catagoryId: string) =>{
    if(stateValue== catagoryIndex){
      setSateValue(-1);
      setValue('all');
    }else{
      setSateValue(catagoryIndex);
      setValue(catagoryId);
    }
  }

  return (
    <>
      <SegmentedMainUl>
        <SegmentedMainLi>
          <MainButton isClick={stateValue > -1 ? true : false} ref={outSideClickRef} onClick={() => setIsOutSideClick(!isOutSideClick)} />
          <SegmentedUl>
            {options.map((option, i) => (
              <SegmentedLi key={i} isClickNum={stateValue} >
                <label htmlFor={option.id} onClick={() => getUserClickCatagory(i, option.id)} >
                  <Title2>{option.name}</Title2>
                </label>
                <input type="radio" id={option.id} name="segments"/>
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
    width: 20px;
  }
  50%{
    width: 200px;
  }
  100%{
    width: 400px;
  }
`

const SegmentedMainUl = styled.ul`
  width: 100%;
`;

const SegmentedUl = styled.ul`
  display: none;
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
  font-weight: 600;
  transition: .25s;
  width: 50px;
  height: 36px;
  :before{
    content: '';
    position: absolute;
    top: 50%;
    transform: rotate(-0.13turn) translate(55%, -20%);
    @media only screen and (max-width: 600px) {
      width: 8px;
      height: 8px;
      left: 25%;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
    }
    @media only screen and (min-width: 600px) {
      left: 25%;
      width: 10px;
      height: 10px;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
    }
    @media only screen and (min-width: 768px) {
      left: 15%;
      width: 12px;
      height: 12px;
      border-bottom: 3px solid black;
      border-right: 3px solid black;
    }
  }
  :after{
    content: '';
    position: ${(props) => props.isClick ? 'absolute' : 'relative'};
    border-radius: 100%;
    background-color: black;
    @media only screen and (max-width: 600px) {
      top: -5px;
      left: -5px;
      width: 10px;
      height: 10px;
    }
    @media only screen and (min-width: 600px) {
      top: -8px;
      left: -8px;
      width: 13px;
      height: 13px;
    }
    @media only screen and (min-width: 768px) {
      top: -10px;
      left: -10px;
      width: 18px;
      height: 18px;
    }
  }
  @media only screen and (max-width: 600px) {
    width: 40px;
    height: 26px;
    border: 2px solid #000000;
  }
  @media only screen and (min-width: 600px) {
    width: 45px;
    height: 30px;
    border: 2px solid #000000;
  }
  @media only screen and (min-width: 768px) {
    width: 50px;
    height: 36px;
    border: 3px solid #000000;
  }
`
const SegmentedMainLi = styled.li`
    position: relative;
    display: inline-flex;
    :hover{
    ${SegmentedUl}{
      display:flex !important;
      animation: linear ${slideDown} 0.1s forwards;
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
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    position: relative;
    border-left: 0px !important;
    padding: 0px 15px;
    background: white;
    font-weight: 600;
    transition: .3s;
    :hover{
      background: black;
      color: white;
    }
    @media only screen and (max-width: 600px) {
      height: 26px;
      border: 2px solid #000000;
    }
    @media only screen and (min-width: 600px) {
      height: 30px;
      border: 2px solid #000000;
    }
    @media only screen and (min-width: 768px) {
      height: 36px;
      border: 3px solid #000000;
    }
  }
`;



export default SegmentedControl;
