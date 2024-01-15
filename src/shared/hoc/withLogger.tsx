import { ComponentType, useEffect } from "react";
import { DEFAULT_PROPS_MESSAGE } from "../../config/constants";

interface WithLoggerProps {
  propsMessage?: string;
}

// Higher Order Component
const withLogger = <P extends object>(
  WrappedComponent: ComponentType<P & WithLoggerProps>
) => {
  // eslint-disable-next-line react/display-name
  return ({
    propsMessage = DEFAULT_PROPS_MESSAGE,
    ...props
  }: WithLoggerProps & P) => {
    useEffect(() => {
      console.log(`${propsMessage} ${WrappedComponent.name}`);
    }, [propsMessage]);

    return <WrappedComponent {...(props as P & WithLoggerProps)} />;
  };
};
export default withLogger;
