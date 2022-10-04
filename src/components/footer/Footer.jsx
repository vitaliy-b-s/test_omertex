import styles from "./footer.module.css";

import { Button, ButtonGroup } from "@mui/material";

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <ButtonGroup>
        <Button
          style={{ borderRadius: "50px", width: "100px" }}
          variant={"contained"}
          onClick={() => props.submit()}
        >
          Save
        </Button>
        <Button
          style={{ borderRadius: "50px", width: "100px", marginLeft: "10px" }}
          variant={"outlined"}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </footer>
  );
};

export default Footer;
