import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StudentPrivateRoute } from './Pages/StudentLogin/PrivateRoute'
import StudentLogin from './Pages/StudentLogin/Login'
import WardenLogin from './Pages/WardenLogin/Login'
import Report from './Pages/StudentLogin/Report'
import Details from './Pages/StudentLogin/Details'
import { useWardenAuth, AuthProvider1 } from './Pages/WardenLogin/AuthContext'
import { useStudentAuth,  AuthProvider2 } from './Pages/StudentLogin/AuthContext'
import Home from './Pages/WardenLogin/Home'
import BlockList from './Pages/WardenLogin/Block/BlockList'

function App() {
  const RedirectIfLoggedInWarden = ({ children }) => {
    const { isWardenLogged } = useWardenAuth()

    if (isWardenLogged) {
      return <Navigate to="/home/" />
    }
    return children
  }
  
  const RedirectIfLoggedInStudent = ({ children }) => {
    const { isStudentLogged } = useStudentAuth ()
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
                <RedirectIfLoggedInWarden>
                  <WardenLogin />
                </RedirectIfLoggedInWarden>
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
              path="/home/"
              element={
                <RedirectIfLoggedInWarden>
                  <Home />
                </RedirectIfLoggedInWarden>
              }
            />

            <Route
              path="/block/"
              element={
                <RedirectIfLoggedInWarden>
                  <BlockList />
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
