import { Button, Card, CardContent, Chip, Stack, Typography, useTheme } from "@mui/material";
import { getGrade, getGradeType } from "../functions";
import { useTrip } from "../Context/TripContext";

export type Climb = {
    id: string;
    name: string;
    grades: string;
    type: string;
}

export type Crag = {
    uuid: string;
    area_name: string;
    [key: string]: any;
}

export const ClimbCard:React.FC<{ crag: any, climb: Climb, onClick: () => void }> = ({ crag, climb, onClick }) => {
    const { addClimbToItinerary, removeClimbFromItinerary, isClimbInItinerary } = useTrip();
    const grade = getGrade(climb.grades);
    const types = getGradeType(climb.type);
    const theme = useTheme();

    console.log(climb);

    return (
        <Card
            sx={{
            minHeight: 150, 
            p: 2, 
            maxHeight: 300,
            }}
            onClick={onClick}
        >
            <CardContent>
                <Typography variant="h6">{climb.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Grade: {grade}
                </Typography>
                <Stack direction="row" spacing={1}>
                    {types.map((type) => (
                        <Chip key={type} label={type}/>
                    ))}
                </Stack>
                
                { !isClimbInItinerary(climb.id) ?
                    <Button 
                        onClick={(e) => {e.stopPropagation(); addClimbToItinerary(climb, crag)}}
                        sx={{
                            backgroundColor: theme.palette.secondary.dark,
                            color: "white",
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.light,
                            }
                        }}
                    >
                        Add Climb
                    </Button>
                :
                    <Button 
                        onClick={(e) => {e.stopPropagation(); removeClimbFromItinerary(climb.id)}}
                        sx={{
                        backgroundColor: theme.palette.secondary.dark,
                        color: "white",
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.light,
                        }
                    }}
                        >
                            Remove Climb
                        </Button>}
            </CardContent>

        </Card>
    )
}

