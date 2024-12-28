import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from './Pages/StudentLogin/AuthContext'
import PrivateRoute from './Pages/StudentLogin/PrivateRoute'
import StudentLogin from './Pages/StudentLogin/Login'
import HomePage from './Pages/StudentLogin/HomePage'
import Logout from './Pages/StudentLogin/Logout'

function App() {
  const RedirectIfLoggedIn = ({ children }) => {
    const { isLogged } = useAuth()

    if (isLogged) {
      return <Navigate to="/home" />
    }
    return children
  }

  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <RedirectIfLoggedIn>
                  <StudentLogin />
                </RedirectIfLoggedIn>
              } 
            />
            <Route
              path="/student/login"
              element={
                <RedirectIfLoggedIn>
                  <StudentLogin />
                </RedirectIfLoggedIn>
              }
            />
            <Route 
              path="/home" 
              element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
              } 
            />
            <Route 
              path="/logout" 
              element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
              } 
            />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
