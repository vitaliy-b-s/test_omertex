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

    console.log(settings);
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
      <Footer submit={submitForm} />
    </>
  );
};

export default ConnectionSettings;
