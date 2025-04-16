import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  useTheme,
  Box
} from "@mui/material";
import { green } from "@mui/material/colors";
import EventNoteIcon from '@mui/icons-material/EventNote';

const PlantHistory = ({ history }) => {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ 
      borderRadius: 2,
      overflow: 'hidden',
      width: '100%'
    }}>
      {/* Header */}
      <Box sx={{ 
        bgcolor: green[600],
        color: 'white',
        p: 2,
        display: 'flex',
        alignItems: 'center'
      }}>
        <EventNoteIcon sx={{ mr: 1.5 }} />
        <Typography variant="h6" component="h3">
          Growth History
        </Typography>
      </Box>

      {/* History List */}
      <List sx={{ 
        width: '100%',
        maxHeight: 400,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '0.4em',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.mode === 'dark' ? '#555' : '#ccc',
          borderRadius: '20px'
        }
      }}>
        {history && history.length > 0 ? (
          history.map((record, index) => (
            <React.Fragment key={record._id}>
              <ListItem sx={{
                alignItems: 'flex-start',
                bgcolor: index % 2 === 0 ? 'background.default' : 'action.hover',
                p: 2
              }}>
                <Avatar sx={{ 
                  bgcolor: green[500],
                  width: 32,
                  height: 32,
                  mr: 2,
                  mt: 0.5
                }}>
                  <Typography variant="caption">
                    {index + 1}
                  </Typography>
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" color="text.primary" fontWeight={500}>
                      {record.note_body}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {record.createdAt} {/* Using the original date format */}
                    </Typography>
                  }
                  sx={{ m: 0 }}
                />
              </ListItem>
              {index < history.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))
        ) : (
          <ListItem>
            <ListItemText 
              primary={
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  No history records yet
                </Typography>
              } 
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default PlantHistory;