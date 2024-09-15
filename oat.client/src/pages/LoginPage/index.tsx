import React, { useState } from 'react'
import { ArrowButton } from '../../components/ArrowButton'
import { BackgroundCard } from '../../components/BackgroundCard'
import { Field } from '../../components/Field'
import { PasswordField } from '../../components/PasswordField'
import {
    Container,
    Description,
    LoginButtonContainer,
    Logo,
    SignUpContainer,
    SignUpLabel,
    SignUpLink,
    StyledLabel,
    Title,
} from './styles'
import { RouteNames } from '../../router'
import { ErrorMessage } from '../../components/ErrorMessage'
import { inject, observer } from 'mobx-react'
import { IAuthStore } from '../../store/AuthStore'
import { LoginData } from '../../models/LoginData'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC<{ authStore: IAuthStore }> = inject('authStore')(
    observer(({ authStore }) => {
        const navigate = useNavigate()
        const [formData, setFormData] = useState<LoginData>({
            username: '',
            password: '',
        })
        const [errorMessage, setErrorMessage] = useState<string>('')

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target
            let newData = {
                ...formData,
                [name]: value,
            }

            dataValidation(newData)
            setFormData(newData)
        }

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            if (dataValidation(formData)) {
                let requestInfo = await authStore.login(
                    formData.username,
                    formData.password
                )
                if (requestInfo.isSuccessful) {
                    navigate(RouteNames.HOME)
                } else {
                    setErrorMessage(requestInfo.message)
                }
            }
        }

        const isNullOrEmpty = (text: string): boolean => {
            return (
                text === null ||
                (typeof text === 'string' && text.trim().length === 0)
            )
        }

        const dataValidation = (data: LoginData) => {
            let message: string = ''
            let areFieldsEmpty: boolean =
                isNullOrEmpty(data.username) || isNullOrEmpty(data.password)
            message = areFieldsEmpty ? 'There are empty fields' : ''
            setErrorMessage(message)

            return isNullOrEmpty(message)
        }

        return (
            <>
                <BackgroundCard>
                    <form onSubmit={handleSubmit}>
                        <Container>
                            <Logo>Green Cactus Shop</Logo>
                            <Description>Welcome back!!!</Description>
                            <Title>Log In</Title>
                            <StyledLabel>Username</StyledLabel>
                            <Field
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Name"
                            />
                            <StyledLabel>Password</StyledLabel>
                            <PasswordField
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <ErrorMessage hidden={isNullOrEmpty(errorMessage)}>
                                {errorMessage}
                            </ErrorMessage>
                            <LoginButtonContainer>
                                <ArrowButton>Login</ArrowButton>
                            </LoginButtonContainer>
                            <SignUpContainer>
                                <SignUpLabel>
                                    Don’t have an account yet?
                                </SignUpLabel>
                                <SignUpLink to={RouteNames.REGISTER}>
                                    Sign up for free
                                </SignUpLink>
                            </SignUpContainer>
                        </Container>
                    </form>
                </BackgroundCard>
            </>
        )
    })
)

export default LoginPage
