import { DEFAULT_PROPS_MESSAGE } from "../../../config/constants";
import withLogger from "../../../shared/hoc/withLogger";
import LoggedLoadingScreen from "../../LoadingScreen";
import "./style.css";

function ListComponent({
  data,
  renderItem,
  itemKey,
  noDataMessage = "No data found",
  className = "",
  listWrapperClassName = "",
  noDataComponent,
  loadingData,
}: {
  data: any[];
  renderItem: (item: any) => JSX.Element;
  itemKey: string;
  noDataMessage?: string;
  className?: string;
  listWrapperClassName?: string;
  noDataComponent?: JSX.Element;
  loadingData?: boolean;
}) {
  return (
    <div className={`ListComponent__wrapper ${className}`}>
      {loadingData ? (
        <LoggedLoadingScreen propsMessage={DEFAULT_PROPS_MESSAGE} />
      ) : !!data.length ? (
        <ul className={`ListComponent__list-wrapper ${listWrapperClassName}`}>
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

const LoggedListComponent = withLogger(ListComponent);

export default LoggedListComponent;
