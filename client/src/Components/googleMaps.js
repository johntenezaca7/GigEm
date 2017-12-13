import React from 'react'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const Map = withGoogleMap(props => {
  
        const markers = props.geoLoc || []
    
    
        const renderWhenClicked = () =>{
            console.log('cdslkm')
        }
 
  return (
    
      <GoogleMap
        defaultZoom={14}
        defaultCenter={props.center}>
        {props.geoLoc.map((marker, idx) => (
                    <Marker 
                        position={{lat: marker[0].lat, lng: marker[0].lng}} 
                        key={idx}
                        onClick={() => {console.log(marker[1].description)}}
                        />
        ))}
      </GoogleMap>

  )
})

export default Map