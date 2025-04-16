import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  Card,
  CardContent,
  Grid,
  useTheme,
  Avatar,
  Button
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalFlorist as GardenIcon,
  HealthAndSafety as HealthIcon,
  Groups as CommunityIcon,
  Chat as ChatIcon,
  History as HistoryIcon,
  InsertPhoto as ImageIcon
} from '@mui/icons-material';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const About = () => {
  const theme = useTheme();

  const features = [
    { icon: <SearchIcon fontSize="large" />, title: "Plant Search", description: "Find detailed information about any plant by name in our comprehensive database." },
    { icon: <GardenIcon fontSize="large" />, title: "My Garden", description: "Track and manage all your plants in one convenient digital garden space." },
    { icon: <ImageIcon fontSize="large" />, title: "Health Analysis", description: "Get plant health assessments by providing image URLs of your plants." },
    { icon: <HistoryIcon fontSize="large" />, title: "Growth History", description: "Maintain complete records of your plants' development and care." },
    { icon: <CommunityIcon fontSize="large" />, title: "Plant Community", description: "Connect with fellow plant enthusiasts and gardening experts." },
    { icon: <ChatIcon fontSize="large" />, title: "Interactive Forum", description: "Share knowledge, ask questions, and learn from the community." }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Animated Hero Section */}
      <Box 
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          pt: 8,
          pb: 6,
          textAlign: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText'
        }}
      >
        <Avatar 
          component={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          sx={{ 
            width: 100, 
            height: 100,
            mb: 3,
            mx: 'auto',
            bgcolor: 'background.paper',
            color: 'primary.main'
          }}
        >
          <GardenIcon sx={{ fontSize: 50 }} />
        </Avatar>
        <Typography 
          component={motion.h1}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          variant="h2" 
          sx={{ fontWeight: 700, mb: 2 }}
        >
          Green Thumb Intelligence
        </Typography>
        <Typography 
          component={motion.p}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          variant="h5"
          sx={{ maxWidth: 800, mx: 'auto' }}
        >
          Your digital companion for smarter plant care
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* About Section with Motion */}
        <Box 
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          sx={{ mb: 6 }}
        >
          <Typography 
            component={motion.h2}
            variants={itemVariants}
            variant="h3" 
            sx={{ 
              fontWeight: 600,
              mb: 4,
              textAlign: 'center'
            }}
          >
            About Our Platform
          </Typography>
          
          <Card 
            component={motion.div}
            variants={itemVariants}
            sx={{ 
              borderRadius: 3,
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[4]
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="body1" paragraph fontSize="1.1rem">
                Green Thumb Intelligence combines plant identification technology with a vibrant gardening community. Our platform helps you discover plant information, track your garden's progress, and connect with fellow plant enthusiasts.
              </Typography>
              <Typography variant="body1" paragraph fontSize="1.1rem">
                While we continue to enhance our features, you can currently search for plants by name, assess plant health via image URLs, maintain your digital garden, and participate in our growing community.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Features Section with Staggered Animation */}
        <Box 
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          sx={{ mb: 6 }}
        >
          <Typography 
            component={motion.h2}
            variants={itemVariants}
            variant="h3" 
            sx={{ 
              fontWeight: 600,
              mb: 4,
              textAlign: 'center'
            }}
          >
            Key Features
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid 
                item 
                xs={12} 
                md={6} 
                lg={4} 
                key={index}
                component={motion.div}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  boxShadow: theme.shadows[2],
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: theme.shadows[6]
                  }
                }}>
                  <Avatar sx={{ 
                    bgcolor: 'primary.main', 
                    width: 60, 
                    height: 60,
                    mb: 3
                  }}>
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section with Motion */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          textAlign="center" 
          mt={8}
        >
          <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
            Ready to grow your plant knowledge?
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            Join our community of passionate plant lovers
          </Typography>
          <Button 
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained" 
            size="large" 
            color="primary"
            sx={{ 
              px: 6, 
              py: 1.5, 
              fontSize: '1.1rem',
              borderRadius: 2
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;