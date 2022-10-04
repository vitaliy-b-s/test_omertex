import IpSettings from "../../ipSettings/IpSettings";
import DnsSettings from "../../dnsSettings/DnsSettings";

import { forwardRef, useImperativeHandle, useRef } from "react";

const EthernetSettings = forwardRef((props, ref) => {
  const ethernetSettings = {
    ipSettings: {},
    dnsSettings: {},
  };

  const ipRef = useRef(null);
  const dnsRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getInfo() {
      ethernetSettings.ipSettings = ipRef.current.processData();
      ethernetSettings.dnsSettings = dnsRef.current.processData();
      return ethernetSettings;
    },
    clear() {
      ethernetSettings.dnsSettings = {};
      ethernetSettings.ipSettings = {};
      ipRef.current.clearForm();
      dnsRef.current.clearForm();
    },
  }));

  return (
    <>
      <IpSettings ref={ipRef} />
      <DnsSettings ref={dnsRef} />
    </>
  );
});

export default EthernetSettings;
