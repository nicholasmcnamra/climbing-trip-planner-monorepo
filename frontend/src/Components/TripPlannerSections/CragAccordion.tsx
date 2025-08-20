import { Delete, ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, List, ListItem, Typography } from "@mui/material"
import { getGrade } from "../../functions";
import { useTrip } from "../../Context/TripContext";

export const CragAccordion:React.FC<{ crag:any, climbs:any, }> = ({ crag, climbs }) => {
    const { trip, removeClimbFromItinerary } = useTrip();
//potentially add protection to the climb dropdown if you get the protection data cleaned up
    console.log(crag, climbs);
    return (
        <Box>
        <Accordion slotProps={{ heading: { component: 'h4' } }}>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
            {crag}
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {climbs.map((climb:any) => (
                        <ListItem
                            key={climb.uuid}
                            sx={{}}
                        >
                            <Box>
                                
                                <Typography>
                                    {climb.name} ({getGrade(climb.grades)})
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton onClick={() => removeClimbFromItinerary(climb.id)}>
                                    <Delete/>
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
        </Box>
    )
}