import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../modules/AuthProvider";
import { Title5 } from "../styles/design-system";

const AdminHeader = () => {
  const { LoginOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState<string>("");
  const router = useRouter();

  return (
    <>
      <LineWrap width="100%" height="50px">
        <Ul>
          <Li>
            <Title5>
              <Span onClick={() => router.push("/admin/create/project")}>
                프로젝트 만들기
              </Span>
            </Title5>
          </Li>
          <Li>
            <Title5>
            <Span onClick={() => router.push("/admin/create/about")}>
                About 수정
              </Span>
            </Title5>
          </Li>
        </Ul>
        <Button onClick={LoginOut}>
          <Title5>로그아웃</Title5>
        </Button>
      </LineWrap>
    </>
  );
};

const Ul = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
`;
const Li = styled.li`
  font-weight: 500;
  color: #ffffffcc;
  text-decoration: none;
  @media only screen and (max-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.xl};
    padding: 0 10px 0 10px;
  }
  @media only screen and (min-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.xl};
    padding: 0 15px 0 15px;
  }
  @media only screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.xl};
    padding: 0 30px 0 30px;
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => props.theme.fontSizes.xl};
    padding: 0 30px 0 30px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => props.theme.fontSizes.xl};
    padding: 0 30px 0 30px;
  }
`;

type WrapProps = {
  width: string;
  height: string;
};

type NavProps = {
  height: string;
};

const Span = styled.span`
  cursor: pointer;
`;

const LineWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: ${(props: NavProps) => (props.height ? props.height : "")};
  width: ${(props: WrapProps) => (props.width ? props.width : "")};
  box-shadow: 4px 4px 4px rgb(0 0 0 / 5%);
  box-sizing: border-box;
  background: #2c2c2c;
`;


const Button = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  padding: 8px 15px;
  border-radius: 10px;
  border: 0px;
  color: rgb(12, 36, 59);
  font-size: 14px;
  font-weight: bold;
  background-color: white;
  &:hover {
    background-color: rgb(12, 50, 59);
    transition: background-color 0.3s;
    -webkit-transition: background-color 0.3s;
  }
  cursor: pointer;
`;

export default AdminHeader;
