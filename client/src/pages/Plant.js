import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  useTheme,Container
} from "@mui/material";
import PlantCard from "../components/PlantCard";
import { QUERY_PLANT } from "../utils/queries";
import PlantHistoryForm from "../components/PlantHistoryForm";
import PlantHistory from "../components/PlantHistory";

const Plant = () => {
  const theme = useTheme();
  const { id: plantId } = useParams();
  const { loading, data } = useQuery(QUERY_PLANT, {
    variables: { id: plantId },
  });
  const plant = data?.plant || {};

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      p: { xs: 2, md: 4 }
    }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box textAlign="center" mb={4}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              mb: 1
            }}
          >
            Plant History Tracker
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
          >
            Record and monitor your plant's growth journey
          </Typography>
        </Box>

        {/* Plant Card */}
        <Box mb={4}>
          <PlantCard plantInfo={plant} />
        </Box>

        {/* Main Content Area */}
        <Grid container spacing={4}>
          {/* History Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{
              p: 3,
              borderRadius: 3,
              height: '100%',
              bgcolor: 'background.paper'
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Growth History
              </Typography>
              {plant.plantHistory && <PlantHistory history={plant.plantHistory} />}
            </Paper>
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{
              p: 3,
              borderRadius: 3,
              height: '100%',
              bgcolor: 'background.paper',
              position: 'sticky',
              top: 20
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Add New Record
              </Typography>
              <PlantHistoryForm plantId={plant._id} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Plant;