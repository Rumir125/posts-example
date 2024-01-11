import { HTMLAttributes } from "react";
import withLogger from "../../shared/hoc/withLogger";
import "./style.css";

function Spinner(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="Spinner" {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default withLogger(Spinner);
