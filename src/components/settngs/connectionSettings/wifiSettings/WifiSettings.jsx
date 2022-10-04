import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";

import IpSettings from "../../ipSettings/IpSettings";
import DnsSettings from "../../dnsSettings/DnsSettings";

const WifiSettings = forwardRef((props, ref) => {
  const [isWifiEnabled, setIsWifiEnabled] = useState(true);
  const [isSecurityEnabled, setIsSecurityEnabled] = useState(true);
  const [wifiSettings, setWifiSettings] = useState({
    networkName: "",
    networkPassword: "",
    ipSettings: {},
    dnsSettings: {},
  });

  const ipRef = useRef(null);
  const dnsRef = useRef(null);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setWifiSettings((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useImperativeHandle(ref, () => ({
    getInfo() {
      if (!isWifiEnabled) {
        wifiSettings.ipSettings = ipRef.current.processData();
        wifiSettings.dnsSettings = dnsRef.current.processData();
      }
      return wifiSettings;
    },
    clear() {
      ipRef.current.clearForm();
      dnsRef.current.clearForm();
      setWifiSettings({
        networkName: "",
        networkPassword: "",
        ipSettings: {},
        dnsSettings: {},
      });
    },
  }));

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
          value={wifiSettings.networkName}
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
          type={"password"}
          value={wifiSettings.networkPassword}
          required
          style={{ margin: "10px" }}
          disabled={isSecurityEnabled}
          name={"networkPassword"}
          onChange={handleInput}
        />
      </div>
      <IpSettings isDisabled={isWifiEnabled} ref={ipRef} />
      <DnsSettings isDisabled={isWifiEnabled} ref={dnsRef} />
    </div>
  );
});

export default WifiSettings;
