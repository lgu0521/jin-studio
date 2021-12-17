import { TuiEditorWithForwardedProps } from "../../modules/Editor";
import { EditorProps, Editor } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import styled from "styled-components";
type Props = {
  defaultValue: any;
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

const WriteUpload = ({ defaultValue }: Props) => {
  const editorRef = useRef<Editor>(null);

  const editorRefChange = () => {
    if (editorRef.current) {
      defaultValue.item = editorRef.current.getInstance().getMarkdown();
    }
  };

  return (
    <MarginWrap>
      <TuiWrapper
        height="400px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        ref={editorRef}
        onChange={editorRefChange}
        initialValue={defaultValue.item ? defaultValue.item.markDownContent : ''}
      />
    </MarginWrap>
  );
};

const MarginWrap = styled.div`
  margin: 5px 0px;
`
export default WriteUpload;
