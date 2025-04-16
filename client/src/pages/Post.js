import React from "react";
import { QUERY_POST } from '../utils/queries';
import { useQuery } from '@apollo/client';
import PostComment from '../components/PostComment';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Paper,
  useTheme
} from '@mui/material';

const Singlepost = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: id },
  });

  const post = data?.post;

  return (
    <Box sx={{ 
      width: '100vw',
      minHeight: '100vh',
      bgcolor: 'background.default',
      p: 0,
      m: 0
    }}>
      {/* Header Section */}
      <Box textAlign="center" sx={{ pt: 4, pb: 2 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold',
            color: 'text.primary',
            mb: 1
          }}
        >
          The Green Thumb Community
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'medium',
            color: 'text.secondary'
          }}
        >
          Post Discussion
        </Typography>
      </Box>

      {/* Main Content - Full width container */}
      <Box sx={{ 
        width: '100%',
        px: { xs: 2, sm: 4, md: 8, lg: 12 },
        pb: 4
      }}>
        <Paper elevation={3} sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          width: '100%'
        }}>
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <Grid container>
              <Grid item xs={12}>
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                  <PostComment post={post} />
                </Box>
              </Grid>
            </Grid>
          )}
        </Paper>

        {/* Related Posts Suggestion */}
        {!loading && (
          <Box mt={4}>
            <Typography variant="h6" mb={2} color="text.primary">
              More Discussions You Might Like
            </Typography>
            <Paper elevation={2} sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
              width: '100%'
            }}>
              <Typography color="text.secondary">
                [Placeholder for related posts component]
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Singlepost;