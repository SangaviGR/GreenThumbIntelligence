import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Button, Box, CircularProgress, Typography, Paper, TextField, Chip,
  AccordionDetails, AccordionSummary, Accordion, ListItemText, ListItem, Divider, List
} from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HealthAssessmentDialog = ({ open, handleClose }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState(null);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleUrlInput = (event) => {
    const url = event.target.value;
    setImageUrl(url);
    setPreview(url);
    setAssessmentResult(null);
  };

  const getBase64FromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleImageUpload = async () => {
    if (!imageUrl) {
      enqueueSnackbar('Please enter an image URL first.', { variant: 'warning' });
      return;
    }

    setLoading(true);
    setError(null);

    let latitude = 49.207;
    let longitude = 16.608;

    const sendAssessmentRequest = async (lat, lng, base64Image) => {
      try {
        const payload = {
          images: [base64Image],
          latitude: lat,
          longitude: lng,
          similar_images: true
        };

        const response = await axios.post('http://localhost:3001/api/health-assessment', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        setAssessmentResult(response.data);
        enqueueSnackbar('Health assessment completed!', { variant: 'success' });
      } catch (error) {
        console.error('Assessment error:', error);
        setError(error.response?.data?.error || 'Assessment failed');
        enqueueSnackbar('Assessment failed', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    try {
      const base64Image = await getBase64FromUrl(imageUrl);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          sendAssessmentRequest(position.coords.latitude, position.coords.longitude, base64Image);
        },
        (geoError) => {
          console.warn('Geolocation error, using default:', geoError);
          enqueueSnackbar('Geolocation failed. Using default location.', { variant: 'info' });
          sendAssessmentRequest(latitude, longitude, base64Image);
        },
        { timeout: 5000 }
      );
    } catch (e) {
      console.error('Image conversion failed:', e);
      setLoading(false);
      enqueueSnackbar('Image conversion failed. Try another image.', { variant: 'error' });
    }
  };

  const getHealthStatus = () => {
    if (!assessmentResult?.result?.is_healthy) return 'Unknown';
    const { binary, probability } = assessmentResult.result.is_healthy;
    return `${binary ? 'Healthy' : 'Unhealthy'} (${(probability * 100).toFixed(1)}% confidence)`;
  };

  const getHealthColor = () => {
    if (!assessmentResult?.result?.is_healthy) return 'default';
    return assessmentResult.result.is_healthy.binary ? 'success' : 'error';
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Plant Health Assessment</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Enter Image URL"
            variant="outlined"
            fullWidth
            value={imageUrl}
            onChange={handleUrlInput}
            disabled={loading}
          />
        </Box>

        {preview && (
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Paper elevation={3} sx={{ p: 1, display: 'inline-block' }}>
              <img
                src={preview}
                alt="Plant Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  borderRadius: '4px'
                }}
              />
            </Paper>
          </Box>
        )}

        {loading && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <CircularProgress size={60} />
            <Typography variant="body1" sx={{ mt: 2 }}>Analyzing plant health...</Typography>
          </Box>
        )}

        {assessmentResult && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Chip
                label={getHealthStatus()}
                color={getHealthColor()}
                size="large"
                sx={{ fontSize: '1rem', p: 2 }}
              />
            </Box>

            {assessmentResult.result?.question && (
              <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Follow-up Question
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {assessmentResult.result.question.text}
                </Typography>
              </Paper>
            )}

            {assessmentResult.result?.disease?.suggestions?.length > 0 && (
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Possible Issues</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {assessmentResult.result.disease.suggestions.map((disease, index) => (
                      <React.Fragment key={disease.id}>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={`${index + 1}. ${disease.name}`}
                            secondary={
                              <>
                                <Typography component="span" variant="body2" color="text.primary">
                                  Probability: {(disease.probability * 100).toFixed(1)}%
                                </Typography>
                                {disease.similar_images?.length > 0 && (
                                  <Box sx={{ mt: 1 }}>
                                    <Typography variant="subtitle2">Similar Cases:</Typography>
                                    <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', py: 1 }}>
                                      {disease.similar_images.map((img, imgIndex) => (
                                        <img
                                          key={imgIndex}
                                          src={img.url_small}
                                          alt={`Similar case ${imgIndex + 1}`}
                                          style={{ height: '80px', borderRadius: '4px' }}
                                        />
                                      ))}
                                    </Box>
                                  </Box>
                                )}
                              </>
                            }
                          />
                        </ListItem>
                        {index < assessmentResult.result.disease.suggestions.length - 1 && (
                          <Divider component="li" />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" disabled={loading}>
          Close
        </Button>
        <Button
          onClick={handleImageUpload}
          color="primary"
          disabled={!imageUrl || loading}
          variant="contained"
        >
          {loading ? 'Analyzing...' : 'Analyze Plant'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HealthAssessmentDialog;
