import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Dropdown from "../Common/Dropdown";
import { BoardContent } from "./BoardList";
import ImageCarousel from "./ImageCarousel";
import { AiFillHeart, AiOutlineHeart } from "react-icons/Ai";
import { BsPencil, BsTrash, BsPersonFill } from "react-icons/Bs";
import { UseQueryResult } from "react-query";
import { UserData } from "../../interface/interface";
import { useUser } from "../../api/membersAPI";
import { heartDelete, heartPost } from "../../api/boardAPI";
import { differenceInHours, differenceInMinutes, isToday } from "date-fns";

interface BoardItemProps {
  readonly post: BoardContent;
  readonly confirmRef: RefObject<HTMLDialogElement>;
  readonly dispatch: Dispatch<SetStateAction<number | null>>;
}

const BoardItem = ({ post, confirmRef, dispatch }: BoardItemProps) => {
  const { data: userInfo }: UseQueryResult<UserData> = useUser();
  const [heartState, setHeartState] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setHeartState(post.hasHeart);
    setHeartCount(post.heartCnt);
  }, [post]);

  useEffect(() => {
    const date = new Date(post.createdAt);
    const now = new Date();
    if (isToday(date)) {
      const hoursDifference = differenceInHours(now, date);
      if (hoursDifference <= 0) {
        const minutesDifference =
          differenceInMinutes(now, date) === 0
            ? `방금 전`
            : `${differenceInMinutes(now, date)}분 전`;
        setFormattedDate(minutesDifference);
      } else {
        setFormattedDate(`${hoursDifference}시간 전`);
      }
    } else {
      const createdDate = date.toLocaleDateString("en-US");
      setFormattedDate(createdDate);
    }
  }, [post]);

  const handleHeart = async () => {
    if (heartState) {
      setHeartState(false);
      setHeartCount((count) => count - 1);
      await heartDelete(post.id);
    } else {
      setHeartState(true);
      setHeartCount((count) => count + 1);
      await heartPost(post.id);
    }
  };

  const confirmDelete = (id: number) => {
    if (!confirmRef.current || !id) return;
    dispatch(id);
    confirmRef.current.showModal();
  };
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-between items-center ml-1">
          {
            <div className="w-9 h-9  rounded-full overflow-hidden bg-[#f0f8f6] text-accent shadow-lg">
              {post.author.profileImageUrl ? (
                <img
                  src={post.author.profileImageUrl}
                  className="w-full"
                  alt="프로필이미지"
                />
              ) : (
                <BsPersonFill size={36} className="mt-1" />
              )}
            </div>
          }
          <div className="text-xs text-cyan-900 pt-2 pl-2">
            {post.author.nickname}
          </div>
        </div>

        {userInfo?.memberId === post.author.memberId ? (
          <Dropdown>
            <li className="text-xs w-20 px-0 ">
              <div
                // onClick={() =>)}
                className=" w-full mx-auto"
              >
                <BsPencil size="13" />
                <p className="shrink-0">수정</p>
              </div>
            </li>
            <li className="text-error text-xs w-20 px-0">
              <div
                onClick={() => confirmDelete(post.id)}
                className="w-full mx-auto"
              >
                <BsTrash size="13" />
                <p className="shrink-0">삭제</p>
              </div>
            </li>
          </Dropdown>
        ) : null}
      </div>

      {post.imageList.length !== 0 ? (
        <ImageCarousel imgList={post.imageList} />
      ) : null}

      <p className="text-left font-normal p-2 py-3 mt-2 border-t border-accent-focus/60">
        {post.postContent}
      </p>
      <div className="flex justify-between mb-1 px-2">
        <div className="mr-2 flex items-center">
          <button
            onClick={handleHeart}
            className="btn btn-ghost btn-xs p-0 hover:bg-base-100"
          >
            {heartState ? (
              <AiFillHeart size={20} className=" text-rose-500" />
            ) : (
              <AiOutlineHeart size={20} />
            )}
          </button>

          <p className="text-xs mx-1 pt-1 font-light">{heartCount}</p>
        </div>
        <div className="text-[10.5px] font-normal text-right pt-1">
          {formattedDate}
        </div>
      </div>
    </>
  );
};

export default BoardItem;
