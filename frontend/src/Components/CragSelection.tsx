import { Box, List, ListItem, ListItemButton, ListItemText, useTheme } from "@mui/material";
import { useState } from "react";
import { ClimbCard } from "./ClimbCard";
import { useTrip } from "../Context/TripContext";

type Area = {
    area_name: string,
    children: Array<any>
}

const CragSelection:React.FC<{ onClimbSelect: (climb: any, crag: any) => void }> = ( {onClimbSelect} ) => {
    const { trip } = useTrip();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedCrag, setSelectedCrag] = useState<any | null>(null);
    const theme = useTheme();

    const handleSelect = (index:number) => {
        setSelectedIndex(index);
        setSelectedCrag(trip.current.selectedArea.children[index]);
        console.log(selectedCrag);
    }

    if (!trip.current.selectedArea) {
        return (
            <Box>No area selected</Box>
        )
    }

    return (
        <Box sx={{
            display: "flex",
            height: "100vh",
            p: 3,
        }}>
            <Box
                sx={{
                width: 300,
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
                    {trip.current.selectedArea.area_name}
                </Box>
                <List>
                    {trip.current.selectedArea.children.map((area:any, index:number) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                selected={index === selectedIndex}
                                onClick={() => handleSelect(index)}
                            >
                                <ListItemText primary={area.area_name}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box 
                sx={{ 
                flexGrow: 1, 
                p: 2, 
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                }}
            >
                {selectedIndex !== null ? (
                    <Box
                        sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        }}
                    >
                        <h2>{trip.current.selectedArea.children[selectedIndex].area_name}</h2>
                        <Box 
                            sx={{
                            flexGrow: 1,
                            overflowY: "auto",
                            minHeight: 0,
                            borderColor: theme.palette.secondary.dark
                            }}
                        >
                            {trip.current.selectedArea.children[selectedIndex].climbs.map((climb: any, index: number) => (
                                <Box
                                    key={index}
                                    sx={{
                                    borderBottom: index !== trip.current.selectedArea.children[selectedIndex].climbs.length - 1 ? "1px solid" : "none",
                                    borderBottomColor: theme.palette.secondary.dark,
                                    }}
                                >
                                    <ClimbCard 
                                        crag={selectedCrag} 
                                        climb={climb} 
                                        onClick={() => onClimbSelect(climb, selectedCrag) }
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ) :
                <Box>Select an Area from the list.</Box>}
            </Box>
        </Box>
    )
}

export default CragSelection;