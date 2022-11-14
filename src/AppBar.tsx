import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";

function ResponsiveAppBar() {
  return (
    <AppBar position="static">
      <Box>
        <Toolbar disableGutters>
          <AutoAwesomeMosaicOutlinedIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ORGANIZAR
          </Typography>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
export default ResponsiveAppBar;
