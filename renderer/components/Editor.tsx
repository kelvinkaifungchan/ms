import { useEffect, useState } from "react";
import { micromark } from "micromark";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface EditorProps {
  file: { title: string; content: string };
  index: number;
  handleChanged: (index: number) => void;
  handleSaved: (index: number) => void;
  dir: string;
}

export const Editor = ({
  file,
  index,
  handleChanged,
  handleSaved,
  dir,
}: EditorProps) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const newContent = findTag(micromark(file.content))
    setContent(newContent);
  }, [file]);

  const findTag = (content) => {
    const newContent = content.replace(
      /(^|\s)(#\w+)\b/g,
      `$1<span class="bg-hl rounded-xl px-3">$2</span>`
    );
    return newContent
  }

  const handleInput = (e: ContentEditableEvent) => {
    const editedContent = findTag(e.target.value);
    setContent(editedContent);
  };

  return (
    <div
      className="h-full w-full overflow-hidden opacity-90">
      <div className="flex justify-center w-full h-full overflow-y-auto customScroll min-w-[300px] p-5">
        <div className="space-y-5 max-w-[600px]">
          <ContentEditable
            className="text-xl focus:outline-none prose prose-dark prose-p:whitespace-pre-wrap prose-p:my-0 prose-hr:my-4 prose-ul:my-1 prose-li:my-1 prose-ol:my-1 prose-lead:"
            html={content}
            onChange={handleInput}
          />
        </div>
      </div>
    </div>
  );
};
