import React, { useState } from 'react'
import { Container, ImgButton, StyledField, StyledImg } from './styles'
import EyeEmpty from '../../assets/eye_empty.svg'
import EyeOff from '../../assets/eye_off.svg'

export const PasswordField: React.FC = () => {
    const [isTextHidden, setIsTextHidden] = useState(true)
    const buttonOnClickHandler = () => {
        setIsTextHidden(!isTextHidden)
    }
    return (
        <Container>
            <StyledField type={isTextHidden ? 'password' : 'text'} />
            <ImgButton onClick={buttonOnClickHandler}>
                <StyledImg
                    src={isTextHidden ? EyeOff : EyeEmpty}
                    alt="Show/hidden password"
                />
            </ImgButton>
        </Container>
    )
}
