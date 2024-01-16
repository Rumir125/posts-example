import { SVGProps } from "react";
import CommentIcon from "./CommentIcon";
import SearchIcon from "./SearchIcon";

export type IconType = "edit" | "search";

type IconObject = {
  [key: string]: JSX.Element;
};

export const ICONS = (props: SVGProps<SVGSVGElement>): IconObject => ({
  edit: <CommentIcon {...props} />,
  search: <SearchIcon {...props} />,
});

export { default as CommentIcon } from "./CommentIcon";
export { default as SearchIcon } from "./SearchIcon";
