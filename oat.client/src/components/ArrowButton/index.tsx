import React, { ReactNode } from 'react'
import { Button, Container, StyledImg } from './styles'
import ArrowImage from '../../assets/Arrow.png'

type Props = {
    children: ReactNode
    onClick?: () => void
    disabled?: boolean
}

export const ArrowButton: React.FC<Props> = ({
    children,
    onClick,
    disabled = false,
}) => {
    return (
        <Button disabled={disabled} onClick={onClick}>
            <Container>
                {children}
                <StyledImg src={ArrowImage} />
            </Container>
        </Button>
    )
}
