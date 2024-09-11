import React, { ReactNode } from 'react'
import {
    CactusImg,
    Card,
    Container,
    ControlsContainer,
    DecorColumn,
    GirlImg,
} from './styles'
import Girl from '../../assets/girl.png'
import Cactus from '../../assets/cactus.png'

export const BackgroundCard: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    return (
        <Container>
            <Card>
                <ControlsContainer>{children}</ControlsContainer>
                <DecorColumn />
            </Card>
            <CactusImg src={Cactus} alt="Cactus" />
            <GirlImg src={Girl} alt="Girl" />
        </Container>
    )
}
