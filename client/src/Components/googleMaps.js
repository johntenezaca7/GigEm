import React from 'react'

import { withGoogleMap, GoogleMap, Marker, InfoWindow, } from 'react-google-maps'

const Map = withGoogleMap(props => {
  
        const markers = props.geoLoc || []
        console.log('markers', props.geoLoc);

        const toggleShow = (marker) => {
            return marker[2].showInfo ? marker[2].showInfo = false : marker[2].showInfo = true
        }
        const show = props.show;
  return (
    
      <GoogleMap
        defaultZoom={13}
        defaultCenter={props.center}>
        {props.geoLoc.map((marker, idx) => (
                    <Marker 
                        position={{lat: marker[0].lat, lng: marker[0].lng}} 
                        key={idx}
                        onClick={() => {
                            // console.log('click', marker[2].showInfo)
                            props.show()
                            return toggleShow(marker);
                        }}
                        >
                     {marker[2].showInfo && (
                        <InfoWindow onCloseClick={()=>{marker[2].showInfo = marker[2].showInfo}}>
                            <div>
                              <h5>{marker[1].name}</h5>
                              <p>{marker[1].description}</p>
                            </div>
                        </InfoWindow>
                     )}
                    </Marker>
        ))}
      </GoogleMap>

  )
})

export default Map