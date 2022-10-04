import styles from "./connectionSettings.module.css";

import Footer from "../../footer/Footer";
import EthernetSettings from "./ethernetSettings/EthernetSettings";
import WifiSettings from "./wifiSettings/WifiSettings";

import { useRef } from "react";

const ConnectionSettings = (props) => {
  const settings = {
    ethernetSettings: {},
    wifiSettings: {},
  };

  const ethernetRef = useRef(null);
  const wifiRef = useRef(null);

  const submitForm = () => {
    settings.ethernetSettings = ethernetRef.current.getInfo();
    settings.wifiSettings = wifiRef.current.getInfo();

    const isEthernetSettingsValid = Boolean(
      settings.ethernetSettings.ipSettings &&
        settings.ethernetSettings.dnsSettings
    );
    const isWifiSettingsValid = Boolean(
      settings.wifiSettings.ipSettings && settings.wifiSettings.dnsSettings
    );

    if (isEthernetSettingsValid && isWifiSettingsValid) {
      console.log(settings);
    } else {
      console.log("Invalid Data");
    }
  };

  const clearForm = () => {
    ethernetRef.current.clear();
    wifiRef.current.clear();
  };

  return (
    <>
      <div className={styles.connectionSettings}>
        <div className={styles.ethernet}>
          <strong>Ethernet Settings</strong>
          <EthernetSettings ref={ethernetRef} />
        </div>
        <div className={styles.wireless}>
          <strong>Wireless Settings</strong>
          <WifiSettings ref={wifiRef} />
        </div>
      </div>
      <Footer submit={submitForm} clear={clearForm} />
    </>
  );
};

export default ConnectionSettings;
