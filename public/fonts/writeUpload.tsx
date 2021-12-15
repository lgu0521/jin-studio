import { TuiEditorWithForwardedProps } from "../../modules/Editor";
import { EditorProps, Editor } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
type Props = {
  item: any;
};
const TuiNoSSRWrapper = dynamic<TuiEditorWithForwardedProps>(
  () => import("../../modules/Editor"),
  {
    ssr: false,
    loading: () => <p>Loading . . .</p>,
  }
);
const TuiWrapper = React.forwardRef((props: EditorProps, ref) => (
  <TuiNoSSRWrapper
    {...props}
    forwardedRef={ref as React.MutableRefObject<Editor>}
  />
));
TuiWrapper.displayName = "Editor";

const WriteUpload = ({ item }: Props) => {
  const editorRef = useRef<Editor>(null);

  const editorRefChange = () => {
    if (editorRef.current) {
      item.item = editorRef.current.getInstance().getMarkdown();
    }
  };

  return (
    <TuiWrapper
      height="400px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      ref={editorRef}
      onChange={editorRefChange}
      initialValue={item.item ? item.item.markDownContent : ''}
    />
  );
};

export default WriteUpload;
