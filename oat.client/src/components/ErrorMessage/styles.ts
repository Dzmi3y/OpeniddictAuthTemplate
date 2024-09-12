import styled from 'styled-components'
import { media, ScreenSizeEnum } from '../../media'

export const Container = styled.label`
    border-radius: 4px;
    width: 478px;
    background: rgba(216, 133, 163, 0.3);
    color: #8b2c4e;
    overflow: hidden;
    height: 0px;
    margin-top: 20px;
    align-items: center;
    padding: 0px 10px 0px 10px;
    text-transform: uppercase;
    ${media.lessThan(ScreenSizeEnum.SM)`
        width: auto;
        max-width: 478px;
        font-size: 10px;
    `}
    @keyframes animation {
        0% {
            display: none;
            height: 0px;
            min-height: none;
        }
        1% {
            display: flex;
            height: 0px;
            padding-bottom: 0;
            padding-top: 0;
        }

        90% {
            height: 20px;
        }
        100% {
            display: flex;
            height: auto;
            padding-bottom: 10px;
            padding-top: 10px;
        }
    }
    &.shown {
        animation: 500ms ease-in-out normal animation;
        animation-delay: 500ms;
        animation-fill-mode: forwards;
    }
    &.hidden {
        display: none;
    }
`
