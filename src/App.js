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
import BlockForm from './Pages/WardenLogin/Block/BlockForm'
import BlockFloorList from './Pages/WardenLogin/BlockFloor/BlockFloorList'
import BlockFloorForm from './Pages/WardenLogin/BlockFloor/BlockFloorForm'
import RoomList from './Pages/WardenLogin/Room/RoomList'
import RoomForm from './Pages/WardenLogin/Room/RoomForm'

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
              path="/block/add/" 
              element={
                <WardenPrivateRoute>
                  <BlockForm />
                </WardenPrivateRoute>
              }   
            />

            <Route 
              path="/block/:blockId/" 
              element={
                <WardenPrivateRoute>
                  <BlockForm />
                </WardenPrivateRoute>
              }   
            />

            <Route 
              path="/block/:blockId/" 
              element={
                <WardenPrivateRoute>
                  <BlockForm />
                </WardenPrivateRoute>
              } 
            />

            <Route
              path="/blockfloor/"
              element={
                <WardenPrivateRoute>
                  <BlockFloorList />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/blockfloor/add/"
              element={
                <WardenPrivateRoute>
                  <BlockFloorForm />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/blockfloor/:blockFloorId/"
              element={
                <WardenPrivateRoute>
                  <BlockFloorForm />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/room/"
              element={
                <WardenPrivateRoute>
                  <RoomList />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/room/add/"
              element={
                <WardenPrivateRoute>
                  <RoomForm />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/room/:roomId/"
              element={
                <WardenPrivateRoute>
                  <RoomForm />
                </WardenPrivateRoute>
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
    </AuthProvider>
  )
}

export default App;
