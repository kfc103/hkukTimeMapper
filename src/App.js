import "./styles.css";
import BasicTable from "./BasicTable";
import Typography from "@mui/material//Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/kfc103/hkukTimezoner">
        Timezoner
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
        <CssBaseline />
        <BasicTable />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800]
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">HK-UK Timezoner by Aidan C</Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </div>
  );
}
