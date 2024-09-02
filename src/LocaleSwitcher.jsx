import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import localizationMessages from "./data/localizationMessages";
const PREFIX = "LocaleSwitcher";

const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
};

const StyledDiv = styled("div")(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: "flex",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    paddingRight: theme.spacing(4),
    justifyContent: "flex-end",
  },
  [`& .${classes.text}`]: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
}));

export const LocaleSwitcher = ({ currentLocale, onLocaleChange }) => {
  const languageLabel = currentLocale === "pl-PL" ? "Język:" : "Language:";

  return (
    <StyledDiv className={classes.container}>
      <div className={classes.text}>{languageLabel}</div>
      <TextField
        select
        variant="standard"
        value={currentLocale}
        onChange={onLocaleChange}
      >
        <MenuItem value="pl-PL">Polski</MenuItem>
        <MenuItem value="en-US">English</MenuItem>
      </TextField>
    </StyledDiv>
  );
};

export const getMessages = (locale) => localizationMessages[locale];
