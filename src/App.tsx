import { RouterProvider } from "react-router"
import { router } from "./router/router"
import { AuthGuard } from "./router/context/authGuard"
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <>
      <AuthGuard>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthGuard>

    </>
  )
}

export default App
