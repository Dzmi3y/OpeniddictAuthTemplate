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
import { IAuthStore } from '../../store/AuthStore'
import { inject, observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'

const RegisterPage: React.FC<{ authStore: IAuthStore }> = inject('authStore')(
    observer(({ authStore }) => {
        const [formData, setFormData] = useState<RegisterData>({
            username: '',
            password: '',
            confirmPassword: '',
        })

        const navigate = useNavigate()
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
                let requestInfo = await authStore.register(
                    formData.username,
                    formData.password
                )
                if (requestInfo.isSuccessful) {
                    navigate(RouteNames.LOGIN)
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

        const dataValidation = (data: RegisterData): boolean => {
            let message: string = ''
            let areFieldsEmpty: boolean =
                isNullOrEmpty(data.username) || isNullOrEmpty(data.password)
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
            return isNullOrEmpty(message)
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
    })
)

export default RegisterPage
