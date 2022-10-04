import styles from "./dnsSettings.module.css";

import {
  forwardRef,
  isValidElement,
  useImperativeHandle,
  useState,
} from "react";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { validateIp } from "../../../helpers/validation";

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

  const validateDNS = (type) => {
    if (type === "preferred") {
      const isValid = validateIp(dnsSettings.preferredDns);
      if (!isValid) {
        setPreferredDnsError(true);
      } else {
        setPreferredDnsError(false);
      }
      return isValid;
    } else {
      const isValid = validateIp(dnsSettings.alternativeDns);
      if (!isValid) {
        setAlternativeDnsError(true);
      } else {
        setAlternativeDnsError(false);
      }
      return isValid;
    }
  };

  useImperativeHandle(ref, () => ({
    processData() {
      if (dnsSettings.dnsType === "automatic") {
        return {
          dnsType: "automatic",
          preferredDns: "",
          alternativeDns: "",
        };
      }

      const isPreferredValid = validateDNS("preferred");
      const isAlternativeValid = validateDNS("alternative");

      if (isAlternativeValid && isPreferredValid) {
        return dnsSettings;
      } else {
        return false;
      }
    },

    clearForm() {
      setDnsSettings({
        dnsType: "automatic",
        preferredDns: "",
        alternativeDns: "",
      });
      setAlternativeDnsError(false);
      setPreferredDnsError(false);
    },
  }));

  return (
    <div>
      <RadioGroup
        defaultValue="automatic"
        name="radio-buttons-group"
        onChange={(event, value) => {
          if (value === "automatic") {
            setPreferredDnsError(false);
            setAlternativeDnsError(false);
          }
          setDnsSettings((prevState) => {
            return {
              ...prevState,
              dnsType: value,
            };
          });
        }}
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
          onChange={handleInput}
          error={preferredDnsError}
        />
        <TextField
          name={"alternativeDns"}
          size={"small"}
          label={"Alternative DNS server: "}
          style={{ margin: "10px" }}
          disabled={dnsSettings.dnsType === "automatic"}
          value={dnsSettings.alternativeDns}
          onChange={handleInput}
          error={alternativeDnsError}
        />
      </div>
    </div>
  );
});

export default DnsSettings;
