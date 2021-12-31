import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import cityTimezones from "city-timezones";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import PublicIcon from "@mui/icons-material/Public";
import moment from "moment-timezone";
import { update } from "../Storage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TimezoneFinder(props) {
  const { db, timezone, name, code, setTimezone } = props;
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [cityLookup, setCityLookup] = React.useState(
    cityTimezones.findFromCityStateProvince(input)
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setInput("");
    setCityLookup([]);
    setOpen(false);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    setCityLookup(cityTimezones.findFromCityStateProvince(e.target.value));
  };

  const handleTimezoneSelect = (item) => {
    update(db, item, timezone);
    setTimezone(item);
    handleClose();
  };

  const sortBy = (a, b) => {
    let x = a.city.toLowerCase();
    let y = b.city.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Button fullWidth onClick={handleClickOpen}>
        <img
          loading="lazy"
          width="20"
          src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
          alt=""
        />
        &nbsp;
        {name}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <TextField
              label="Enter a place"
              value={input}
              onChange={handleInput}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PublicIcon />
                  </InputAdornment>
                )
              }}
              fullWidth
            />
          </Toolbar>
        </AppBar>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {cityLookup.length >= 20
            ? "Too many result"
            : cityLookup.length === 0
            ? "No result found"
            : cityLookup.sort(sortBy).map((item) => {
                return (
                  <React.Fragment>
                    <ListItem
                      alignItems="flex-start"
                      onClick={() => handleTimezoneSelect(item)}
                    >
                      <ListItemAvatar>
                        <Avatar
                          loading="lazy"
                          src={`https://flagcdn.com/w80/${item.iso2.toLowerCase()}.png`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.city}
                        secondary={
                          <React.Fragment>
                            <Box
                              sx={{
                                display: "flex",
                                bgcolor: "background.paper"
                              }}
                            >
                              <Typography
                                sx={{ flexGrow: 1 }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {item.province && item.province + ", "}
                                {item.country}
                              </Typography>
                              {moment.tz(item.timezone).format("Z")}
                            </Box>
                          </React.Fragment>
                        }
                        secondaryAction={<div>a</div>}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })}
        </List>
      </Dialog>
    </div>
  );
}
