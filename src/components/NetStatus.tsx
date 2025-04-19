import { useContext } from "react";
import { NetConnectionStatus, NetState } from "../utils/onlineTypes";
import { NetStateContext } from "../utils/Contexts";

export default function NetStatus({}) {
  const netState = useContext(NetStateContext);

  function cssClassForStatus(status: NetConnectionStatus): string {
    if (status == "offline") {
      return "";
    } else if (status == "connecting") {
      return "info";
    } else if (status == "error") {
      return "error";
    }
    return "";
  }

  return (
    <span className={`net-status badge ${cssClassForStatus(netState.status)}`}>
      {netState.status}
    </span>
  );
}
