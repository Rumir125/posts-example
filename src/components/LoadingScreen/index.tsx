import { HTMLAttributes } from "react";
import withLogger from "../../shared/hoc/withLogger";
import { Spinner } from "../../ui-library";
import "./style.css";

function LoadingScreen(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="LoadingScreen__container" {...props}>
      <Spinner />
    </div>
  );
}

export default withLogger(LoadingScreen);
