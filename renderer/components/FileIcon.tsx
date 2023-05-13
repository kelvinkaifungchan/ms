import { VscMarkdown } from "react-icons/vsc";
import { RiFileUnknowFill } from "react-icons/ri";

export const FileIcon = ({ fileType }) => {
  return (
    <>
      { fileType === ".md" ? (
        <VscMarkdown />
      ) : <RiFileUnknowFill/>}
    </>
  );
};
