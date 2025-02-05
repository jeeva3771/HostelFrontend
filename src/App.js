import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from './Pages/StudentLogin/AuthContext'
import studentPrivateRoute from './Pages/StudentLogin/PrivateRoute'
import StudentLogin from './Pages/StudentLogin/Login'
import Report from './Pages/StudentLogin/Report'
import Details from "./Pages/StudentLogin/Details"

function App() {
  const RedirectIfLoggedIn = ({ children }) => {
    const { isStudentLogged } = useAuth()

    if (isStudentLogged) {
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
              path="/api/student/login/"
              element={<StudentLogin />}
            />
            <Route 
              path="/student/report/" 
              element={
                <studentPrivateRoute>
                  <Report />
                </studentPrivateRoute>
              } 
            />
            <Route
              path="/student/details/"
              element={
                <studentPrivateRoute>
                  <Details />
                </studentPrivateRoute>
              }
            >
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
