import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StudentPrivateRoute } from './Pages/StudentLogin/PrivateRoute'
import StudentLogin from './Pages/StudentLogin/Login'
import WardenLogin from './Pages/WardenLogin/Login'
import Report from './Pages/StudentLogin/Report'
import Details from './Pages/StudentLogin/Details'
import { AuthProvider, useAuth } from './Pages/AuthContext'
import Home from './Pages/WardenLogin/Home'
import BlockList from './Pages/WardenLogin/Block/BlockList'
import { WardenPrivateRoute } from './Pages/WardenLogin/PrivateRoute'
import BlockForm from '../src/Pages/WardenLogin/Block/BlockForm'


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
    <AuthProvider>
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
                <WardenPrivateRoute>
                  <Home />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/block/"
              element={
                <WardenPrivateRoute>
                  <BlockList />
                </WardenPrivateRoute>
              }
            />

            <Route 
              path="/block/edit/:blockId" 
              element={<BlockForm />} 
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
    </AuthProvider>
  )
}

export default App;
