import styled from 'styled-components'
import { media, ScreenSizeEnum } from '../../media'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 0;
    ${media.lessThan(ScreenSizeEnum.SM)`
        height: calc(100vh - 4rem);
    `}
`
export const Card = styled.div`
    background-color: #ffffff;
    height: 849px;
    width: 1426px;
    border-radius: 40px;
    display: flex;
    justify-content: space-between;

    ${media.lessThan(ScreenSizeEnum.XL)`
        justify-content: center;
        padding-left: 20px;
        padding-right: 20px; 
    `}
    ${media.lessThan(ScreenSizeEnum.SM)`
        height: auto;
        display: block;
    `}
`

export const ControlsContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const DecorColumn = styled.div`
    ${media.lessThan(ScreenSizeEnum.XL)`
        display: none;
    `}
    background-color: #c0dbea;
    width: 489px;
    border-radius: 40px;
`
export const CactusImg = styled.img`
    ${media.lessThan(ScreenSizeEnum.XL)`
        display: none;
    `}

    position: absolute;
    bottom: 62px;
    right: 90px;
    z-index: 0;
    width: 198px;
    height: 550px;
    @keyframes motionAnimation {
        0% {
            right: 90px;
            bottom: 62px;
            transform: scale(1);
        }
        30% {
            right: 85px;
            bottom: 60px;
            transform: scale(0.9);
        }
        80% {
            bottom: 135px;
            transform: scale(1.4);
        }
        100% {
            right: 150px;
            bottom: 130px;
            transform: scale(1.4);
        }
    }
    &.registerPage {
        right: 150px;
        bottom: 130px;
        transform: scale(1.4);
    }

    &.registerPageAnimation {
        animation: 1s ease-in-out normal motionAnimation;
        animation-fill-mode: forwards;
    }

    &.loginPage {
        right: 90px;
        bottom: 62px;
        transform: scale(1);
    }

    &.loginPageAnimation {
        animation: 1s ease-in-out normal motionAnimation;
        animation-direction: reverse;
        animation-fill-mode: forwards;
    }
`
export const GirlImg = styled.img`
    ${media.lessThan(ScreenSizeEnum.XL)`
        display: none;
    `}

    position: absolute;
    right: 60px;
    bottom: 0;
    z-index: 0;
    width: 778px;
    height: 703px;
    @keyframes opacityAnimation {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    &.registerPage {
        opacity: 0;
    }

    &.registerPageAnimation {
        animation: 1s ease-in-out normal opacityAnimation;
        animation-fill-mode: forwards;
    }
    &.loginPage {
        opacity: 1;
    }

    &.loginPageAnimation {
        animation: 1s ease-in-out normal opacityAnimation;
        animation-direction: reverse;
        animation-fill-mode: forwards;
    }
`
