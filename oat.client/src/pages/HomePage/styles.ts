import styled from 'styled-components'
import { media, ScreenSizeEnum } from '../../media'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    gap: 20px;
`
export const Label = styled.div`
    text-align: center;
    font-size: 40px;
    justify-content: center;
`
export const Button = styled.div`
    border-radius: 23px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
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
`
