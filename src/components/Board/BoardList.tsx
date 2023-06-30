import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Dropdown from "../Common/Dropdown";
import { FaHeart, FaRegHeart } from "react-icons/Fa";
import { BsPencil, BsTrash } from "react-icons/Bs";
import { differenceInHours, isToday } from "date-fns";
import ImageCarousel from "./ImageCarousel";

const ArticleContainer = styled.article`
  ${tw`pt-1 pb-20 bg-base-color`};
  min-height: calc(100vh - 168px);
`;

interface BoardListProps {
  challengeId: string | undefined;
}

interface BoardListData {
  postId: number;
  title: string;
  imageUrl: { id: number; postImage: string }[];
  nickname: string;
  memberId: number;
  createdAt: string;
  heart: number;
}

const BoardList = ({ challengeId }: BoardListProps) => {
  const [list, setList] = useState<BoardListData[] | null>(null);
  const userId = 1;

  // challengeId로 게시글 정보 서버에서 받아오기
  const getBoardList = async () => {
    try {
      const { data } = await axios.get("/test/boardList.json");
      // 시간까지 넣어서 createdAt만들경우에 사용가능..
      // const formattedTimeData = data.map((post: BoardListData) => {
      //   const date = new Date(post.createdAt);
      //   const hoursDifference = differenceInHours(new Date(), date);
      //   console.log(hoursDifference);
      //   if (isToday(date)) {
      //     const hoursDifference = differenceInHours(new Date(), date);
      //     return { ...post, createdAt: `${hoursDifference}시간 전` };
      //   } else {
      //     return post;
      //   }
      // });
      setList(data);
      console.log(data);
    } catch (error) {
      console.error(`getBoardList Error: Time(${new Date()}) ERROR ${error}`);
    }
  };

  useEffect(() => {
    getBoardList();
  }, [challengeId]);

  return (
    <ArticleContainer>
      <ul className="p-1 mb-10">
        {list?.map((item) => (
          <li
            key={item.postId}
            className="bg-base-100 text-right mb-2 p-3 rounded-lg shadow"
          >
            {userId === item.memberId ? (
              <Dropdown>
                <li className="text-xs w-20 px-0 ">
                  <div
                    // onClick={() => handleRevision(review)}
                    className=" w-full mx-auto"
                  >
                    <BsPencil size="13" />
                    <p className="shrink-0">수정</p>
                  </div>
                </li>
                <li className="text-error text-xs w-20 px-0">
                  <div
                    // onClick={() =>
                    //   handleDelete(review.reviewID, review.rating)
                    // }
                    className="w-full mx-auto"
                  >
                    <BsTrash size="13" />
                    <p className="shrink-0">삭제</p>
                  </div>
                </li>
              </Dropdown>
            ) : null}
            {item.imageUrl.length !== 0 ? (
              <ImageCarousel imgList={item.imageUrl} />
            ) : // <div className="w-full overflow-hidden mx-auto">
            //   <img src={item.imageUrl[0]} alt="image" />
            // </div>
            null}
            <p className="text-left my-3 font-normal">{item.title}</p>
            <div className="flex justify-between mb-1">
              <div className="text-xs text-cyan-950">{item.nickname}</div>
              <div className="mr-2 flex">
                <span className="text-xs mr-1 font-light">{item.heart}</span>
                <FaHeart className=" text-rose-500" />
              </div>
            </div>
            <div className="text-xs font-normal text-right">
              {item.createdAt}
            </div>
            {/* <div>{time}</div> */}
          </li>
        ))}
      </ul>
    </ArticleContainer>
  );
};

export default BoardList;
