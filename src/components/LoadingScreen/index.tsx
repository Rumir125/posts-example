import { HTMLAttributes } from "react";
import withLogger from "../../shared/hoc/withLogger";
import "./style.css";

function LoadingScreen(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="LoadingScreen__container" {...props}>
      <div className="load-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default withLogger(LoadingScreen);
