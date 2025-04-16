import * as React from "react";
import { useState, useRef } from "react";
import axios from 'axios';  // This import is sufficient
// Destructure all the items from "@mui/material"
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

import { green } from "@mui/material/colors";
import { searchPlants } from "../../utils/API"; // Assuming this function handles the API call to identify plants
import { useMutation } from "@apollo/client";
import { ME } from "../../utils/queries";
import { ADD_PLANT } from "../../utils/mutations";

export default function AddPlantDialog({ open, handleClose }) {
  // Loading bar items
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();

  // Loading icon useEffect
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  // Starts timer for loading icon
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 6000);
    }
  };

  // Plant search setup
  const plantFile = useRef();

  // Set form state with the plant prop information
  const [formState, setFormState] = useState({
    commonName: '',
    scientificName: '',
    imagePath: '',
    description: '',
    usdaZone: '',
    fertilization: '',
    water: '',
    pruning: ''
  });

  // Deconstruct for convenience
  const { scientificName, commonName, imagePath, description, usdaZone, fertilization, water, pruning } = formState;

  const [plantImg, setPlantImg] = useState([]);
  // Upload plant file
  const onFileChange = (event) => {
    setPlantImg(event.target.files);
  };

  // Send plant file to API
  const handleSearch = async () => {
    // Ensure a valid common name is provided
    if (!commonName) {
      console.error("Please enter a common name.");
      return;
    }
  
    try {
      // Make a GET request to the API with the plant name
      const response = await axios.get(`http://localhost:3001/api/plant-info?name=${encodeURIComponent(commonName)}`);
  
      // Extract plant details from the API response
      const plantDetails = response.data;
  
      // Set the form state with the retrieved plant data
      setFormState({
        ...formState,
        commonName: plantDetails.common_names[0],
        scientificName: plantDetails.synonyms[0],  // You can choose the most relevant synonym if needed
        imagePath: plantDetails.image.value,
        description: plantDetails.description.value,
        usdaZone: "",  // You can add USDA zone if it's available in the response
        fertilization: "",  // Add if available
        water: plantDetails.watering.min + " to " + plantDetails.watering.max + " times per week",  // Format watering info
        pruning: "",  // Add pruning info if it's available
      });
  
      console.log(plantDetails); // Log details to verify
    } catch (error) {
      console.error("Error fetching plant details:", error);
    }
  };

  // Handle changes to the form to keep state up to date
  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const [addPlant, { error }] = useMutation(ADD_PLANT, {
    refetchQueries: [{ query: ME }],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Truncate the description to 500 characters if it exceeds the limit
    const truncatedDescription = description.length > 500 ? description.substring(0, 500) : description;
  
    try {
      const data = await addPlant({
        variables: { ...formState, description: truncatedDescription },
      });
      console.log(data);
  
      // ✅ Close the dialog if mutation is successful
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };
  

  return (
    <div>
      <Dialog align="center" open={open} onClose={handleClose}>
        <DialogTitle>Add a New Plant</DialogTitle>

        <DialogContent>
          <div>
            <label>Upload an image to identify a new plant!</label>
            <input
              ref={plantFile}
              type="file"
              onChange={onFileChange}
              multiple
            />

            <DialogActions align="center">
              <Button
                variant="contained"
                onClick={() => {
                  handleSearch(); // Identify plant when button is clicked
                  handleButtonClick();
                }}
              >
                {success ? <CheckIcon /> : <SaveIcon />}
                Identify Plant
              </Button>
              {loading && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: -6,
                    left: -6,
                    zIndex: 1,
                    marginTop: 8,
                    marginLeft: 3,
                  }}
                />
              )}
            </DialogActions>
          </div>
        </DialogContent>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Common Plant Name"
            type="text"
            name="commonName"
            fullWidth
            variant="standard"
            value={commonName || ""}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Scientific Plant Name"
            type="text"
            name="scientificName"
            fullWidth
            variant="standard"
            value={scientificName || ""}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Plant Image Path"
            name="imagePath"
            type="text"
            fullWidth
            variant="standard"
            value={imagePath}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Plant Description"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="usdaZone"
            label="USDA Zone"
            type="text"
            fullWidth
            variant="standard"
            value={usdaZone || ""}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Pruning Info"
            name="pruning"
            type="text"
            fullWidth
            variant="standard"
            value={pruning}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Watering Info"
            name="water"
            type="text"
            fullWidth
            variant="standard"
            value={water}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Fertilizing Info"
            name="fertilization"
            type="text"
            fullWidth
            variant="standard"
            value={fertilization}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outlined" onClick={handleSubmit}>
            Add Plant
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
