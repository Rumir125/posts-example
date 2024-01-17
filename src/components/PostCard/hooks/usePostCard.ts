import { Dispatch, SetStateAction, SyntheticEvent } from "react";

export const usePostCard = (
  id: number,
  setCurrentPostId: Dispatch<SetStateAction<number | null>>
) => {
  const handleClickViewComments = async (
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setCurrentPostId(id);
  };

  return { handleClickViewComments };
};
