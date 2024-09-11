import React from 'react'
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

export default function Index() {
    return (
        <>
            <BackgroundCard>
                <Container>
                    <Logo>Green Cactus Shop</Logo>
                    <Description>Welcome back!!!</Description>
                    <Title>Log In</Title>
                    <StyledLabel>Username</StyledLabel>
                    <Field />
                    <StyledLabel>Password</StyledLabel>
                    <PasswordField />
                    <LoginButtonContainer>
                        <ArrowButton>Login</ArrowButton>
                    </LoginButtonContainer>
                    <SignUpContainer>
                        <SignUpLabel>Don’t have an account yet?</SignUpLabel>
                        <SignUpLink to={RouteNames.REGISTER}>
                            Sign up for free
                        </SignUpLink>
                    </SignUpContainer>
                </Container>
            </BackgroundCard>
        </>
    )
}
