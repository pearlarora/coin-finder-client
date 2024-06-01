// import { Container } from "@mui/material";
// import React from "react";
// import Carousel from "react-material-ui-carousel";
// import { adLongData } from "../Constants.js";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext.js";
// import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore.js";

// function AdBanner() {
//   return (
//     <div style={{ marginTop: "40px" }}>
//       <Container maxWidth="lg">
//         <Carousel
//           NextIcon={<NavigateNextIcon />}
//           PrevIcon={<NavigateBeforeIcon />}
//           animation="fade"
//           navButtonsAlwaysVisible
//           fullHeightHover={false}
//           navButtonsProps={{
//             style: {
//               background: "rgba(0, 0, 0, 0.5)",
//               borderRadius: 0,
//             },
//           }}
//         >
//           {adLongData.map((item, index) => (
//             <div key={index}>
//               <img
//                 src={item.img}
//                 alt={item.title}
//                 style={{
//                   width: "100%",
//                   objectFit: "cover",
//                 }}
//               />
//             </div>
//           ))}
//         </Carousel>
//       </Container>
//     </div>
//   );
// }

// export default AdBanner;

import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { adLongData } from "../Constants.js";
import NavigateNextIcon from "@mui/icons-material/NavigateNext.js";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore.js";

function AdBanner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the window width is less than or equal to 600px
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const bannerStyle = isMobile
    ? {
        position: "fixed",
        bottom: -42,
        width: "105vw",
        zIndex: 1000,
        marginLeft: -40,
        // backgroundColor: "white",
      }
    : { marginTop: "40px" };

  return (
    <div style={bannerStyle}>
      <Container maxWidth="lg">
        <Carousel
          NextIcon={<NavigateNextIcon />}
          PrevIcon={<NavigateBeforeIcon />}
          animation="fade"
          navButtonsAlwaysVisible
          fullHeightHover={false}
          navButtonsProps={{
            style: {
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: 0,
            },
          }}
        >
          {adLongData.map((item, index) => (
            <div key={index}>
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}

export default AdBanner;
