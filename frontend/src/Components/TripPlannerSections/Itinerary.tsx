import { Box, Divider, List, Typography } from "@mui/material"
import { useTrip } from "../../Context/TripContext";
import { ClimbCard } from "../ClimbCard";
import { CragAccordion } from "./CragAccordion";

const Itinerary:React.FC = () => {
    const { trip, removeClimbFromItinerary } = useTrip();

    const itinerary = Object.values(trip.current.addedClimbs) || [];

    const climbsByCrag = itinerary.reduce((acc: Record<string, any[]>, climb: any) => {
        const cragName = climb.crag?.name || "Unknown Crag";
        if (!acc[cragName]) acc[cragName] = [];
        acc[cragName].push(climb);
        return acc;
    }, {} as Record<string, any[]>);

    console.log(itinerary);

    return (
        <Box>
            <Typography variant="h5" gutterBottom>Itinerary</Typography>
            <List>
                {Object.entries(climbsByCrag).map(([area,climbs]) => (
                    <Box sx={{mb: 3}}>
                        <Typography variant="h6">{area || "Unknown Area"}</Typography>
                        <Divider sx={{ mb: 1 }}>
                            <CragAccordion crag={area} climbs={climbs}></CragAccordion>
                            {/* {climbs.map((climb:any, index:number) => (
                                <Box key={climb.id || index} sx={{ ml: 2 }}>
                                    <ClimbCard area={area} climb={climb} onClick={function (): void {
                                        throw new Error("Function not implemented.");
                                    } }></ClimbCard>
                                </Box>
                            ))} */}
                        </Divider>
                    </Box>
                ))}
            </List>
        </Box>
    )
}

export default Itinerary;