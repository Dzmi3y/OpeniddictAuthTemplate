import React, { ReactNode } from 'react'
import { Container } from './styles'

type Props = {
    children: ReactNode
    hidden?: boolean
}

export const ErrorMessage: React.FC<Props> = ({ children, hidden = true }) => {
    return (
        <Container className={hidden ? 'hidden' : 'shown'}>
            {children}
        </Container>
    )
}
