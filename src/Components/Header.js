// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
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
//   boxShadow: `0 2px 10px ${darker}`,
// };

// function Header() {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [open, setOpen] = useState(false);
//   const [address, setAddress] = useState("");

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://api.geckoterminal.com/api/v2/search/pools?query=${searchQuery}`
//         );
//         const responseData = await response.json();
//         if (responseData && responseData.data && responseData.data.length > 0) {
//           const firstResult = responseData.data[0];
//           const address = firstResult.attributes?.address;
//           if (address) {
//             console.log(address);
//             setAddress(address);
//           } else {
//             alert("No matching data found");
//           }
//         } else {
//           alert("No matching data found");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         alert("Failed to search. Please try again.");
//       }
//     };

//     if (searchQuery) {
//       fetchData();
//     }
//   }, [searchQuery]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery) {
//       navigate(`/search/${address}`);
//     } else {
//       alert("Please enter a search query.");
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
//             height: "70px",
//           }}
//         >
//           <Typography
//             onClick={() => navigate("/")}
//             style={{
//               fontWeight: "bold",
//               fontSize: "1.3rem",
//               cursor: "pointer",
//               marginTop: "10px",
//               color: "white",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <img
//               src={websiteLogo}
//               alt={website_name}
//               style={{ height: "40px" }}
//             />
//             &nbsp;{website_name}
//           </Typography>
//           <form style={{ display: "flex", gap: 5 }}>
//             <TextField
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               label="Search"
//               variant="filled"
//               size="small"
//               style={{
//                 width: "20vw",
//                 backgroundColor: greyish,
//               }}
//             />
//             <IconButton
//               type="submit"
//               onClick={handleSearch}
//               color="primary"
//               aria-label="search"
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
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     color: primary,
//                   }}
//                 >
//                   <h1 style={{ textAlign: "center", fontWeight: "400" }}>
//                     Add New Coin
//                   </h1>
//                 </div>
//                 <AddCoin handleClose={handleClose} />
//               </Box>
//             </Modal>
//             <Button
//               variant="contained"
//               color="tertiary"
//               href="https://t.me/coinfinderccofficial"
//               target="_blank"
//             >
//               Advertise
//             </Button>
//           </div>
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
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search.js";
import {
  darker,
  greyish,
  primary,
  tertiary,
  website_name,
} from "../Constants.js";
import { websiteLogo } from "../Constants.js";
import AddCoin from "./AddCoin.js";

const drawerWidth = 240;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  backgroundColor: greyish,
  color: tertiary,
  padding: "50px",
  boxShadow: `0 2px 10px ${darker}`,
};

function Header(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.geckoterminal.com/api/v2/search/pools?query=${searchQuery}`
  //       );
  //       const responseData = await response.json();
  //       if (responseData && responseData.data && responseData.data.length > 0) {
  //         const firstResult = responseData.data[0];
  //         const address = firstResult.attributes?.address;
  //         if (address) {
  //           console.log(address);
  //           setAddress(address);
  //         } else {
  //           alert("No matching data found");
  //         }
  //       } else {
  //         alert("No matching data found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       alert("Failed to search. Please try again.");
  //     }
  //   };

  //   if (searchQuery) {
  //     fetchData();
  //   }
  // }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
    } else {
      alert("Please enter a search query.");
    }
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {website_name}
      </Typography>
      <Divider />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          // gap: 10,
          padding: 16,
        }}
      >
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          label="Search"
          variant="filled"
          size="small"
          style={{
            width: "100%",
            backgroundColor: greyish,
          }}
        />
        <Button
          type="submit"
          onClick={handleSearch}
          variant="contained"
          color="primary"
          style={{ marginTop: 8 }}
        >
          Search
        </Button>
      </form>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Button
            variant="contained"
            fullWidth
            onClick={handleOpen}
            sx={{ margin: 1 }}
          >
            Add Coin
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            variant="contained"
            fullWidth
            color="tertiary"
            component="a"
            href="https://t.me/icodroper"
            target="_blank"
            sx={{ margin: 1, color: "white" }}
          >
            Advertise
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div
      style={{
        borderBottom: "2px solid",
        borderColor: tertiary,
        boxShadow: "0 10px 80px #232531",
      }}
    >
      <CssBaseline />
      <AppBar color="transparent" position="static">
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "70px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Typography
              onClick={() => navigate("/")}
              sx={{
                fontWeight: "bold",
                fontSize: "1.3rem",
                cursor: "pointer",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={websiteLogo}
                alt={website_name}
                style={{ height: "40px" }}
              />
              {website_name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flex: 1,
              justifyContent: "center",
            }}
          >
            <form style={{ display: "flex", gap: 5 }} onSubmit={handleSearch}>
              <TextField
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                label="Search"
                variant="filled"
                size="small"
                sx={{
                  width: "20vw",
                  backgroundColor: greyish,
                }}
              />
              <IconButton
                type="submit"
                color="primary"
                aria-label="search"
                sx={{ marginLeft: -5 }}
              >
                <SearchIcon />
              </IconButton>
            </form>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flex: 1,
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button variant="contained" onClick={handleOpen} size="small">
              Add Coin
            </Button>
            <Button
              variant="contained"
              color="tertiary"
              href="https://t.me/icodroper"
              target="_blank"
              size="small"
            >
              Advertise
            </Button>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { sm: "none" },
              marginLeft: "auto",
              backgroundColor: "transparent",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: darker,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
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
            <h2 style={{ textAlign: "center", fontWeight: "400" }}>
              Add New Coin
            </h2>
          </div>
          <AddCoin handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}

export default Header;
