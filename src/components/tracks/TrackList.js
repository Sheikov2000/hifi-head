import "./tracks.css"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TrackSearch } from "./TrackSearch"

export const TrackList = ({searchTermsState}) => {
  const [tracks, setTracks] = useState([])
  const [genre, setGenre] = useState([])
  const [filteredTracks, setFilteredTracks] = useState([])
  const navigate = useNavigate()
  const loggedInUser = JSON.parse(localStorage.getItem("hifi_user"))
  
  useEffect(() => {
    fetch(`http://localhost:8088/tracks?_expand=genre&_expand=range`)
      .then((response) => response.json())
      .then((trackArray) => {
        setTracks(trackArray)
      })
  }, [])

  useEffect(() => {
    fetch(` http://localhost:8088/genres`)
      .then((response) => response.json())
      .then((genreArray) => {
        setGenre(genreArray)
      })
  }, [])

  const getTracks = () => {
    return fetch(`http://localhost:8088/tracks?_expand=genre&_expand=range`)
      .then((response) => response.json())
      .then((trackArray) => {
        setTracks(trackArray)
      })

  }
//TODO create a fetch with Delete and render the updated track list
  const deleteTrackButton = (track) => {
    fetch(`http://localhost:8088/tracks/${track.id}`,{
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => {
        getTracks()
    })
  }

  // TODO earch does not work! The user should be able to type song name, artist or genre in the search.
  useEffect(
    () => {
      const searchedTracks = tracks.filter(track => {
        track.startsWith(searchTermsState)})
      setFilteredTracks(searchedTracks)
    },
    [ searchTermsState ]
  )

 return (
    <>
      <h2>View All Tracks:</h2>
      <div className="tracks">
        {tracks.map((track) => {
          return (
            <section className="track--list" key={`track--${track.id}`}>
              
             
              <ul>Artist: {track.artistName}</ul>
              <ul>Track: {track.songName}</ul>
              <ul>Genre: {track.genre.genre}</ul>
              <ul>Best for testing (range): {track.range.frequency}</ul>
             
                
                {track.userId === (loggedInUser.id) && <>
              
                  <Link to={`/tracks/edit/${track.id}`}><button className="editTrackButton">Edit Track</button></Link>
                  <button onClick={() => deleteTrackButton(track)} className="delete__track">Delete</button>
                </>
        }
            </section>
          )
        })}
      </div>
    </>
  )
}

