import { useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { IoChatbubbleEllipsesOutline } from "react-icons/Io5";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { UserData } from "../../interface/interface";
import { deletePost, getPosts } from "../../api/boardAPI";
import ConfirmModal from "../Common/ConfirmModal";
import BoardItem from "./BoardItem";

const ArticleContainer = styled.article`
  ${tw`pt-1 pb-20 bg-base-color`};
  min-height: calc(100vh - 168px);
`;

interface BoardListProps {
  challengeId: number;
}

// interface BoardListData {
//   postId: number;
//   title: string;
//   imageUrl: { id: number; postImage: string }[];
//   nickname: string;
//   memberId: number;
//   createdAt: string;
//   heart: number;
// }

interface BoardListData {
  content: BoardContent[];
  empty: boolean;
  last: boolean;
  pageable: {
    pageNumber: number;
  };
}

export interface BoardContent {
  id: number;
  challengeId: number;
  author: UserData;
  postContent: string;
  imageList: {
    id: number;
    postImage: string;
  }[];
  heartCnt: number;
  hasHeart: boolean;
  createdAt: string;
}

const BoardList = ({ challengeId }: BoardListProps) => {
  const queryClient = useQueryClient();
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  //실제 챌린지id로 적용해야함 (챌린지조회api완성 후 가능)
  //확인 끝나면 페이지별사이즈 10개로 고치기

  const {
    data: boardList,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<BoardListData>(
    ["challengeBoard", 1],
    ({ pageParam = 0 }) => getPosts(challengeId, pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage) {
          if (lastPage.last) return;
          console.log(lastPage.pageable.pageNumber);
          const nextPageParam = lastPage.pageable.pageNumber + 1;
          return nextPageParam;
        }
      },
    }
  );

  const { mutate: postDeleteMutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["challengeBoard", 1]);
      console.log("삭제되었다!!");
    },
  });

  console.log(boardList);

  const handleNextPage = () => {
    fetchNextPage();
    console.log("isFetchingNextPage", isFetchingNextPage);
  };

  const handlePostDelete = () => {
    if (!selectedPost) return;
    postDeleteMutate(selectedPost);
  };

  return (
    <ArticleContainer>
      <ul className="p-1">
        {boardList?.pages ? (
          boardList?.pages.map((page) =>
            page.content.map((item) => (
              <li
                key={item.id}
                className="bg-base-100 text-right mb-2 p-3 rounded-lg shadow"
              >
                <BoardItem
                  post={item}
                  confirmRef={confirmDialogRef}
                  dispatch={setSelectedPost}
                />
              </li>
            ))
          )
        ) : (
          <div className="flex flex-col space-y-6 justify-center items-center mt-12">
            <IoChatbubbleEllipsesOutline
              size={28}
              className="text-neutral-400"
            />
            <div className="font-normal">
              함께 도전하는 멤버들과
              <br /> 일상을 나눠보세요!
            </div>
          </div>
        )}
      </ul>
      <button onClick={handleNextPage} className="btn  mb-10">
        더보기
      </button>
      <ConfirmModal
        dialogRef={confirmDialogRef}
        confirm="정말로 삭제하시겠습니까?"
        onConfirm={handlePostDelete}
      />
    </ArticleContainer>
  );
};

export default BoardList;
