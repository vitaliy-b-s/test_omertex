import styles from "./ipSettings.module.css";

import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validateIp, validateSubnet } from "../../../helpers/validation";

const IpSettings = forwardRef((props, ref) => {
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

  const validateIPData = () => {
    const isValid = validateIp(ipSettings.ipAddress);
    if (!isValid) {
      setIpError(true);
    } else {
      setIpError(false);
    }
    return isValid;
  };

  const validateSubnetData = () => {
    const isValid = validateSubnet(ipSettings.subnetMask);
    if (!isValid) {
      setSubnetError(true);
    } else {
      setSubnetError(false);
    }
    return isValid;
  };

  useImperativeHandle(ref, () => ({
    processData() {
      if (ipSettings.ipType === "automatic") {
        return {
          ipType: "automatic",
          ipAddress: "",
          subnetMask: "",
          defaultGateway: "",
        };
      }

      const isIPValid = validateIPData();
      const isSubnetValid = validateSubnetData();

      if (isIPValid && isSubnetValid) {
        return ipSettings;
      } else {
        return false;
      }
    },
    clearForm() {
      setIpSettings({
        ipType: "automatic",
        ipAddress: "",
        subnetMask: "",
        defaultGateway: "",
      });
      setSubnetError(false);
      setIpError(false);
    },
  }));

  return (
    <div>
      <RadioGroup
        defaultValue="automatic"
        name="radio-buttons-group"
        onChange={(event, value) => {
          if (value === "automatic") {
            setIpError(false);
            setSubnetError(false);
          }
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
          onChange={handleInput}
          error={ipError}
        />
        <TextField
          size={"small"}
          label={"Subnet Mask:"}
          required
          style={{ margin: "10px" }}
          disabled={ipSettings.ipType === "automatic"}
          name={"subnetMask"}
          onChange={handleInput}
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
