import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useTrip } from "../../Context/TripContext";
import AreaCard from "../AreaCard";

const Explore = () => {
    const { trip } = useTrip();

    return (
        <Box sx={{
            display: "flex",
            height: "100vh"
        }}>
            <Box
                sx={{
                    width: "45vw",
                    borderRight: "1px solid #ccc",
                    overflowY: "auto",
                    padding: 1,
                }}
            >
                <Box
                    sx={{
                        fontWeight: "bold",
                        mb: 2
                    }}
                >
                    {trip?.selectedArea?.area_name}
                </Box>
                <List
                    sx={{
                        overflow: "auto",
                        display: 'flex', 
                        flexDirection: 'row'
                    }}
                    
                >
                    {trip?.selectedArea?.children?.map((area:any, index:number) => (
                        <AreaCard 
                        crag={area}
                        />
                    ))}
                </List>
            </Box>
        </Box>
    )
}

export default Explore;