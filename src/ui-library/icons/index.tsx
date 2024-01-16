import { SVGProps } from "react";
import CommentIcon from "./CommentIcon";
import SearchIcon from "./SearchIcon";

export type IconType = "edit" | "search";

type ICON_OBJECT = {
  [key: string]: JSX.Element;
};

export const ICONS = (props: SVGProps<SVGSVGElement>): ICON_OBJECT => ({
  edit: <CommentIcon {...props} />,
  search: <SearchIcon {...props} />,
});

export { default as CommentIcon } from "./CommentIcon";
export { default as SearchIcon } from "./SearchIcon";
