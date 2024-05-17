import React, { useState, MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  Link,
} from "@mui/material";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';

const useStyles = {
  linkStyle: {
    alignSelf: "center",
    color: "#000",
    "&:hover, &:focus": {
      color: "#FF0000",
    },
  },}

const NavDrawer: React.FC = () => {

  // Menu Handle
  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null); 
  const openMenu = (event:MouseEvent<HTMLElement>) => {
    setAnchorNav(event.currentTarget);
  }

  const closeMenu = () => {
    setAnchorNav(null);
  }

  return (
    <div>
      <IconButton onClick={openMenu}>
        <MenuOpenRoundedIcon/>
      </IconButton>
      <Menu anchorEl={anchorNav} open={Boolean(anchorNav)} onClose={closeMenu} sx={{display:{xs:'flex', md:'none'}}}>
        <MenuList>
          <MenuItem component={Link} href="/"> <Typography variant="h6" children="Home" /></MenuItem>
          <MenuItem component={Link} href="/find" > <Typography variant="h6" children="Find a Spot" /> </MenuItem>
          <MenuItem component={Link} href="/watch" > <Typography variant="h6" children="Watch Live" /> </MenuItem>
          <MenuItem component={Link} href="/about" > <Typography variant="h6" children="About" /> </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default NavDrawer;
