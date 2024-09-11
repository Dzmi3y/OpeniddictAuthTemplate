import styled from 'styled-components'
import { media, ScreenSizeEnum } from '../../media'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    align-items: center;
`

export const Button = styled.button`
    border-radius: 23px;
    cursor: pointer;
    background: #d885a3;
    font-size: 16px;
    font-weight: 600;
    width: 150px;
    height: 46px;
    color: #ffffff;
    border: none;
    text-transform: uppercase;
    &:active {
        background: #11141d;
    }

    ${media.greaterThan(ScreenSizeEnum.SM)`
        &:hover{
            background: #d57999;
        }
        &:active{
            background: #a4335a;
        }
    `}

    &:disabled {
        background: #626d8e99;
        cursor: default;
    }
`

export const StyledImg = styled.img`
    width: 17.25px;
    height: 6.38px;
    margin-bottom: 4px;
`
