import { useState } from "react"
import { TrackSearch } from "./TrackSearch"
import { TrackList } from "./TrackList"



export const TrackContainer = () => {
  const [searchTerms, setSearchTerms] = useState("")
  return (
    <>
      <TrackSearch setterFunction={setSearchTerms} />
      <TrackList searchTermState={searchTerms} />
    </>
  )
}
