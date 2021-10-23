import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    // color: "white",
    background: "linear-gradient(to right, #373368, #373368)",
    backgroundRepeat: "no-repeat",
    transition: "background-size 1s 0s",
    transform: "perspective(1px) translateZ(0)",
    position: "relative",
    transition: "color 0.3s",
    "&:hover": {
      color: "black",
      "& $linkIcon": {
        color: "#373368",
      },
      "& $linkText": {
        color: "#373368",
      },
    },
    "&:focus": {
      backgroundColor: "white",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      zIndex: "-1",
      background: "white",
      transform: "scaleX(0)",
      transformOrigin: "0 50%;",
      transition: "transform 0.3s ease-out",
    },
    "&:hover:before": {
      transform: "scaleX(1)",
    },
  },
  externalLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  },
  linkActive: {
    background: "white",
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: "white",
    },
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
    color: "white",
  },
  linkIconActive: {
    // color: theme.palette.primary.main,
    color: "#373368",
  },
  linkText: {
    padding: 0,
    color: "white",
    // color: theme.palette.text.secondary + "CC",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
  },
  linkTextActive: {
    color: "#373368",
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));
