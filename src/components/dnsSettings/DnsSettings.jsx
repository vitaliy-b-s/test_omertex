import styles from "./dnsSettings.module.css";

import { forwardRef, useState } from "react";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";

import { isIP } from "is-ip";

const DnsSettings = forwardRef((props, ref) => {
  const [dnsSettings, setDnsSettings] = useState({
    dnsType: "automatic",
    preferredDns: "",
    alternativeDns: "",
  });
  const [preferredDnsError, setPreferredDnsError] = useState(false);
  const [alternativeDnsError, setAlternativeDnsError] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setDnsSettings((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const validatePreferredDns = (dns) => {
    if (dns === "") {
      setPreferredDnsError(false);
    } else if (!isIP(dns)) {
      setPreferredDnsError(true);
    } else {
      setPreferredDnsError(false);
    }
  };

  const validateAlternativeDns = (dns) => {
    if (dns === "") {
      setAlternativeDnsError(false);
    } else if (!isIP(dns)) {
      setAlternativeDnsError(true);
    } else {
      setAlternativeDnsError(false);
    }
  };

  return (
    <div>
      <RadioGroup
        defaultValue="automatic"
        name="radio-buttons-group"
        onChange={(event, value) =>
          setDnsSettings((prevState) => {
            return {
              ...prevState,
              dnsType: value,
            };
          })
        }
      >
        <FormControlLabel
          value="automatic"
          control={<Radio disabled={props.isDisabled} />}
          label="Obtain an DNS server automatically"
        />
        <FormControlLabel
          value="custom"
          control={<Radio disabled={props.isDisabled} />}
          label="Use the following DNS server"
        />
      </RadioGroup>
      <div className={styles.dnsInputContainer}>
        <TextField
          size={"small"}
          label={"Preferred DNS server:"}
          name={"preferredDns"}
          required
          style={{ margin: "10px" }}
          disabled={dnsSettings.dnsType === "automatic"}
          value={dnsSettings.preferredDns}
          onChange={(event) => {
            handleInput(event);
            validatePreferredDns(event.target.value);
          }}
          error={preferredDnsError}
        />
        <TextField
          name={"alternativeDns"}
          size={"small"}
          label={"Alternative DNS server: "}
          style={{ margin: "10px" }}
          disabled={dnsSettings.dnsType === "automatic"}
          value={dnsSettings.alternativeDns}
          onChange={(event) => {
            handleInput(event);
            validateAlternativeDns(event.target.value);
          }}
          error={alternativeDnsError}
        />
      </div>
    </div>
  );
});

export default DnsSettings;
