import * as React from "react";
import styled from "styled-components/macro";

type QuoteProps = {
  by: string;
  source: string;
  children: React.ReactNode;
};

export function Quote({ by, source, children }: QuoteProps) {
  return (
    <figure>
      <QuoteContent>{children}</QuoteContent>
      <figcaption>
        <Author>
          <SourceLink href={source}>{by}</SourceLink>
        </Author>
      </figcaption>
    </figure>
  );
}

const QuoteContent = styled.blockquote`
  margin: 0;
  background-color: hsl(0deg 0% 90%);
  padding: 16px 8px;
  border-radius: 8px;
  font-style: italic;

  &::before {
    content: "“";
  }
  &::after {
    content: "”";
  }
`;

const Author = styled.cite`
  display: block;
  text-align: right;
  margin-top: 8px;
`;

const SourceLink = styled.a`
  color: hsl(0deg 0% 35%);
  text-decoration: none;

  &::before {
    content: "—";
  }
`;
