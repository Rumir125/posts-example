import { Dispatch, SetStateAction, SyntheticEvent } from "react";

export const usePostCard = (
  id: number,
  setCurrentPostId: Dispatch<SetStateAction<number | null>>,
  setModalOpen: Dispatch<SetStateAction<boolean>>
) => {
  const handleClickViewComments = async (
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    event.stopPropagation();
    event.preventDefault();
    if (mediaQuery.matches) {
      setModalOpen(true);
    }
    setCurrentPostId(id);
  };

  return { handleClickViewComments };
};
