import IpSettings from "../../ipSettings/IpSettings";
import DnsSettings from "../../dnsSettings/DnsSettings";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { validateIp, validateSubnet } from "../../../../helpers/validation";

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
  }));

  return (
    <>
      <IpSettings ref={ipRef} />
      <DnsSettings ref={dnsRef} />
    </>
  );
});

export default EthernetSettings;
