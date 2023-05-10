import { useEffect, useState } from "react"

export const TrackSearch = ({ setterFunction }) => {
  return (
    <div className="search__bar">
      <input className="search_bar_input"
        onChange={(changeEvent) => {
          setterFunction(changeEvent.target.value)
        }}
        type="text"
        placeholder="Search for a track"
      />
    </div>
  )
}
