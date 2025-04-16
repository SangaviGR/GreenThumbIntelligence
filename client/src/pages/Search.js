import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Paper,
  Chip,
  Stack,
  Divider,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SpaIcon from '@mui/icons-material/Spa';
import InfoIcon from '@mui/icons-material/Info';

const Search = () => {
  const theme = useTheme(); // Get the current theme
  const [searchInput, setSearchInput] = useState('');
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPlant = async () => {
    if (!searchInput.trim()) {
      setPlantData(null);
      setError('Please enter a plant name');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/plant-info?name=${encodeURIComponent(searchInput)}`
      );
      setPlantData(response.data);
    } catch (error) {
      console.error('Error fetching plant info:', error);
      setError('Failed to fetch plant information. Please try again.');
      setPlantData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPlant();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'background.default',
        p: { xs: 2, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Search Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          width: '100%',
          maxWidth: '800px',
          bgcolor: 'background.paper'
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3,
            color: 'primary.main'
          }}
        >
          <SpaIcon color="inherit" sx={{ mr: 1 }} />
          Plant Finder
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              label="Search for plants..."
              variant="outlined"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={searchPlant}
              size="large"
              startIcon={<SearchIcon />}
              sx={{
                height: '56px',
                borderRadius: 1,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  bgcolor: 'primary.dark'
                }
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Results Section */}
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        {loading ? (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress size={60} color="primary" />
          </Box>
        ) : error ? (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              bgcolor: 'error.light',
              borderRadius: 2
            }}
          >
            <Typography color="error">{error}</Typography>
          </Paper>
        ) : plantData ? (
          <Card sx={{ 
            borderRadius: 2, 
            overflow: 'hidden',
            boxShadow: 3,
            bgcolor: 'background.paper'
          }}>
            <Grid container>
              <Grid item xs={12} md={5}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={plantData.image?.value || '/plant-placeholder.jpg'}
                  alt={plantData.name}
                  sx={{ 
                    height: { xs: '300px', md: '100%' }, 
                    objectFit: 'cover' 
                  }}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h4" gutterBottom color="primary">
                    {plantData.name}
                  </Typography>
                  
                  {plantData.common_names?.length > 0 && (
                    <Stack 
                      direction="row" 
                      spacing={1} 
                      sx={{ 
                        mb: 2, 
                        flexWrap: 'wrap', 
                        gap: 1 
                      }}
                    >
                      {plantData.common_names.map((name, index) => (
                        <Chip 
                          key={index} 
                          label={name} 
                          size="small" 
                          color="secondary"
                        />
                      ))}
                    </Stack>
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body1" paragraph>
                    {plantData.description?.value || 'No description available.'}
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    <Typography 
                      variant="subtitle1" 
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <InfoIcon color="primary" sx={{ mr: 1 }} />
                      Taxonomy
                    </Typography>
                    <Grid container spacing={2}>
                      {Object.entries(plantData.taxonomy || {}).map(([key, value]) => (
                        <Grid item xs={6} sm={4} key={key}>
                          <Typography variant="body2">
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {plantData.url && (
                    <Button
                      variant="contained"
                      color="secondary"
                      href={plantData.url}
                      target="_blank"
                      rel="noreferrer"
                      sx={{ mt: 3 }}
                    >
                      More Information
                    </Button>
                  )}
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ) : (
          searchInput && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'background.paper'
              }}
            >
              <Typography variant="body1">
                No results found for <strong>"{searchInput}"</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try a different plant name or check the spelling
              </Typography>
            </Paper>
          )
        )}
      </Box>
    </Box>
  );
};

export default Search;