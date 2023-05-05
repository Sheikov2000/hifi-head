import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewTrackForm = () => {
  const localHiFiUser = localStorage.getItem("hifi_user")
  const hifiUserObject = JSON.parse(localHiFiUser)
  const navigate = useNavigate()
  const [genre, setGenre] = useState([])
  const [range, setRange] = useState([])
  const [track, setTrack] = useState({
    artistName: "",
    songName: "",
    genre: 0,
    frequency: 0,
    userId: 0,
  })

  useEffect(() => {
    fetch(` http://localhost:8088/genres`)
      .then((response) => response.json())
      .then((genreArray) => {
        setGenre(genreArray)
      })
  }, [])

  useEffect(() => {
    fetch(` http://localhost:8088/ranges`)
      .then((response) => response.json())
      .then((rangeArray) => {
        setRange(rangeArray)
      })
  }, [])

  
    const handleSaveButtonClick = (event) => {
    event.preventDefault()

    const trackToSendToAPI = {
      userId: hifiUserObject.id,
      artistName: track.artistName,
      songName: track.songName,
      genreId: track.genreId,
      rangeId: track.rangeId
    }

    return fetch(`http://localhost:8088/tracks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/tracks")
      })
  }

  return (
    <form className="trackForm">
      <h2 className="trackForm__title">Submit New Track</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="ArtistName">Artist Name:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Enter Artist Name"
            value={track.artistName}
            onChange={(evt) => {
              const copy = { ...track }
              copy.artistName = evt.target.value
              setTrack(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="SongName">Song Name:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Enter Song Name"
            value={track.songName}
            onChange={(evt) => {
              const copy = { ...track }
              copy.songName = evt.target.value
              setTrack(copy)
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="genre">
            Genre:
            <select
              value={track.genreId}
              onChange={(evt) => {
                const copy = { ...track }
                copy.genreId = parseInt(evt.target.value)
                setTrack(copy)
              }}
            >
              <option>Please select:</option>
              {genre.map((genre) => {
                return (
                  <option value={genre.id} key={`${genre.id}`}>
                    {genre.genre}
                  </option>
                )
              })}
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="range">
            Best for testing (frequency):
            <select
              value={track.rangeId}
              onChange={(evt) => {
                const copy = { ...track }
                copy.rangeId = parseInt(evt.target.value)
                setTrack(copy)
              }}
            >
              <option>Please select:</option>
              {range.map((range) => {
                return (
                  <option value={range.id} key={`${range.id}`}>
                    {range.frequency}
                  </option>
                )
              })}
            </select>
          </label>
        </div>
      </fieldset>

      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Submit Track
      </button>
    </form>
  )
}
