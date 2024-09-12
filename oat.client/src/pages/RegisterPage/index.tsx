import React, { useState } from 'react'
import { ArrowButton } from '../../components/ArrowButton'
import { BackgroundCard } from '../../components/BackgroundCard'
import { Field } from '../../components/Field'
import { PasswordField } from '../../components/PasswordField'
import {
    Container,
    ButtonContainer,
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
    confirmPassword: string
}

export default function Index() {
    const [formData, setFormData] = useState<Data>({
        name: '',
        password: '',
        confirmPassword: '',
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

    const validatePassword = (password: string): boolean => {
        const minLength = 8
        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)
        const hasNumber = /\d/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar
        )
    }

    const dataValidation = (data: Data) => {
        let message: string = ''
        let areFieldsEmpty: boolean =
            isNullOrEmpty(data.name) || isNullOrEmpty(data.password)
        let arePasswordsMatching = data.password === data.confirmPassword
        let passwordIsValid = validatePassword(data.password)

        if (areFieldsEmpty) {
            message = 'There are empty fields'
        } else if (!passwordIsValid) {
            message =
                'Password must be at least 8 characters, with uppercase, lowercase, number, and special character.'
        } else if (!arePasswordsMatching) {
            message = "Passwords don't match"
        }

        setErrorMessage(message)
    }

    return (
        <>
            <BackgroundCard>
                <form onSubmit={handleSubmit}>
                    <Container>
                        <Logo>Green Cactus Shop</Logo>
                        <Title>Registration</Title>
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
                        <StyledLabel>Confirm Password</StyledLabel>
                        <PasswordField
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <ErrorMessage hidden={isNullOrEmpty(errorMessage)}>
                            {errorMessage}
                        </ErrorMessage>
                        <ButtonContainer>
                            <ArrowButton>REGISTER</ArrowButton>
                        </ButtonContainer>
                        <SignUpContainer>
                            <SignUpLabel>
                                Do you already have an account?
                            </SignUpLabel>
                            <SignUpLink to={RouteNames.LOGIN}>
                                Log In
                            </SignUpLink>
                        </SignUpContainer>
                    </Container>
                </form>
            </BackgroundCard>
        </>
    )
}
