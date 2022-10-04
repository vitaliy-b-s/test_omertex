import styles from "./ipSettings.module.css";

import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { forwardRef, useState } from "react";

import { isIP } from "is-ip";

const IpSettings = forwardRef((props, ref) => {
  const SUBNET_REGEX =
    /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;

  const [ipSettings, setIpSettings] = useState({
    ipType: "automatic",
    ipAddress: "",
    subnetMask: "",
    defaultGateway: "",
  });
  const [ipError, setIpError] = useState(false);
  const [subnetError, setSubnetError] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setIpSettings((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const validateIp = (ip) => {
    if (ip === "") {
      setIpError(false);
    } else if (!isIP(ip)) {
      setIpError(true);
    } else {
      setIpError(false);
    }
  };

  const validateSubnet = (subnet) => {
    if (subnet === "") {
      setSubnetError(false);
    } else if (!subnet.match(SUBNET_REGEX)) {
      setSubnetError(true);
    } else {
      setSubnetError(false);
    }
  };

  return (
    <div>
      <RadioGroup
        defaultValue="automatic"
        name="radio-buttons-group"
        onChange={(event, value) => {
          setIpSettings((prevState) => {
            return {
              ...prevState,
              ipType: value,
            };
          });
        }}
      >
        <FormControlLabel
          value="automatic"
          control={<Radio disabled={props.isDisabled} />}
          label="Obtain an IP address automatically (DHCP/BootP)"
        />
        <FormControlLabel
          value="custom"
          control={<Radio disabled={props.isDisabled} />}
          label="Use the following IP address"
        />
      </RadioGroup>
      <div className={styles.ipInputContainer}>
        <TextField
          size={"small"}
          label={"IP address:"}
          required
          style={{ margin: "10px" }}
          disabled={ipSettings.ipType === "automatic"}
          name={"ipAddress"}
          onChange={(event) => {
            handleInput(event);
            validateIp(event.target.value);
          }}
          error={ipError}
        />
        <TextField
          size={"small"}
          label={"Subnet Mask:"}
          required
          style={{ margin: "10px" }}
          disabled={ipSettings.ipType === "automatic"}
          name={"subnetMask"}
          onChange={(event) => {
            handleInput(event);
            validateSubnet(event.target.value);
          }}
          error={subnetError}
        />
        <TextField
          size={"small"}
          label={"Default Gateway"}
          style={{ margin: "10px" }}
          disabled={ipSettings.ipType === "automatic"}
          name={"defaultGateway"}
          onChange={handleInput}
        />
      </div>
    </div>
  );
});

export default IpSettings;
