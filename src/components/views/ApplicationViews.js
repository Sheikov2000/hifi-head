import { Route, Routes, Outlet } from "react-router-dom"
import { Login } from "../logins/Login"
import { TrackList } from "../tracks/TrackList"
import { NewTrackForm } from "../tracks/NewTrackForm"
import { TrackContainer } from "../tracks/TrackContainer"
import { TrackEdit } from "../tracks/TrackEdit"



export const ApplicationViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Hi-Fi Head!</h1>
            <Outlet />
          </>
        }
      >
        
        <Route path="login" element={<Login />} />
        <Route path="tracks" element={ <TrackContainer />}/>
        <Route path="newTrackForm" element={<NewTrackForm />} />
        <Route path="trakList" element={<TrackList />} />
        <Route path="tracks/edit/:trackId" element={<TrackEdit />} />
      </Route>
    </Routes>
  )
}
