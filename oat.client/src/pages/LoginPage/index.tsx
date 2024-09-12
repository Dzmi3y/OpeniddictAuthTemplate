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

type Data = {
    name: string
    password: string
}

export default function Index() {
    const [formData, setFormData] = useState<Data>({
        name: '',
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage('')
    }

    const isNullOrEmpty = (text: string): boolean => {
        return (
            text === null ||
            (typeof text === 'string' && text.trim().length === 0)
        )
    }

    const dataValidation = (data: Data) => {
        let message: string = ''
        let areFieldsEmpty: boolean =
            isNullOrEmpty(data.name) || isNullOrEmpty(data.password)
        console.log(data)
        message = areFieldsEmpty ? 'There are empty fields' : ''
        setErrorMessage(message)
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
                            name="name"
                            value={formData.name}
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
}
