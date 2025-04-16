import React from "react";
import { QUERY_POSTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import ForumPosts from '../components/ForumPosts';
import NewPost from "../components/NewPost";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Grid,
  CircularProgress,
  InputAdornment,
  useTheme,Card,CardContent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Forum = () => {
  const theme = useTheme();
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      bgcolor: 'background.default',
      p: { xs: 2, md: 4 }
    }}>
      <Typography 
        variant="h4" 
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'text.primary',
          mb: 4
        }}
      >
        Community: Posts
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Posts */}
        <Grid item xs={12} md={8}>
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ 
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 2,
              boxShadow: 1
            }}>
              {!posts.length ? (
                <Typography 
                  variant="h6" 
                  textAlign="center" 
                  color="text.secondary"
                  sx={{ p: 4 }}
                >
                  Nobody has posted yet. Be first and start the party!
                </Typography>
              ) : (
                <ForumPosts posts={posts} />
              )}
            </Box>
          )}
        </Grid>

        {/* Right Column - New Post & Search */}
        <Grid item xs={12} md={4}>
          <Box sx={{ 
            position: 'sticky',
            top: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}>
            {/* New Post Section */}
            <Paper elevation={3} sx={{ 
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.paper'
            }}>
              <NewPost />
            </Paper>

            {/* Search Section */}
            <Paper elevation={3} sx={{ 
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.paper'
            }}>
              <Typography variant="h6" gutterBottom>
                Search Posts
              </Typography>
              <TextField
                fullWidth
                label="Search posts..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  }
                }}
              />
              <Button 
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Search
              </Button>
            </Paper>

            {/* Community Guidelines Card */}
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Community Guidelines
                </Typography>
                <Typography variant="body2" paragraph>
                  1. Be respectful to all members
                </Typography>
                <Typography variant="body2" paragraph>
                  2. Keep discussions plant-related
                </Typography>
                <Typography variant="body2" paragraph>
                  3. No spam or self-promotion
                </Typography>
                <Button 
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
        
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Forum;