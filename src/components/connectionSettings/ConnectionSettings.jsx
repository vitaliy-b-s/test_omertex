import styles from "./connectionSettings.module.css";

import Footer from "../footer/Footer";
import EthernetSettings from "../ethernetSettings/ethernetSettings";
import WifiSettings from "../wifiSettings/WifiSettings";

const ConnectionSettings = () => {
  return (
    <>
      <div className={styles.connectionSettings}>
        <div className={styles.ethernet}>
          <strong>Ethernet Settings</strong>
          <EthernetSettings />
        </div>
        <div className={styles.wireless}>
          <strong>Wireless Settings</strong>
          <WifiSettings />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConnectionSettings;
