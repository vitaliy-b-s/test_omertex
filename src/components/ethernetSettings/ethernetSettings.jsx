import IpSettings from "../ipSettings/IpSettings";
import DnsSettings from "../dnsSettings/DnsSettings";

const EthernetSettings = () => {
  return (
    <>
      <IpSettings />
      <DnsSettings />
    </>
  );
};

export default EthernetSettings;
