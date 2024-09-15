import React, { useState } from 'react'
import { AuthService } from '../../services/authService'
import { IAuthStore } from '../../store/AuthStore'
import { inject, observer } from 'mobx-react'
import { RouteNames } from '../../router'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Label } from './styles'

const HomePage: React.FC<{ authStore: IAuthStore }> = inject('authStore')(
    observer(({ authStore }) => {
        const navigate = useNavigate()
        const [username, setUsername] = useState<string>()

        AuthService.getAccountInfo()
            .then((response) => {
                setUsername(response.data.name)
            })
            .catch((error) => {
                console.error(error)
                logout()
            })

        const logout = () => {
            authStore.logout().then(() => {
                navigate(RouteNames.LOGIN)
            })
        }

        return (
            <Container>
                <Label>Hello {username}</Label>
                <Button onClick={logout}>logout</Button>
            </Container>
        )
    })
)

export default HomePage
