import React from 'react';
import Box from '@mui/material/Box';
import Greenplant from '../../assets/images/greenplant.jpg';
import Wort from '../../assets/images/greenplant.jpg';
import PlantBg from '../../assets/images/bg.jpg'; // Add your own background image here
import './index.css';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { brown } from '@mui/material/colors';
import SpaIcon from '@mui/icons-material/Spa';
import ForumIcon from '@mui/icons-material/Forum';

const LandingHero = ({ theme }) => {
  return (
    <>
      <Box
        className="image"
        style={{
          backgroundImage: `${theme === 'light' ? `url(${Greenplant})` : `url(${Wort})`}`,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          height: '100vh',
          paddingTop: '40px',
          color: '#f5f5f5',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Outer Wrapper of Grid content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={{
              width: '100%',
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: 'serif',
              color: brown[700],
            }}
          >
            The Classic Greens
          </Typography>
          <Divider orientation="horizontal" variant="middle" flexItem />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'transparent',
              justifyContent: 'space-around',
              my: '50px',
            }}
          >
            <Box
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SpaIcon sx={{ color: brown[800], fontSize: '90px' }} />
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{
                  width: '80%',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  py: '20px',
                  fontFamily: 'serif',
                  color: brown[700],
                }}
              >
                Plant Encyclopedia
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  width: '80%',
                  textAlign: 'center',
                  px: '20px',
                  color: brown[600],
                }}
              >
                Explore an extensive database of plants, learn about their care, and add them to your virtual collection.
              </Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <ForumIcon sx={{ color: brown[800], fontSize: '90px' }} />
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{
                  width: '80%',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  py: '20px',
                  fontFamily: 'serif',
                  color: brown[700],
                }}
              >
                Community Forum
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  px: '20px',
                  color: brown[600],
                }}
              >
                Engage with fellow gardening enthusiasts, share your experiences, and gain insights from experts.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Plant ID Section with Background */}
      <Box
  sx={{
    padding: '40px',
    position: 'relative', // Set position relative for overlay
    backgroundImage: `url(${PlantBg})`, // Background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    borderRadius: '15px',
    marginTop: '30px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  }}
>
  {/* Semi-transparent overlay */}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.6)', // Light transparent white
      borderRadius: '15px',
      zIndex: 1, // Ensure overlay is on top of the background image
    }}
  />
  <Typography
    variant="h4"
    component="div"
    sx={{
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'serif',
      color: brown[700],
      position: 'relative', // Ensure text is above overlay
      zIndex: 2, // Ensure text is above overlay
    }}
  >
    About
  </Typography>
  <Typography
    gutterBottom
    sx={{
      textAlign: 'center',
      px: '20px',
      color: brown[700],
      py: '20px',
      fontSize: '16px',
      position: 'relative',
      zIndex: 2,
    }}
  >
    <strong>Plant.id</strong> is a machine learning-based service designed to help you identify a wide range of plant species, including indoor plants, wildflowers, trees, grasses, and more. By simply uploading a photo of a plant, our system uses advanced algorithms to accurately identify the species.
  </Typography>
  <Typography
    gutterBottom
    sx={{
      textAlign: 'center',
      px: '20px',
      color: brown[700],
      fontSize: '16px',
      position: 'relative',
      zIndex: 2,
    }}
  >
    In addition to plant identification, Plant.id can also assess the health of plants, detecting any diseases, pests, or vermin that may be affecting them. This feature is perfect for gardening enthusiasts, farmers, or anyone interested in maintaining healthy plants.
  </Typography>

  <Typography
    variant="h5"
    sx={{
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'serif',
      color: brown[700],
      py: '20px',
      position: 'relative',
      zIndex: 2,
    }}
  >
    Key Features:
  </Typography>
  <ul
    style={{
      listStyleType: 'none',
      padding: '0',
      textAlign: 'center',
      color: brown[700],position: 'relative', // Ensures it's inside the container
      zIndex: 2, // Ensure it's above the overlay

    }}
  >
    <li style={{ fontSize: '16px' }}>
      <strong>Plant Identification:</strong> Identify plants from images with high accuracy.
    </li>
    <li style={{ fontSize: '16px' }}>
      <strong>Health Assessment:</strong> Evaluate the health of your plants, identifying potential issues such as diseases and pests.
    </li>
    <li style={{ fontSize: '16px' }}>
      <strong>Feedback and Chatbot:</strong> Interact with a chatbot for advice and receive feedback on your plant care practices.
    </li>
    <li style={{ fontSize: '16px' }}>
      <strong>Search and Browse:</strong> Easily search for plants and view detailed information about different species.
    </li>
  </ul>

  <Typography
    variant="h5"
    sx={{
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'serif',
      color: brown[700],
      py: '20px',
      position: 'relative',
      zIndex: 2,
    }}
  >
    How It Works:
  </Typography>
  <Typography
    gutterBottom
    sx={{
      textAlign: 'center',
      px: '20px',
      color: brown[700],
      fontSize: '16px',
      position: 'relative',
      zIndex: 2,
    }}
  >
    To get started, simply upload a picture of the plant you want to identify. Our system will process the image, identify the plant species, and provide a detailed report on the plant's characteristics and health. You can also track and manage your plant collection and access useful information through our chatbot.
  </Typography>
  <Typography
    gutterBottom
    sx={{
      textAlign: 'center',
      px: '20px',
      color: brown[700],
      fontSize: '16px',
      position: 'relative',
      zIndex: 2,
    }}
  >
    For a more interactive experience, you can even get personalized plant care recommendations and advice from the chatbot, helping you ensure your plants stay healthy and vibrant.
  </Typography>
</Box>

    </>
  );
};

export default LandingHero;
