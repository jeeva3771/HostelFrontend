import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from './Pages/StudentLogin/AuthContext'
import PrivateRoute from './Pages/StudentLogin/PrivateRoute'
import StudentLogin from './Pages/StudentLogin/Login'
import Report from './Pages/StudentLogin/Report'
import Details from "./Pages/StudentLogin/Details"

function App() {
  const RedirectIfLoggedIn = ({ children }) => {
    const { isLogged } = useAuth()

    if (isLogged) {
      return <Navigate to="/student/report" />
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
              path="/student/login/"
              element={
                <RedirectIfLoggedIn>
                  <StudentLogin />
                </RedirectIfLoggedIn>
              }
            />
            <Route 
              path="/student/report/" 
              element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
              } 
            />
            <Route
              path="/student/details/"
              element={
                <PrivateRoute>
                  <Details />
                </PrivateRoute>
              }
            >
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
