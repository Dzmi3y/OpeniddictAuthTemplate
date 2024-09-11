import styled from 'styled-components'
import { media, ScreenSizeEnum } from '../../media'

export const Container = styled.div`
    display: flex;
`

export const StyledField = styled.input`
    background-color: #c0dbea;
    border-radius: 4px 0px 0px 4px;
    width: 441px;
    height: 46px;
    font-size: 14px;
    border: none;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 1;

    &:focus {
        box-shadow: 1px 1px 2px #85b9d6;
        outline: 0;
        outline-offset: 0;
    }
`

export const StyledImg = styled.img``
export const ImgButton = styled.button`
    background-color: #c0dbea;
    border-radius: 0px 4px 4px 0px;
    z-index: 1;
    border: none;
    width: 37px;
    &:active {
        background-color: #85b9d6;
    }

    ${media.greaterThan(ScreenSizeEnum.SM)`
        &:hover{
            background-color: #a9cee2;
        }
        &:active{
            background-color: #9ec8de;
        }
    `}
`
