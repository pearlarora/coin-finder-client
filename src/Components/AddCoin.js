import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Select,
  MenuItem,
  Menu,
  InputLabel,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  useMediaQuery,
} from "@mui/material";
// import {
//   LocalizationProvider,
//   DatePicker,
//   AdapterDayjs,
// } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  darker,
  greyish,
  tertiary,
  primary,
  lighter,
  base_url,
} from "../Constants.js";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getDownloadURL, uploadBytes } from "@firebase/storage";

const AddCoin = ({ handleClose }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [newCoin, setNewCoin] = useState({
    logo: null,
    name: "",
    symbol: "",
    network: "",
    projectInPresale: false,
    presaleStartDate: null,
    presaleEndDate: null,
    launchDateKnown: false,
    launchDate: null,
    address: "",
    description: "",
    website: "",
    telegram: "",
    twitter: "",
    discord: "",
    email: "",
    telegramContact: "",
    marketCapUsd: null,
    hours24: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCoin({
      ...newCoin,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("here file: " + file.name);
    setNewCoin({ ...newCoin, logo: file });
  };
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = storage.ref();
  //   const logoRef = storageRef.child(`logos/${file.name}`);

  //   logoRef.put(file).then((snapshot) => {
  //     console.log("File uploaded successfully");
  //     snapshot.ref.getDownloadURL().then((downloadURL) => {
  //       setNewCoin({ ...newCoin, logoURL: downloadURL });
  //     });
  //   });
  // };

  const handlePresaleToggle = () => {
    setNewCoin({ ...newCoin, projectInPresale: !newCoin.projectInPresale });
  };
  const handleStartDateChange = (date) => {
    console.log("handle start date change: ", date);
    setNewCoin({ ...newCoin, presaleStartDate: date });
  };
  const handleEndDateChange = (date) => {
    console.log("handle end date change: ", date);
    setNewCoin({ ...newCoin, presaleEndDate: date });
  };

  const handleLaunchDateToggle = () => {
    setNewCoin({ ...newCoin, launchDateKnown: !newCoin.launchDateKnown });
  };
  const handleLaunchDateChange = (date) => {
    console.log("handle launch date change: ", date);
    setNewCoin({ ...newCoin, launchDate: date });
  };
  useEffect(() => {
    console.log("Updated newCoin:", newCoin);
  }, [newCoin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", newCoin);
    // console.log("logo?" + newCoin.logo.name);
    try {
      const response = await axios.get(
        `https://api.geckoterminal.com/api/v2/search/pools?query=${newCoin.address}`
      );
      if (response.data && response.data.data.length > 0) {
        const responseData = response.data.data[0]?.attributes;
        const marketCapUsd = responseData?.market_cap_usd;
        console.log("hello1: " + marketCapUsd);
        const hours24 = responseData?.price_change_percentage?.h24;
        console.log("hello2: " + hours24);

        // const storageRef = firebase.storage().ref();
        // const logoRef = storageRef.child(`coinIcons/${newCoin.logo.name}`);
        // await logoRef.put(newCoin.logo);
        // const logoURL = await logoRef.getDownloadURL();
        // const storageRef = ref(storage, `coinIcons/${newCoin.logo.name}`);
        // await uploadBytes(storageRef, newCoin.logo);
        // const logoURL = await getDownloadURL(storageRef);

        setNewCoin({
          ...newCoin,
          marketCapUsd,
          hours24,
          // logo: logoURL,
        });
      }
      console.log("hello4: " + newCoin);
      await axios.post(`${base_url}`, newCoin, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("hello5: " + newCoin);
      handleClose();

      setNewCoin({
        logo: null,
        name: "",
        symbol: "",
        network: "",
        projectInPresale: false,
        presaleStartDate: null,
        presaleEndDate: null,
        launchDateKnown: false,
        launchDate: null,
        address: "",
        description: "",
        website: "",
        telegram: "",
        twitter: "",
        discord: "",
        email: "",
        telegramContact: "",
        marketCapUsd: null,
        hours24: "",
      });

      console.log("hello6: " + newCoin);
      alert(
        "Coin added successfully! \nThe coin will be reviewed and added to the list in 2-3 business days."
      );
      // } else {
      //   // If response doesn't contain data, show error alert
      //   alert("No data found for the provided address.");
      // }
    } catch (err) {
      console.log(err);
      alert("Failed to add coin. Please try again.");
    }
  };

  return (
    <div style={{ paddingTop: "40px", overflowY: "auto", maxHeight: "80vh" }}>
      <Container maxWidth="xl">
        <form onSubmit={handleSubmit} action="post">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={5.5} lg={4} xl={3}>
                  {newCoin.logo ? (
                    <div>
                      <img
                        src={URL.createObjectURL(newCoin.logo)}
                        alt="Logo Preview"
                        style={{
                          maxHeight: "126px",
                          maxWidth: "145px",
                          boxShadow: `0 2px 5px ${primary}`,
                          marginRight: "10px",
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="logo-upload">
                        <Button
                          component="span"
                          sx={{
                            border: "1.5px solid",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            maxWidth: "145px",
                            height: "126px",
                            marginRight: "10px",
                          }}
                        >
                          <FileUploadIcon />
                          <p style={{ textAlign: "center" }}>
                            Upload
                            <br />
                            Logo*
                          </p>
                        </Button>
                        <p
                          style={{
                            fontSize: "10px",
                            marginTop: "4px",
                            color: lighter,
                          }}
                        >
                          FileName: CoinName
                        </p>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        // style={{ display: "none" }}
                        style={{
                          position: "absolute",
                          width: "180px",
                          height: "1px",
                          padding: 0,
                          margin: "-1px",
                          overflow: "hidden",
                          clip: "rect(0, 0, 0, 0)",
                          border: 0,
                        }}
                        id="logo-upload"
                        name="logo"
                        required
                      />

                      {/* <label htmlFor="logo-upload">
                        <Button
                          component="span"
                          sx={{
                            border: "1.5px solid",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            maxWidth: "145px",
                            height: "145px",
                            marginRight: "10px",
                          }}
                        >
                          <FileUploadIcon />
                          <p style={{ textAlign: "center" }}>
                            Upload
                            <br />
                            Logo
                          </p>
                        </Button>
                        <p
                          style={{
                            fontSize: "10px",
                            marginTop: "4px",
                            color: lighter,
                          }}
                        >
                          FileName: CoinName
                        </p>
                      </label> */}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6.5} lg={8} xl={9}>
                  <TextField
                    label="Name"
                    placeholder="Ethereum"
                    name="name"
                    value={newCoin.name}
                    onChange={handleChange}
                    variant="filled"
                    fullWidth
                    required
                    size="small"
                  />
                  <TextField
                    label="Symbol"
                    placeholder="ETH"
                    name="symbol"
                    value={newCoin.symbol}
                    onChange={handleChange}
                    variant="filled"
                    fullWidth
                    required
                    size="small"
                    sx={{ marginTop: "30px" }}
                  />
                </Grid>
              </Grid>
              <TextField
                select
                label="Network"
                name="network"
                value={newCoin.network}
                onChange={handleChange}
                variant="filled"
                fullWidth
                required
                size="small"
                sx={{ marginTop: "15px" }}
              >
                <MenuItem value="BSC">Binance (BSC)</MenuItem>
                <MenuItem value="ETH">
                  Ethereum (ETH)
                </MenuItem>
                <MenuItem value="MATIC">Polygon (MATIC)</MenuItem>
                <MenuItem value="SOL">Solana (SOL)</MenuItem>
                <MenuItem value="FTM">Fantom (FTM)</MenuItem>
                <MenuItem value="TRX">Tron (TRX)</MenuItem>
                <MenuItem value="BASE">Base (BASE)</MenuItem>
                <MenuItem value="OTHER">Other (OTHER)</MenuItem>
              </TextField>
              <FormControlLabel
                label="Project In Presale?"
                labelPlacement="start"
                control={
                  <Switch
                    checked={newCoin.projectInPresale}
                    onChange={handlePresaleToggle}
                    name="projectInPresale"
                    color="primary"
                    size="small"
                  />
                }
                sx={{ marginTop: "20px" }}
              />
              {newCoin.projectInPresale && (
                <Grid container spacing={2} sx={{ marginBottom: "-20px" }}>
                  <Grid item xs={12} md={6} lg={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Start Date"
                        value={newCoin.presaleStartDate}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="End Date"
                        value={newCoin.presaleEndDate}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              )}
              <br />
              <FormControlLabel
                label="Launch Date Available?"
                labelPlacement="start"
                control={
                  <Switch
                    checked={newCoin.launchDateKnown}
                    onChange={handleLaunchDateToggle}
                    name="launchDateKnown"
                    color="primary"
                    size="small"
                  />
                }
                sx={{ marginTop: "10px" }}
              />
              {newCoin.launchDateKnown && (
                <Grid container>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Launch Date"
                      value={newCoin.launchDate}
                      onChange={handleLaunchDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              )}
              <TextField
                label="Address"
                placeholder="0x000..."
                name="address"
                value={newCoin.address}
                onChange={handleChange}
                variant="filled"
                fullWidth
                required
                sx={{ marginTop: "30px" }}
              />
              <TextField
                multiline
                rows={3}
                label="Description"
                placeholder="Describe your project"
                name="description"
                value={newCoin.description}
                onChange={handleChange}
                variant="filled"
                fullWidth
                required
                sx={{ marginTop: "30px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Website"
                name="website"
                value={newCoin.website}
                onChange={handleChange}
                variant="filled"
                fullWidth
                required
              />
              <TextField
                label="Telegram"
                name="telegram"
                value={newCoin.telegram}
                onChange={handleChange}
                variant="filled"
                fullWidth
                required
                sx={{ marginTop: "30px" }}
              />
              <TextField
                label="Twitter"
                name="twitter"
                value={newCoin.twitter}
                onChange={handleChange}
                variant="filled"
                fullWidth
                sx={{ marginTop: "30px" }}
              />
              <TextField
                label="Discord"
                name="discord"
                value={newCoin.discord}
                onChange={handleChange}
                variant="filled"
                fullWidth
                sx={{ marginTop: "30px" }}
              />
              <Divider
                style={{
                  marginTop: "35px",
                  marginBottom: "-5px",
                }}
              >
                <Chip label="Contact Details" />
              </Divider>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={newCoin.email}
                onChange={handleChange}
                variant="filled"
                fullWidth
                required
                sx={{ marginTop: "30px" }}
              />
              <TextField
                label="Telegram Contact"
                helperText="In case of any issues in the form, you will be contacted on this telegram account."
                name="telegramContact"
                value={newCoin.telegramContact}
                onChange={handleChange}
                variant="filled"
                fullWidth
                required
                sx={{ marginTop: "30px" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  color="tertiary"
                  style={{ marginRight: "10px", color: "white" }}
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </div>
            </Grid>
          </Grid>
          {/* <Button type="submit" variant="contained">
            Submit
          </Button> */}
        </form>
      </Container>
    </div>
  );
};

export default AddCoin;
