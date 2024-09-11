import styled from 'styled-components'

export const StyledField = styled.input`
    background-color: #c0dbea;
    border-radius: 4px;
    width: 478px;
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
