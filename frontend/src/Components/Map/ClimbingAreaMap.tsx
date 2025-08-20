import { Box } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useTrip } from "../../Context/TripContext";
import { Icon } from "leaflet";

export const ClimbingAreaMap:React.FC = () => {
    const { trip } = useTrip();
    const carabinerIcon = new Icon({
        iconUrl: "/assets/carabinericon.png",
        iconSize: [35, 30],
        iconAnchor: [17, 94],
        popupAnchor: [0, -94]
    })

    const crags: any[] = trip?.selectedArea?.children?.map((area: { area: any; }) => area)

    console.log("Crags:", crags);

    if (!crags) {
        return (
        <Box>Map not available</Box>
    )
    }
    return (
        <Box
        >
            <MapContainer 
                center={[crags[0]?.metadata?.lat, crags[0]?.metadata?.lng]} 
                zoom={13} 
                scrollWheelZoom 
                style={{ height: '100vh', width: '100wh' }}
            >
                <TileLayer attribution='&copy; <a href="href="https://www.openstreetmap.org/copyright">Open Street Map</a> contributors' url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}></TileLayer>
                {crags?.map((crag, index) => (
                    <Marker 
                        position={[crag?.metadata?.lat, crag?.metadata?.lng]}
                        icon={carabinerIcon}
                    >
                        <Popup>
                            {crag.area_name}
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>
        </Box>
    )
}