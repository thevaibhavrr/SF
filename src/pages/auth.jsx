import React, { Suspense, lazy } from 'react'
import { Route, Routes } from "react-router"
import Primaryloader from '../components/loaders/primaryloader'
// import Login from '../components/Auth/login'
// import Signup from '../components/Auth/singup'

const Login = lazy(() => import('../components/Auth/login'))
const Signup = lazy(() => import('../components/Auth/singup'))

function Auth() {
    return (
        <div>
            <Suspense fallback={<div> <Primaryloader /> </div>}>

                <Routes>
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/signup"
                        element={<Signup />}
                    />
                </Routes>
            </Suspense>
        </div>
    )
}

export default Auth