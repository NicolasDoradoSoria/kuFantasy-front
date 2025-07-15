import LandingPage from '@/views/pages/public/landing'
import { createBrowserRouter } from 'react-router'
import BackEndCaller from './components/backEndCaller'
import LoginPage from '@/views/pages/public/login'
import Frame from '@/views/layout/Frame'
import RegisterPage from '@/views/pages/public/register'
import PasswordRestorePage from '@/views/pages/public/passwordRestore'
import NewPasswordPage from '@/views/pages/public/newPassword'
import ProfilePage from '@/views/pages/private/profile'
import NotFoundPage from '@/views/pages/public/notFound'
import CharacterSelectPage from '@/views/pages/private/characterSelect'

export const router = createBrowserRouter([
{
    path: "/",
    element: <Frame />,
    children: [
        {index: true, element: <LandingPage />},
    ]
},
{
    element: <Frame />,
    children: [
        {path: "login", element: <BackEndCaller child={<LoginPage />} />},
        {path: "userSelect", element: <BackEndCaller child={<RegisterPage />} />},
        {path: "passwordRestore", element: <BackEndCaller child={<PasswordRestorePage />} />},
        {path: "newPassword", element: <BackEndCaller child={<NewPasswordPage />} />},
        
    ]
},
{
    path: "/user",
    element: <Frame />,
    children: [
        {path: "profile", element: <BackEndCaller child={<ProfilePage />} />},
        {path: "characterSelect", element: <BackEndCaller child={<CharacterSelectPage />} />},
    ]
},
{ path: '*', element: <NotFoundPage /> },
])