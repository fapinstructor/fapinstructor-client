import React from "react";
import styled from "styled-components/macro";
import Bookmark, { BookmarkProps } from "components/atoms/Bookmark";

export type BookmarkListProps = {
  bookmarks: BookmarkProps[];
};

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 80vw;
  max-height: 40vh;
  overflow: auto;
`;

export default function BookmarkList({ bookmarks }: BookmarkListProps) {
  return (
    <ListContainer>
      {bookmarks.map(({ href, src }, i) => (
        <div key={i}>
          <Bookmark href={href} src={src} />
        </div>
      ))}
    </ListContainer>
  );
}
