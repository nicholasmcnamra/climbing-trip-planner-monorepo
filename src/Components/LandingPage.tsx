import { Box, Button, Grid, Typography, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleStartPlanning = () => {
        navigate('/start-planning')
    }
    return (
        <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
        >

            <Grid
                sx={{
                    maxWidth: 800,
                    width: '100%',
                    textAlign: 'center',
                    px: 2,
                }}
            >
                <Typography 
                    variant="h4"
                >
                    One app to plan your whole climbing trip.
                </Typography>
                <Box
                    sx={{
                        maxWidth: 650,
                        margin: '0 auto',
                        mt: 2,
                    }}
                >
                    <Typography 
                        variant="h6"
                        sx={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        }}
                    >
                        Create detailed itineraries, explore crags, and plan your gear - all in one place.
                    </Typography>
                </Box>
                <Box
                    sx={{
                        padding: 4
                    }}
                >
                    <Button
                        size="large"
                        variant="contained"
                        sx={{
                            fontSize: 'large',
                            backgroundColor: theme.palette.secondary.dark,
                            color: theme.palette.primary.main,
                        }}
                        onClick={handleStartPlanning}>
                        Start Planning
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default LandingPage;