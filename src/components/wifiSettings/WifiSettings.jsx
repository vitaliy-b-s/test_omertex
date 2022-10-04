import { useState } from "react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import IpSettings from "../ipSettings/IpSettings";
import DnsSettings from "../dnsSettings/DnsSettings";

const WifiSettings = () => {
  const [isWifiEnabled, setIsWifiEnabled] = useState(true);
  const [isSecurityEnabled, setIsSecurityEnabled] = useState(true);
  const [wifiSettings, setWifiSettings] = useState({
    networkName: "",
    networkPassword: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setWifiSettings((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <FormControlLabel
        control={<Checkbox onChange={() => setIsWifiEnabled(!isWifiEnabled)} />}
        label={"Enable Wifi"}
      />
      <div>
        <TextField
          size={"small"}
          label={"Wireless network name:"}
          required
          style={{ margin: "10px" }}
          disabled={isWifiEnabled}
          name={"networkName"}
          onChange={handleInput}
        />
      </div>
      <FormControlLabel
        control={
          <Checkbox
            disabled={isWifiEnabled}
            onChange={() => setIsSecurityEnabled(!isSecurityEnabled)}
          />
        }
        label={"Enable WirelessSecurity: "}
      />
      <div>
        <TextField
          size={"small"}
          label={"Security Key:"}
          required
          style={{ margin: "10px" }}
          disabled={isSecurityEnabled}
          name={"networkPassword"}
          onChange={handleInput}
        />
      </div>
      <IpSettings isDisabled={isWifiEnabled} />
      <DnsSettings isDisabled={isWifiEnabled} />
    </div>
  );
};

export default WifiSettings;
