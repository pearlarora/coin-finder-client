// import React from "react";

// const GraphWidget = ({ link }) => {
//   return (
//     <iframe
//       id="dextools-widget"
//       title="DEXTools Trading Chart"
//       width="500"
//       height="400"
//       src={link}
//     ></iframe>
//   );
// };

// export default GraphWidget;

import React from "react";

const GraphWidget = ({ coin }) => {
  return (
    <div>
      <p>
        To view the Trading Chart for {coin.name}, please visit the following
        link:
      </p>
      <a href={coin.link} target="_blank" rel="noopener noreferrer">
        View {coin.name} Trading Chart
      </a>
    </div>
  );
};

export default GraphWidget;
