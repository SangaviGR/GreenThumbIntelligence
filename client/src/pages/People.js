import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Typography,
  CircularProgress,
  Paper,
  InputAdornment,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { QUERY_ALL_USERS, SEARCH_USER_QUERY } from '../utils/queries';

const People = () => {
  const theme = useTheme();
  const [searchInput, setSearchInput] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState([]);
  
  const { loading: allLoading, data: allData } = useQuery(QUERY_ALL_USERS);
  const [searchUser, { loading: searchLoading, data: searchData }] = useLazyQuery(SEARCH_USER_QUERY);

  useEffect(() => {
    if (searchData?.getUsers?.users) {
      setDisplayedUsers(searchData.getUsers.users);
    } else if (allData?.users) {
      setDisplayedUsers(allData.users);
    }
  }, [allData, searchData]);

  const handleSearch = () => {
    if (searchInput.trim()) {
      searchUser({ variables: { search: searchInput } });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (allLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      p: { xs: 2, md: 4 },
      bgcolor: 'background.default'
    }}>
      {/* Search Header */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
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
          <PeopleIcon sx={{ mr: 2 }} />
          Find People
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              label="Search by username or name"
              variant="outlined"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSearch}
              size="large"
              sx={{
                height: '56px',
                borderRadius: 1,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                }
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Results Section */}
      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper'
        }}
      >
        {searchLoading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : displayedUsers.length > 0 ? (
          <List disablePadding>
            {displayedUsers.map((user, index) => (
              <React.Fragment key={user._id}>
                <ListItem 
                  component={Link}
                  to={`/profile/${user.username}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'text.primary',
                    px: 3,
                    py: 2,
                    '&:hover': {
                      bgcolor: 'action.hover'
                    },
                    transition: 'background-color 0.2s'
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1" fontWeight="medium">
                        {user.username}
                      </Typography>
                    }
                    secondary={
                      user.firstName && user.lastName 
                        ? `${user.firstName} ${user.lastName}`
                        : 'No name provided'
                    }
                  />
                </ListItem>
                {index < displayedUsers.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box p={4} textAlign="center">
            <Typography variant="body1" color="text.secondary">
              {searchInput 
                ? `No users found for "${searchInput}"`
                : 'No users available'}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default People;