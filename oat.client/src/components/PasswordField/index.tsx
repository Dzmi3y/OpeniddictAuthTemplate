import React, { useState } from 'react'
import { Container, ImgButton, StyledField, StyledImg } from './styles'
import EyeEmpty from '../../assets/eye_empty.svg'
import EyeOff from '../../assets/eye_off.svg'

type Props = {
    name: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
}

export const PasswordField: React.FC<Props> = ({ name, onChange, value }) => {
    const [isTextHidden, setIsTextHidden] = useState(true)
    const buttonOnClickHandler = () => {
        setIsTextHidden(!isTextHidden)
    }
    return (
        <Container>
            <StyledField
                type={isTextHidden ? 'password' : 'text'}
                name={name}
                value={value}
                onChange={onChange}
            />
            <ImgButton type="button" onClick={buttonOnClickHandler}>
                <StyledImg
                    src={isTextHidden ? EyeOff : EyeEmpty}
                    alt="Show/hidden password"
                />
            </ImgButton>
        </Container>
    )
}
