import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { PageMaxNoCSSLayout } from "../../styles/design-system";
import S from "../../styles/AdminPage.style";
import {useAuth} from '../../modules/AuthProvider';

const AdminLoginPage = () => {
    const { user, SignInWithEmailAndPassword, LoginOut } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        await SignInWithEmailAndPassword(data.email, data.password).then(
            (res: any) => {
                router.push("/");
            }
        );
    };

    return (
        <>
            <CusTomPageMaxNoCSSLayout>
                {user ? (
                    <S.Button onClick={LoginOut}>로그아웃</S.Button>
                ) : (
                    <S.Form onSubmit={handleSubmit(onSubmit)}>
                        <S.InputWrap>
                            <S.Label>이메일</S.Label>
                            <S.Input
                                {...register("email", { required: true, maxLength: 20 })}
                                placeholder="이메일을 입력해주세요"
                            />
                        </S.InputWrap>
                        <S.InputWrap>
                            <S.Label>비밀번호</S.Label>
                            <S.Input
                                type="password"
                                {...register("password", { required: true, maxLength: 20 })}
                                placeholder="비밀번호를 입력해주세요"
                            />
                        </S.InputWrap>
                        <S.Button>로그인</S.Button>
                    </S.Form>
                )}
            </CusTomPageMaxNoCSSLayout>
        </>
    );
};

const CusTomPageMaxNoCSSLayout = styled(PageMaxNoCSSLayout)`
    width: 30%;
    text-align: center;
    margin: 150px auto;
`;

export default AdminLoginPage;
