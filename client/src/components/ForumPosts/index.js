import React from 'react';
import {
  Typography,
  Paper,
  Link,
  Avatar,
  Box,
  Chip,
  IconButton
} from '@mui/material';
import {
  Chat as ChatIcon,
  Person as PersonIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon
} from '@mui/icons-material';

const ForumPosts = ({ posts }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {posts && posts.map(post => (
        <Paper 
          key={post._id} 
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: 4
            }
          }}
        >
          {/* Post Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <PersonIcon fontSize="small" />
            </Avatar>
            <Box>
              <Link 
                href={`/profile/${post.username}`} 
                underline="hover"
                color="inherit"
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {post.username}
                </Typography>
              </Link>
              <Typography variant="caption" color="text.secondary">
                Created on {post.createdAt}
              </Typography>
            </Box>
          </Box>

          {/* Post Content */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {post.postTitle}
          </Typography>
          <Typography variant="body1" paragraph>
            {post.postText}
          </Typography>

          {/* Post Footer */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2
          }}>
            <Link 
              href={`/community/${post._id}`} 
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Chip
                icon={<ChatIcon fontSize="small" />}
                label={`${post.commentCount} comments`}
                variant="outlined"
                size="small"
                clickable
              />
            </Link>

            <Box>
              <IconButton size="small" aria-label="share">
                <ShareIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="save">
                <BookmarkIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ForumPosts;