import React from "react";
import FapInstructorImage from "images/logo.svg";
import Image from "components/atoms/Image";
import Icon from "components/atoms/Icon";

type FapInstructorIconProps = {
  size: number;
};

export default function FapInstructorIcon({ size }: FapInstructorIconProps) {
  return (
    <Icon size={size}>
      <Image alt="Fap Instructor" src={FapInstructorImage} />
    </Icon>
  );
}
