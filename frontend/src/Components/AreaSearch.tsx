import { useBackgroundQuery, useLazyQuery } from "@apollo/client"
import { Box, Grid, IconButton, TextField, useTheme } from "@mui/material"
import { GET_AREAS } from "../GraphQL/AreaSearchQuery"
import { useRef } from "react"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useNavigate } from "react-router-dom";
import { useTrip } from "../Context/TripContext";

const AreaSearch:React.FC = () => {
    const navigate = useNavigate();
    const searchArea = useRef<HTMLInputElement>(null);
    const startDate = useRef<Date | null>(null);
    const endDate = useRef<Date | null>(null);
    // const [selectedArea, setSelectedArea] = useState<any>(null);
    const { trip } = useTrip();
    const theme = useTheme();
    const [getAreas, { loading, error, data }] = useLazyQuery(GET_AREAS);

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        const value = searchArea.current?.value.trim();
        if (!trip || !value) return;
        getAreas({ variables: { area: value }}).then((res) => {
            const areas = res.data?.areas || [];
            if (areas.length) {
                const [areaWithMostChildren] = [...areas].sort(
                    (a, b) => b.children.length - a.children.length
        );

            trip.current.selectedArea = areaWithMostChildren;
            trip.current.startDate = startDate.current;
            trip.current.endDate = endDate.current;
            // setSelectedArea(areaWithMostChildren);
            navigate("/trip-planner");
            }
        });
    }

    // useEffect(() => {
    //     if (!data?.areas?.length)
    //         return; 
    //     const [areaWithMostChildren] = [...data.areas].sort(
    //         (a, b) => b.children.length - a.children.length
    //     );
    //     setSelectedArea(areaWithMostChildren);
    //     console.log(selectedArea);
    // }, [data, selectedArea]);

    return (
            <Grid 
                component="form"
                onSubmit={handleSubmit}
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{
                    minHeight:"100vh",
                    px: 2,
                }}
                >
                <Grid
                    sx={{
                        maxWidth: 500,
                        width: '100%',
                    }}
                >
                    <TextField
                        id="search-area"
                        className="text"
                        inputRef={searchArea}
                        label="Where to?"
                        fullWidth
                        margin="normal"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                            display="flex"
                            gap={2}
                            mt={2}
                            flexDirection={{
                                xs: "column",
                                sm: "row",
                            }}
                        >
                            <DesktopDatePicker
                                label="Start Date"
                                onChange={(newDate) => {
                                    startDate.current = newDate?.toDate() ?? null
                                }}
                            />
                            <DesktopDatePicker
                                label="End Date"
                                onChange={(newDate) => {
                                    endDate.current = newDate?.toDate() ?? null
                                }}
                            />
                        </Box>
                    </LocalizationProvider>
                    <Grid
                        sx={{
                            mt: 6,
                        }}
                    >
                        <IconButton 
                            type="submit" 
                            aria-label="search"
                            sx={{
                                px: 4,
                                py: 2,
                                backgroundColor: theme.palette.secondary.dark,
                                color: "white",
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.light,
                                }
                            }}
                        >
                            Plan Trip
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
    )
}

export default AreaSearch;