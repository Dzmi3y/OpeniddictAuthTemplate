import React from 'react'
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

export default function Index() {
    return (
        <>
            <BackgroundCard>
                <Container>
                    <Logo>Green Cactus Shop</Logo>
                    <Title>Registration</Title>
                    <StyledLabel>Username</StyledLabel>
                    <Field />
                    <StyledLabel>Password</StyledLabel>
                    <PasswordField />
                    <StyledLabel>Confirm Password</StyledLabel>
                    <PasswordField />
                    <ButtonContainer>
                        <ArrowButton>REGISTER</ArrowButton>
                    </ButtonContainer>
                    <SignUpContainer>
                        <SignUpLabel>
                            Do you already have an account?
                        </SignUpLabel>
                        <SignUpLink to={RouteNames.LOGIN}>Log In</SignUpLink>
                    </SignUpContainer>
                </Container>
            </BackgroundCard>
        </>
    )
}
