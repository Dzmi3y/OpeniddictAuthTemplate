import React, { ReactNode, useEffect } from 'react'
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
import { useLocation } from 'react-router-dom'
import { RouteNames } from '../../router'

export const BackgroundCard: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const location = useLocation()

    return (
        <Container>
            <Card>
                <ControlsContainer>{children}</ControlsContainer>
                <DecorColumn />
            </Card>
            <CactusImg
                className={
                    RouteNames.REGISTER == location.pathname
                        ? 'registerPage registerPageAnimation'
                        : 'loginPage loginPageAnimation'
                }
                src={Cactus}
                alt="Cactus"
            />
            <GirlImg
                className={
                    RouteNames.REGISTER == location.pathname
                        ? 'registerPage registerPageAnimation'
                        : 'loginPage loginPageAnimation'
                }
                src={Girl}
                alt="Girl"
            />
        </Container>
    )
}
