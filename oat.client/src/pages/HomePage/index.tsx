import { inject, observer } from 'mobx-react'
import { IAuthStore } from '../../store/AuthStore'
import React from 'react'
import { ApiService } from '../../services/apiService'

const HomePage: React.FC = () => {
    ApiService.api
        .get('/account/getuserdata')
        .then((r) => {
            console.log(r)
        })
        .catch((e) => {
            console.error(e)
        })

    return (
        <>
            <h1>Hello</h1>
        </>
    )
}

export default HomePage
