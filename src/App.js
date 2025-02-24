import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StudentPrivateRoute } from './Pages/StudentLogin/PrivateRoute'
import StudentLogin from './Pages/StudentLogin/Login'
import WardenLogin from './Pages/WardenLogin/Login'
import Report from './Pages/StudentLogin/Report'
import Detail from './Pages/StudentLogin/Detail'
import { AuthProvider, useAuth } from './Pages/AuthContext'
import Home from './Pages/WardenLogin/Home'
import BlockList from './Pages/WardenLogin/Block/BlockList'
import { WardenPrivateRoute, SuperAdminPrivateRoute } from './Pages/WardenLogin/PrivateRoute'
import BlockForm from './Pages/WardenLogin/Block/BlockForm'
import BlockFloorList from './Pages/WardenLogin/BlockFloor/BlockFloorList'
import BlockFloorForm from './Pages/WardenLogin/BlockFloor/BlockFloorForm'
import RoomList from './Pages/WardenLogin/Room/RoomList'
import RoomForm from './Pages/WardenLogin/Room/RoomForm'
import CourseList from './Pages/WardenLogin/Course/CourseList'
import CourseForm from './Pages/WardenLogin/Course/CourseForm'
import StudentList from './Pages/WardenLogin/Student/StudentList'
import StudentForm from './Pages/WardenLogin/Student/StudentForm'
import WardenList from './Pages/WardenLogin/Warden/WardenList'
import WardenForm from './Pages/WardenLogin/Warden/WardenForm'
import AttendanceList from './Pages/WardenLogin/Attendance/AttendanceList'
import ErrorPage from './Pages/ErrorPage'
import AttendanceForm from './Pages/WardenLogin/Attendance/AttendanceForm'
import ResetPassword from './Pages/WardenLogin/Warden/ResetPassword'
import UserDetail from './Pages/WardenLogin/Warden/UserDetail'
import AttendanceReport from './Pages/WardenLogin/Attendance/AttendanceReport'
import Faq from './Pages/WardenLogin/Faq'
import Contact from './Pages/WardenLogin/Contact'

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
              path="/course/"
              element={
                <WardenPrivateRoute>
                  <CourseList />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/course/add/"
              element={
                <WardenPrivateRoute>
                  <CourseForm />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/course/:courseId/"
              element={
                <WardenPrivateRoute>
                  <CourseForm />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/student/"
              element={
                <WardenPrivateRoute>
                  <StudentList />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/student/add/"
              element={
                <WardenPrivateRoute>
                  <StudentForm />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/student/:studentId/"
              element={
                <WardenPrivateRoute>
                  <StudentForm />
                </WardenPrivateRoute>
              }
            />
{/* 
            <Route
              path="/warden/"
              element={
                <WardenPrivateRoute>
                  <SuperAdminPrivateRoute>
                    <WardenList />
                  </SuperAdminPrivateRoute>
                </WardenPrivateRoute>
              }
            /> */}

            <Route
              path="/warden/"
              element={
                
                    <WardenList />
                  
              }
            />

            <Route
              path="/warden/add/"
              element={
                <WardenPrivateRoute>
                  <SuperAdminPrivateRoute>
                    <WardenForm />
                  </SuperAdminPrivateRoute>
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/warden/:wardenId/"
              element={
                <WardenPrivateRoute>
                  <SuperAdminPrivateRoute>
                    <WardenForm />
                  </SuperAdminPrivateRoute>
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/warden/details/"
              element={
                <WardenPrivateRoute>
                    <UserDetail />
                </WardenPrivateRoute>
              }
            />


            <Route
              path="/attendance/"
              element={
                <WardenPrivateRoute>
                  <AttendanceList />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/attendance/add/"
              element={
                <WardenPrivateRoute>
                  < AttendanceForm/>
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/attendance/:attendanceId/"
              element={
                <WardenPrivateRoute>
                  <AttendanceForm />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/attendance/report/"
              element={
                <WardenPrivateRoute>
                  <AttendanceReport />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/warden/resetpassword/"
              element={<ResetPassword />}
            />

            <Route
              path="/faq/"
              element={
                <WardenPrivateRoute>
                  <Faq />
                </WardenPrivateRoute>
              }
            />

            <Route
              path="/contact/"
              element={
                <WardenPrivateRoute>
                  <Contact />
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
                  <Detail />
                </StudentPrivateRoute>
              }
            >
            </Route>

            <Route
              path="/error/"
              element={<ErrorPage />}
            >
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
