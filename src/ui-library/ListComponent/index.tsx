import withLogger from "../../shared/hoc/withLogger";
import LoadingScreen from "../../components/LoadingScreen";
import "./style.css";
import { HTMLAttributes } from "react";

interface ListComponentProps extends HTMLAttributes<HTMLDivElement> {
  data: any[];
  renderItem: (item: any) => JSX.Element;
  itemKey: string;
  noDataMessage?: string;
  noDataComponent?: JSX.Element;
  loadingData?: boolean;
}

function ListComponent({
  data,
  renderItem,
  itemKey,
  noDataMessage = "No data found",
  className = "",
  noDataComponent,
  loadingData,
  ...props
}: ListComponentProps) {
  return (
    <div className={`ListComponent__wrapper ${className}`} {...props}>
      {loadingData ? (
        <LoadingScreen />
      ) : !!data.length ? (
        <ul className="ListComponent__list-wrapper">
          {data.map((item) => (
            <li key={item[itemKey]}>{renderItem(item)}</li>
          ))}
        </ul>
      ) : (
        noDataComponent || (
          <div className="PostList__list-empty">
            <p>{noDataMessage}</p>
          </div>
        )
      )}
    </div>
  );
}

export default withLogger(ListComponent);
