// import {
//   AppBar,
//   Button,
//   Container,
//   FormControl,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Toolbar,
//   Typography,
//   Modal,
//   Box,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search.js";
// // import CloseIcon from "@mui/icons-material/Close";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   darker,
//   greyish,
//   primary,
//   tertiary,
//   translucent,
//   website_name,
// } from "../Constants.js";
// import { websiteLogo } from "../Constants.js";
// import AddCoin from "./AddCoin.js";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "85vw",
//   bgcolor: "background.paper",
//   backgroundColor: greyish,
//   color: tertiary,
//   padding: "50px",
//   // borderRadius: "8px",
//   boxShadow: `0 2px 10px ${darker}`,
// };

// function Header() {
//   const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState("");

//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `https://api.geckoterminal.com/api/v2/search/pools?query=${searchQuery}`
//       );
//       const responseData = await response.json(); // Parse the JSON response
//       console.log(responseData);
//       if (responseData && responseData.data && responseData.data.length > 0) {
//         const firstResult = responseData.data[0];
//         console.log(firstResult);
//         const address = firstResult.attributes?.address;
//         console.log("address: ", address);
//         if (address) {
//           console.log("navigate to address");
//           navigate(`/search/${address}`);
//         } else {
//           console.log("Address not found");
//         }
//       } else {
//         alert("No matching data found");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert("Failed to search. Please try again.");
//     }
//   };

//   return (
//     <div
//       style={{
//         borderBottom: "2px solid",
//         borderColor: tertiary,
//         boxShadow: "0 10px 80px #232531",
//       }}
//     >
//       <AppBar color="transparent" position="static">
//         <Container
//           maxWidth="xl"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             height: "100px",
//           }}
//         >
//           <Typography
//             onClick={() => navigate("/")}
//             style={{
//               fontWeight: "bold",
//               fontSize: "1.8rem",
//               cursor: "pointer",
//               marginTop: "10px",
//               color: "white",
//             }}
//           >
//             <img src={websiteLogo} alt={website_name} />
//           </Typography>
//           <form style={{ display: "flex", gap: 5 }}>
//             <TextField
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               label="Search"
//               variant="filled"
//               size="small"
//               style={{ width: "20vw", backgroundColor: greyish }}
//             />
//             <IconButton
//               type="submit"
//               onClick={handleSearch}
//               color="primary"
//               aria-label="search"
//               size="large"
//               style={{ marginLeft: -55 }}
//             >
//               <SearchIcon />
//             </IconButton>
//           </form>
//           <div style={{ display: "flex", gap: 20 }}>
//             <Button variant="contained" onClick={handleOpen}>
//               Add Coin
//             </Button>
//             <Modal open={open} disableEnforceFocus>
//               <Box sx={style}>
//                 <div
//                   style={{
//                     // display: "grid",
//                     // gridTemplateColumns: "1fr auto",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     color: primary,
//                     // margin: "5px",
//                   }}
//                 >
//                   <h1 style={{ textAlign: "center", fontWeight: "400" }}>
//                     Add New Coin
//                   </h1>
//                   {/* <div>
//                     <Button
//                       variant="contained"
//                       color="tertiary"
//                       style={{ marginLeft: "10px", color: "white" }}
//                       onClick={handleClose}
//                     >
//                       Close
//                     </Button>
//                   </div> */}
//                   {/* <IconButton
//                     onClick={handleClose}
//                     size="large"
//                     color="primary"
//                     style={{ justifySelf: "end" }}
//                   >
//                     <CloseIcon fontSize="inherit" />
//                   </IconButton> */}
//                 </div>
//                 <AddCoin handleClose={handleClose} />
//               </Box>
//             </Modal>
//             <Button variant="contained" color="tertiary">
//               Advertise
//             </Button>
//           </div>
//           {/* TODO: Google Translate */}
//           {/* <div id="google_translate_element"></div> */}

//           {/* <FormControl
//             variant="filled"
//             sx={{
//               marginRight: "28px",
//               minWidth: 120,
//               backgroundColor: greyish,
//               color: primary,
//             }}
//           >
//             <InputLabel>Currency</InputLabel>
//             <Select defaultValue={"INR"} sx={{ width: 120, height: 50 }}>
//               <MenuItem value={"USD"}>USD</MenuItem>
//               <MenuItem value={"INR"}>INR</MenuItem>
//             </Select>
//           </FormControl> */}
//         </Container>
//       </AppBar>
//     </div>
//   );
// }

// export default Header;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search.js";
import {
  darker,
  greyish,
  primary,
  tertiary,
  translucent,
  website_name,
} from "../Constants.js";
import { websiteLogo } from "../Constants.js";
import AddCoin from "./AddCoin.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85vw",
  bgcolor: "background.paper",
  backgroundColor: greyish,
  color: tertiary,
  padding: "50px",
  boxShadow: `0 2px 10px ${darker}`,
};

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.geckoterminal.com/api/v2/search/pools?query=${searchQuery}`
        );
        const responseData = await response.json();
        if (responseData && responseData.data && responseData.data.length > 0) {
          const firstResult = responseData.data[0];
          const address = firstResult.attributes?.address;
          if (address) {
            console.log(address);
            setAddress(address);
          } else {
            alert("No matching data found");
          }
        } else {
          alert("No matching data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to search. Please try again.");
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search/${address}`);
    } else {
      alert("Please enter a search query.");
    }
  };

  return (
    <div
      style={{
        borderBottom: "2px solid",
        borderColor: tertiary,
        boxShadow: "0 10px 80px #232531",
      }}
    >
      <AppBar color="transparent" position="static">
        <Container
          maxWidth="xl"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100px",
          }}
        >
          <Typography
            onClick={() => navigate("/")}
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              cursor: "pointer",
              marginTop: "10px",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={websiteLogo} alt={website_name} />
            {website_name}
          </Typography>
          <form style={{ display: "flex", gap: 5 }}>
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              label="Search"
              variant="filled"
              size="small"
              style={{ width: "20vw", backgroundColor: greyish }}
            />
            <IconButton
              type="submit"
              onClick={handleSearch}
              color="primary"
              aria-label="search"
              size="large"
              style={{ marginLeft: -55 }}
            >
              <SearchIcon />
            </IconButton>
          </form>
          <div style={{ display: "flex", gap: 20 }}>
            <Button variant="contained" onClick={handleOpen}>
              Add Coin
            </Button>
            <Modal open={open} disableEnforceFocus>
              <Box sx={style}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: primary,
                  }}
                >
                  <h1 style={{ textAlign: "center", fontWeight: "400" }}>
                    Add New Coin
                  </h1>
                </div>
                <AddCoin handleClose={handleClose} />
              </Box>
            </Modal>
            <Button
              variant="contained"
              color="tertiary"
              href="https://t.me/coinfinderccofficial"
              target="_blank"
            >
              Advertise
            </Button>
          </div>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
