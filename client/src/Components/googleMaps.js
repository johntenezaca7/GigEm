import React from 'react'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const Map = withGoogleMap(props => {
  

  const markers = props.results || []
  
 
  return (
    
      <GoogleMap
        defaultZoom={12}
        defaultCenter={props.center}>
        {markers.map((marker, idx) => (
          <Marker {...marker} />
            )
        )}
      </GoogleMap>

  )
})

export default Map