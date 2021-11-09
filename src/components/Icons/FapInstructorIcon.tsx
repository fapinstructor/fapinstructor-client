
import FapInstructorImage from "@/assets/images/logo.svg";
import { Image } from "@/components/Elements";

import { Icon } from "./Icon";


type FapInstructorIconProps = {
  size: number;
};

export function FapInstructorIcon({ size }: FapInstructorIconProps) {
  return (
    <Icon size={size}>
      <Image alt="Fap Instructor" src={FapInstructorImage} />
    </Icon>
  );
}
