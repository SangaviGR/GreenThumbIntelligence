import * as React from "react";
import {
  CardContent,
  CardMedia,
  Typography,
  Paper,
  Chip,
  Box,
  Grid,
  Divider,
  useTheme
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpdatePlant from "../UpdatePlant";

export default function PlantCard({ plantInfo }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {/* Plant Image */}
      <CardMedia
        sx={{ 
          width: { xs: "100%", md: 350 },
          height: { xs: 250, md: "auto" },
          objectFit: "cover"
        }}
        component="img"
        image={plantInfo.image_path}
        alt={`${plantInfo.common_name} plant`}
      />

      {/* Plant Details */}
      <CardContent sx={{ 
        width: { xs: "100%", md: "60%" },
        p: 3,
        display: "flex",
        flexDirection: "column"
      }}>
        <Box mb={2}>
          <Typography variant="h4" component="h2" fontWeight={700}>
            {plantInfo.common_name}
          </Typography>
          <Typography variant="h6" color="text.secondary" fontStyle="italic">
            {plantInfo.scientific_name}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" paragraph>
          {plantInfo.description}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} sx={{ 
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.default'
            }}>
              <Typography variant="subtitle2" color="text.secondary">
                Care Instructions
              </Typography>
              <Box mt={1}>
                <Typography variant="body2">
                  <Typography component="span" fontWeight={600}>Water:</Typography> {plantInfo.water}
                </Typography>
                <Typography variant="body2">
                  <Typography component="span" fontWeight={600}>Pruning:</Typography> {plantInfo.pruning}
                </Typography>
                <Typography variant="body2">
                  <Typography component="span" fontWeight={600}>Fertilization:</Typography> {plantInfo.fertilization}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Additional care info grid item can be added here */}
        </Grid>

        <Box mt={3} textAlign="right">
          <Chip
            icon={<AddIcon fontSize="small" />}
            onClick={handleClickOpen}
            label="Edit Plant Info"
            variant="outlined"
            sx={{
              px: 1,
              '& .MuiChip-label': {
                fontSize: '0.875rem'
              },
              '&:hover': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main
              }
            }}
          />
        </Box>

        <UpdatePlant
          open={open}
          handleClose={handleClose}
          plantInfo={plantInfo}
        />
      </CardContent>
    </Paper>
  );
}