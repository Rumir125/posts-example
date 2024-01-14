import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

export const usePostCard = (
  id: number,
  setCurrentPostId: Dispatch<SetStateAction<number | null>>
) => {
  const navigate = useNavigate();

  const handleClickDetails = () => {
    navigate(`/post/${id}`);
  };

  const handleClickViewComments = async (
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setCurrentPostId(id);
  };

  return { handleClickDetails, handleClickViewComments };
};
