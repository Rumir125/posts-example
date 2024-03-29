import { HTMLAttributes } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import "./style.css";

interface ListComponentProps extends HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      ) : data.length ? (
        <ul className="ListComponent__list-wrapper">
          {data.map((item) => (
            <li key={item[itemKey]}>{renderItem(item)}</li>
          ))}
        </ul>
      ) : (
        noDataComponent || (
          <div className="ListComponent__list-empty">
            <p>{noDataMessage}</p>
          </div>
        )
      )}
    </div>
  );
}
export default ListComponent;
