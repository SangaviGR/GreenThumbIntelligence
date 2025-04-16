import * as React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Chip,
  useMediaQuery,
  ListSubheader,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment'; // Add the Assessment Icon
import { Link } from 'react-router-dom';
import AddPlantDialog from '../AddPlantDialog';
import HealthAssessmentDialog from '../HealthAssessmentDialog';

export default function Garden({ plants, assessments = [], user }) {
  const [open, setOpen] = React.useState(false);
  const [healthOpen, setHealthOpen] = React.useState(false);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleHealthClickOpen = () => setHealthOpen(true);
  const handleHealthClose = () => setHealthOpen(false);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        px: 3,
        py: 2,
        overflowY: 'auto',
        height: 'calc(100vh - 100px)',
      }}
    >
      {/* Header */}
      <Grid item xs={12}>
        <ListSubheader
          component="div"
          sx={{ fontSize: '24px', display: 'flex', alignItems: 'center' }}
        >
          {user}'s Garden
          <Chip
            sx={{
              fontSize: '11px',
              width: 100,
              height: 28,
              cursor: 'pointer',
              ml: 2,
              ':hover': { borderColor: 'green' },
            }}
            icon={<AddIcon />}
            onClick={handleClickOpen}
            label="Add Plant"
            variant="outlined"
          />
          <Chip
            sx={{
              fontSize: '11px',
              width: 120,
              height: 28,
              cursor: 'pointer',
              ml: 2,
              ':hover': { borderColor: 'green' },
            }}
            icon={<AssessmentIcon />}
            onClick={handleHealthClickOpen}
            label="Assess Health"
            variant="outlined"
          />
        </ListSubheader>
        <AddPlantDialog open={open} handleClose={handleClose} />
        <HealthAssessmentDialog open={healthOpen} handleClose={handleHealthClose} />
      </Grid>

      {/* Plant Cards */}
      {plants && plants.length > 0 ? (
        plants.map((plant) => (
          <Grid item xs={12} sm={6} md={4} key={plant._id}>
            <Card
              sx={{
                borderRadius: '12px',
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={`${plant.image_path}`}
                alt={plant.common_name}
                loading="lazy"
              />
              <CardContent>
                <Typography variant="h6">{plant.common_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <i>{plant.scientific_name}</i>
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label={`info about ${plant.common_name}`}
                  component={Link}
                  to={`/plant/${plant._id}`}
                  sx={{ ml: 'auto', color: 'primary.main' }}
                >
                  <InfoIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ p: 2 }}>
            No plants to show.
          </Typography>
        </Grid>
      )}

      {/* Health Assessment Cards */}
      {assessments && assessments.length > 0 ? (
        assessments.map((a) => (
          <Grid item xs={12} sm={6} md={4} key={a._id}>
            <Card
              sx={{
                borderRadius: '12px',
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={a.image_path}
                alt="Health Assessment"
                loading="lazy"
              />
              <CardContent>
                <Typography variant="h6">
                  Health Status: {a.is_healthy.binary ? 'Healthy' : 'Unhealthy'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Confidence: {(a.is_healthy.probability * 100).toFixed(1)}%
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <b>Top Disease:</b>{' '}
                  {a.disease?.suggestions?.[0]?.name || 'N/A'} (
                  {a.disease?.suggestions?.[0]?.probability
                    ? (a.disease.suggestions[0].probability * 100).toFixed(1)
                    : 0}
                  %)
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                  {new Date(a.assessedAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ px: 2, color: 'gray' }}>
            No health assessments available.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

