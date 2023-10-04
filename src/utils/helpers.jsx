import {
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";

export const setPlatformIcon = (platformId) => {
  switch (platformId) {
    case 1:
      return <FaWindows />;
    case 2:
      return <FaPlaystation />;
    case 3:
      return <FaXbox />;
    case 4:
      return <BsNintendoSwitch />;
    case 5:
      return <FaApple />;
    case 6:
      return <FaLinux />;
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleString("en-US", options);
};
