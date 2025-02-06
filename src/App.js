import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StudentPrivateRoute } from './Pages/StudentLogin/PrivateRoute'
import StudentLogin from './Pages/StudentLogin/Login'
import WardenLogin from './Pages/WardenLogin/Login'
import Report from './Pages/StudentLogin/Report'
import Details from './Pages/StudentLogin/Details'
import { useAuth, AuthProvider1 } from './Pages/WardenLogin/AuthContext'
import { AuthProvider2 } from './Pages/StudentLogin/AuthContext'

function App() {
  const RedirectIfLoggedInWarden = ({ children }) => {
    const { isWardenLogged } = useAuth()

    if (isWardenLogged) {
      return <Navigate to="/home/" />
    }
    return children
  }
  
  const RedirectIfLoggedInStudent = ({ children }) => {
    const { isStudentLogged } = useAuth()

    if (isStudentLogged) {
      return <Navigate to="/student/report/" />
    }
    return children
  }

  return (
    <AuthProvider1>
    <AuthProvider2>
      <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <RedirectIfLoggedInStudent>
                  <WardenLogin />
                </RedirectIfLoggedInStudent>
              } 
            />

            <Route
              path="/login/"
              element={
                <RedirectIfLoggedInWarden>
                  <WardenLogin />
                </RedirectIfLoggedInWarden>
              }
            />

            <Route
              path="/student/login/"
              element={
                <RedirectIfLoggedInStudent>
                  <StudentLogin />
                </RedirectIfLoggedInStudent>
              }
            />
            <Route 
              path="/student/report/" 
              element={
                <StudentPrivateRoute>
                  <Report />
                </StudentPrivateRoute>
              } 
            />
            <Route
              path="/student/details/"
              element={
                <StudentPrivateRoute>
                  <Details />
                </StudentPrivateRoute>
              }
            >
              
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider2>
    </AuthProvider1>
  )
}

export default App;
