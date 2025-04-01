// import React from "react";
// import { Container, ImageList, ImageListItem, Link } from "@mui/material";
// import { advertisementData, pinkShade } from "../Constants.js";

// function AdGrid() {
//   return (
//     <div style={{ margin: "5px 0 10px 0" }}>
//       <Container maxWidth="xl">
//         <ImageList cols={2} gap={20} sx={{ marginBottom: "10px" }}>
//           {advertisementData.map((item, itemIndex) => (
//             <ImageListItem
//               key={itemIndex}
//               style={{ border: "2px solid #4252cb" }}
//             >
//               <img src={item.img} alt={item.title} />
//             </ImageListItem>
//           ))}
//         </ImageList>
//         <Link href="#" underline="none" color={pinkShade}>
//           Want your ad here? Click to Chat!
//         </Link>
//       </Container>
//     </div>
//   );
// }

// export default AdGrid;

import React from "react";
import {
  Container,
  ImageList,
  ImageListItem,
  Link,
  useMediaQuery,
} from "@mui/material";
import { advertisementDataBottom, pinkShade } from "../Constants.js";

function AdGridBottom() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <div style={{ margin: "15px 0 10px 0" }}>
      <Container maxWidth="xl">
        <ImageList cols={isMobile ? 1 : 2} gap={20} marginBottom={"10px"}>
          {advertisementDataBottom.map((item, itemIndex) => (
            <ImageListItem
              key={itemIndex}
              style={{ border: "2px solid #4252cb", overflow: "hidden" }}
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block" }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </a>
            </ImageListItem>
          ))}
        </ImageList>
        <Link
          href="https://t.me/icodroper"
          underline="none"
          color={pinkShade}
          fontSize={isMobile ? "12px" : "16px"}
        >
          Want your ad here? Click to Chat!
        </Link>
      </Container>
    </div>
  );
}

export default AdGridBottom;
