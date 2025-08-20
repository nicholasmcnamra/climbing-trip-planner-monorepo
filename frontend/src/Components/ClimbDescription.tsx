import { Box, Typography } from "@mui/material";
import { ClimbCard } from "../Components/ClimbCard";
import { getGrade, getGradeType } from "../functions";

const ClimbDescription:React.FC<{ selectedClimb: any, parentCrag: any, onAddClimb: (climb: any) => void }> = ({ selectedClimb, parentCrag, onAddClimb }) => {

  if (!selectedClimb) {
    return <Typography>Climb not found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{selectedClimb.name}</Typography>
      <Typography>Description: {selectedClimb.content.description}</Typography>
      <Typography>Location: {selectedClimb.content.location}</Typography>
      {/* <Typography>Protection: {selectedClimb.content.protection}</Typography> */}
      <Typography>Grade: {getGrade(selectedClimb.grades)}</Typography>
      <Typography>Type: {getGradeType(selectedClimb.type)}</Typography>

      <Box mt={4}>
        <Typography variant="h6">Other Climbs in {parentCrag.area_name}</Typography>
        <Box 
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap={2}
          mt={1}
        >
          {parentCrag.climbs.map((climb: any) => (
            <ClimbCard 
            crag={parentCrag} 
            climb={climb} 
            key={climb.id} 
            onClick={() => onAddClimb(climb)}
              />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ClimbDescription