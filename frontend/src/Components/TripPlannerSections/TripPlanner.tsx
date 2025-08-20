import { Box, List, ListItem, ListItemButton, ListItemText, Typography, useTheme } from "@mui/material"
import { useState } from "react";
import Notes from "./Notes";
import Itinerary from "./Itinerary";
import Budget from "./Budget";
import { useTrip } from "../../Context/TripContext";
import ClimbDescription from "../ClimbDescription";
import CragSelection from "../CragSelection";
import { ClimbingAreaMap } from "../Map/ClimbingAreaMap";

const TripPlanner:React.FC = () => {
    const [activeSection, setActiveSection] = useState("Crags");
    const { trip, addClimbToItinerary } = useTrip();
    const [selectedClimb, setSelectedClimb] = useState<any | null>(null);
    const [parentCrag, setParentCrag] = useState<any | null>(null);
    const theme = useTheme();

    console.log(trip)

    const renderMainContent = () => {

        if (selectedClimb && parentCrag) {
            return (
                <ClimbDescription
                    selectedClimb={selectedClimb}
                    parentCrag={parentCrag}
                    onAddClimb={ async () => {
                        if (trip.selectedArea?.id) {
                            await addClimbToItinerary({
                                ...selectedClimb, 
                            },
                            parentCrag);
                            setSelectedClimb(null);
                            setParentCrag(null);
                        }
                    }}
                />
            );
        }
        switch (activeSection) {
            case "Crags":
                return <CragSelection onClimbSelect={(climb:any, crag:any) => {
                    setSelectedClimb(climb);
                    setParentCrag(crag);
                }}/>
            case "Notes":
                return <Notes></Notes>
            case "Itinerary":
                return <Itinerary></Itinerary>
            case "Budget":
                return <Budget></Budget>
        }
    }
    return (
        <Box 
            sx={{
            display: "flex", 
            height: "100vh",
            }}
        >
            <Box
                sx={{
                width: "200px",
                borderRight: "1px solid #ddd",
                p: 2,
                backgroundColor: theme.palette.secondary.dark,
                color: theme.palette.primary.light,
                }}
            >
                <Typography 
                    variant="h6"
                    sx={{
                        p: 2,
                    }}
                >
                    Trip Planner
                </Typography>
                <List>
                    {["Crags", "Notes", "Itinerary", "Budget"].map((section) => (
                        <ListItem disablePadding key={section}>
                             <ListItemButton 
                                onClick={() => {setActiveSection(section); setSelectedClimb(null); setParentCrag(null)}}
                                sx={{
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                    borderRadius: 2,
                                    }   
                                }}
                             >
                                <ListItemText primary={section}/>
                             </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box 
                sx={{ 
                flex: 1, 
                p: 3,
                overflowY: "auto",
                height: "100%",
                minHeight: 0,
            }}
            >
                <Typography 
                    variant="h3"
                    sx={{
                        p: 3,
                        borderBottom: "1px solid",
                        borderBottomColor: theme.palette.secondary.dark,
                    }}
                >
                    Trip to {trip?.selectedArea?.area_name || "[Selected Area]"}
                </Typography>
                {renderMainContent()}
            </Box>

            <Box
                sx={{
                    width: "30%",
                    borderLeft: "1px solix #ddd",
                    p: 2,
                    backgroundColor: "#fafafa",
                }}
            >
                <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                        p: 2,
                    }}
                    >
                    Map View
                </Typography>
                <Box sx={{ height: "100%", backgroundColor: "#eaeaea", overflow: "hidden"}}>
                    <ClimbingAreaMap/>
                </Box>
            </Box>
        </Box>
    )
}

export default TripPlanner;