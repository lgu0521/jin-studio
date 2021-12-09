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
  const [isSegementWrapClick, setIsSegementWrapClick] = useState(false);
  const SegementRef = useRef<any>();

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    console.log(isSegementWrapClick);
    if (!SegementRef.current?.contains(e.target)) {
      setIsSegementWrapClick(false);
    }
  }

  return (
    <>
      <div style={{ float: "right" }}>
        <SegmentedMainUl clickState={isSegementWrapClick} ref={SegementRef}>
          <SegmentedMainLi >
            <MainLabel htmlFor="0" onClick={() => setIsSegementWrapClick(!isSegementWrapClick)} />
            <input type="radio" id="0" name="segments" onChange={() => setValue("0")} />
            <SegmentedUl clickState={isSegementWrapClick}>
              {options.map((option, i) => (
                <SegmentedLi key={i}>
                  <label htmlFor={option.id}>
                    <Title2>{option.name}</Title2>
                  </label>
                  <input type="radio" id={option.id} name="segments" onChange={() => setValue(option.id)} />
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
  0%{
    height: 0px;
  }
  50%{
    height: 45px;
  }
  100%{
    height: 100px;
  }
`
const complexMixin = css`
  animation: linear ${slideDown} 0.1s forwards;
`

const SegmentedMainUl = styled.ul<{ clickState: boolean }>`
  width: 100%;
  clear: both;
`;

const SegmentedMainLi = styled.li`
    position: relative;
`;

const MainLabel = styled.label`
  display: inline-block;
  position: relative;
  z-index: 5000;
  border: 3px solid #000000;
  width: 150px;
  height: 36px;
  font-weight: 600;
  :before{
    content: '';
    position: absolute;
    background: url('/svg/sildeDown.svg') no-repeat;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    transform: translate(-50%, -30%);
  }
`

const SegmentedUl = styled.ul<{ clickState: boolean }>`
  display: ${(props) => props.clickState ? 'block' : 'none'};
  position: absolute;
  padding: 0;
  margin: 0;
  left: 0;
  z-index: 9999;
  overflow: hidden;
  text-align: right;
  ${(props) => props.clickState ? complexMixin : null};
`;

const SegmentedLi = styled.li`
  label{
    display: inline-block;
    position: relative;
    z-index: 5000;
    border: 3px solid #000000;
    width: 150px;
    padding: 10px 5px;
    background: white;
    font-weight: 600;
    :hover{
    background: black;
    color: white;
  }
  }
`;



export default SegmentedControl;
