import React, { useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { ContentCopy, CheckCircle } from "@mui/icons-material";

const CopyText = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const truncatedText =
    text.length > 14
      ? `${text.substring(0, 8)}...${text.substring(text.length - 6)}`
      : text;

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Hide the "Copied" message after 2 seconds
    });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body1" style={{ marginRight: "8px" }}>
        {truncatedText}
      </Typography>
      <Tooltip title="Copy to clipboard">
        <IconButton onClick={handleCopy} aria-label="copy">
          <ContentCopy />
        </IconButton>
      </Tooltip>
      {copied && (
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}
        >
          <CheckCircle color="success" style={{ marginRight: "4px" }} />
          <Typography variant="body2" color="success">
            Copied
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CopyText;
