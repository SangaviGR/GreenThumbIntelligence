import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useMutation } from "@apollo/client";
import { ADD_PLANT_HISTORY } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "../../index.css";
import AddCommentIcon from '@mui/icons-material/AddComment';


const styles = {
  formContainer: {
    width: '100%',
    mt: '10px',
    p: 2,
    border: '1px dashed #64dd20',
    borderRadius: 1
  },
  textField: {
    width: '100%',
    mb: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: 1
    }
  }
}

const PlantHistoryForm = ({ plantId }) => {
  const [addPlantHistory, { error }] = useMutation(ADD_PLANT_HISTORY);
  const [noteBody, setNoteBody] = useState("");

  const handleChange = (event) => {
    setNoteBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await addPlantHistory({
        variables: { plantId, noteBody },
      });
      Auth.loggedIn();
      setNoteBody("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Grid
        item
        container
        component="form"
        onSubmit={handleSubmit}
        width='100%'
        noValidate
        autoComplete="off"
      >
        <Paper sx={styles.formContainer} elevation={6}>
          <TextField
            item
            sx={styles.textField}
            onChange={handleChange}
            id="noteBody"
            name="noteBody"
            value={noteBody}
            label="Enter New Plant History Item"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mb: 2, width: "auto" }}
          >
            <AddCommentIcon sx={{fontSize: 'medium', mr:'5px'}}/>
            Add Entry
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default PlantHistoryForm;
