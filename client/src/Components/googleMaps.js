import React from 'react'

import { withGoogleMap, GoogleMap, Marker, InfoWindow, } from 'react-google-maps'

const Map = withGoogleMap(props => {
  
        // // const markers = props.geoLoc || []
        // console.log('markers', props.geoLoc);

        const toggleShow = (marker) => {
            return marker[2].showInfo ? marker[2].showInfo = false : marker[2].showInfo = true
        }
        
        const changeColor = (status) =>{
              if(!status){
                return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
              } 
               
      }
  return (
    
      <GoogleMap
        defaultZoom={14}
        defaultCenter={props.center}>
        {props.geoLoc.map((marker, idx) => (
                    <Marker 
                        position={{lat: marker[0].lat, lng: marker[0].lng}} 
                        
                        icon={changeColor(marker[1].isCommitted)}
                        key={idx}
                        onClick={() => {
                            // console.log('click', marker[2].showInfo)
                            toggleShow(marker);
                            return props.show()
                        }}
                        >
                     {marker[2].showInfo && (
                        <InfoWindow onCloseClick={()=>{marker[2].showInfo}}>
                            <div>
                              <h3>{marker[1].name}</h3>
                              {marker[1].isCommitted ? 
                                <h6>Upcoming Gig'em Shows</h6> :
                                <h6>Potential Gigs</h6>
                              }
                              <p>{marker[1].address}</p>
                              <p>{marker[1].description}</p>
                              {marker[1].isCommitted ? 
                                <strong><p>Show is fully Committed!</p></strong> :
                                <p>Show still needs more commits!</p>
                              }
                            </div>
                        </InfoWindow>
                     )}
                    </Marker>
        ))}
      </GoogleMap>

  )
})

export default Map