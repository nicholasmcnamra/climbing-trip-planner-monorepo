import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

type Crag = {
    area_name: string;
}

export const AreaCard:React.FC<{ crag: Crag }> = ({ crag }) => {

    return (
        <Card
            sx={{
                minHeight: 150, 
                minWidth: 150,
                p: 2,
            }}
        >
            <CardContent>
                <Typography variant="h6">{crag.area_name}</Typography>
                {/* <Typography variant="body2" color="text.secondary">
                    Grade: {grade}
                </Typography> */}
                {/* <Stack direction="row" spacing={1}>
                    {types.map((type) => (
                        <Chip key={type} label={type}/>
                    ))}
                </Stack> */}
            </CardContent>

        </Card>
    )
}

export default AreaCard;