import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ME, QUERY_USER } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';
import img from '../assets/images/igor.jpg';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Chip,Box,Button
} from '@mui/material';
import Garden from '../components/Garden';
import FriendList from '../components/FriendList';
import AddIcon from '@mui/icons-material/Add';

// Page CSS Styles
const styles = {
  pageStyle: {
    backgroundColor: 'background.default',
    minHeight: '100vh',
    width: '100%',
    p: 3
  },
  profileCard: {
    p: 4,
    mb: 4,
    borderRadius: 2,
    boxShadow: '0px 3px 10px rgba(0,0,0,0.08)'
  },
  avatar: {
    width: 160,
    height: 160,
    border: '3px solid #64dd20'
  },
  gardenSection: {
    p: 3,
    borderRadius: 2,
    boxShadow: '0px 3px 10px rgba(0,0,0,0.08)',
    mb: 3
  },
  friendSection: {
    p: 3,
    borderRadius: 2,
    boxShadow: '0px 3px 10px rgba(0,0,0,0.08)',
    height: '100%'
  }
};

const Profile = () => {

  // this handles adding a friend when you click on the add friend button
  const [addFriend, { error }] = useMutation(ADD_FRIEND);
  const handleClick = async () => {
    try {
      await addFriend({
        variables: { friendId: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  // button open/close
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // this queries the DB for user data to be displayed in the profile component return statement
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  // this checks if someone is your friend when you go to their page
  const [isfriend, setIsFriend] = useState();
  const { loading: friendLoading, data: friendData } = useQuery(ME);
  const friendCheck = friendData?.me || {};
  const { username } = useParams();
  useEffect(() => {
    if (friendCheck.friends) {
      for (let i = 0; i < friendCheck.friends.length; i++) {
        if (friendCheck.friends[i].username === username) {
          setIsFriend(true);
          console.log(isfriend);
        }
      }
    }
  });

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <Box sx={styles.pageStyle}>
      {/* Main Content Area */}
      <Box sx={styles.leftPanel}>
        <Box sx={styles.profileHeader}>
          <Avatar alt={user.username} src={img} sx={styles.avatar} />
          <Box>
            <Typography variant="h4">{user.username}</Typography>
            <Typography color="text.secondary">
              Joined: {user.createdAt}
            </Typography>
            {userParam && !isfriend && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleClick}
                sx={{ mt: 1 }}
              >
                Add Friend
              </Button>
            )}
          </Box>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          My Garden
        </Typography>
        <Garden plants={user.plants} user={user.username} />
      </Box>

      {/* Sidebar */}
      <Box sx={styles.rightPanel}>
        <Typography variant="h6" gutterBottom>
          Friends ({user.friendCount})
        </Typography>
        <FriendList
          username={user.username}
          friendCount={user.friendCount}
          friends={user.friends}
        />
      </Box>
    </Box>
  );
};

export default Profile;
