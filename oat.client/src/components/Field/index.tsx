import React from 'react'
import { StyledField } from './styles'

type Props = {
    name: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    value?: string
}

export const Field: React.FC<Props> = ({
    name,
    onChange,
    placeholder,
    value,
}) => {
    return (
        <StyledField
            type="text"
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}
