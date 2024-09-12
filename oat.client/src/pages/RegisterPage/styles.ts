import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { media, ScreenSizeEnum } from '../../media'

export const Container = styled.div`
    text-align: left;
    display: flex;
    flex-direction: column;
    margin-top: 106px;
    margin-left: 88px;
    ${media.lessThan(ScreenSizeEnum.XL)`
        margin-left: 0px;
    `}
    ${media.lessThan(ScreenSizeEnum.SM)`
        margin-top: 20px;
        margin-bottom: 20px;
    `}
`

export const Logo = styled.label`
    color: #d885a3;
    font-size: 36px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 16px;
    ${media.lessThan(ScreenSizeEnum.SM)`
        font-size: 26px;
        text-align: center;
    `}
    ${media.lessThan(ScreenSizeEnum.XS)`
        font-size: 16px;
    `}
`
export const StyledLabel = styled.label`
    color: #000000;
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 7px;
    margin-top: 20px;
`
export const Title = styled.label`
    color: #000000;
    font-size: 56px;
    font-weight: 800;
    text-transform: capitalize;
    margin-top: 10px;
    ${media.lessThan(ScreenSizeEnum.SM)`
        text-align: center;
        font-size: 36px;
    `}
    ${media.lessThan(ScreenSizeEnum.XS)`
        font-size: 20px;
    `}
`
export const ButtonContainer = styled.div`
    text-align: center;
    margin-top: 40px;
`

export const SignUpContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 40px;
    font-size: 14px;
    font-weight: 200;

    ${media.lessThan(ScreenSizeEnum.SM)`
        flex-direction: column;
        text-align: center;

    `}
`
export const SignUpLabel = styled.label`
    color: #000000;
`
export const SignUpLink = styled(Link)`
    color: #d885a3;
    z-index: 1;
`
