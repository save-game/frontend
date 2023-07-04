import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { IoChatbubbleEllipsesOutline } from "react-icons/Io5";
import { CgSpinner } from "react-icons/Cg";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { UserData } from "../../interface/interface";
import { deletePost, getPosts } from "../../api/boardAPI";
import ConfirmModal from "../Common/ConfirmModal";
import BoardItem from "./BoardItem";
import { useInView } from "react-intersection-observer";

const ArticleContainer = styled.article`
  ${tw`pt-1 pb-20 bg-base-color`};
  min-height: calc(100vh - 168px);
`;

interface BoardListProps {
  challengeId: string | undefined;
}

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
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [observeTarget, inView] = useInView({ threshold: 1.0 });

  //실제 챌린지id로 적용해야함 (챌린지조회api완성 후 가능)
  //확인 끝나면 페이지별사이즈 10개로 고치기

  const {
    data: boardList,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<BoardListData>(
    ["challengeBoard", Number(challengeId)],
    ({ pageParam = 0 }) => getPosts(challengeId, pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage) {
          if (lastPage.last) return;
          const nextPageParam = lastPage.pageable.pageNumber + 1;
          return nextPageParam;
        }
      },
    }
  );

  const { mutate: postDeleteMutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["challengeBoard", Number(challengeId)]);
      console.log("삭제되었다!!");
    },
  });

  useEffect(() => {
    if (boardList?.pages[0].empty) {
      setIsEmpty(true);
    }
  }, [boardList]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handlePostDelete = () => {
    if (!selectedPost) return;
    postDeleteMutate(selectedPost);
  };

  return (
    <ArticleContainer>
      <ul className="p-1">
        {boardList?.pages.map((page) =>
          page.content?.map((item) => (
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
        )}
      </ul>
      {isEmpty ? (
        <div className="flex flex-col space-y-6 justify-center items-center mt-12">
          <IoChatbubbleEllipsesOutline size={28} className="text-neutral-400" />
          <div className="font-normal">
            함께 도전하는 멤버들과
            <br /> 일상을 나눠보세요!
          </div>
        </div>
      ) : null}

      <div ref={observeTarget} className=" h-14">
        {isFetchingNextPage ? (
          <CgSpinner
            size={25}
            className="animate-spin mx-auto text-accent-focus"
          />
        ) : null}
      </div>
      <ConfirmModal
        dialogRef={confirmDialogRef}
        confirm="정말로 삭제하시겠습니까?"
        onConfirm={handlePostDelete}
      />
    </ArticleContainer>
  );
};

export default BoardList;
