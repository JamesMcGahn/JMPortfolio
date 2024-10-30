import { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

interface Props {
  cb: (text: string, field: string) => void;
  fieldName: string;
  defaultValue: string;
}

function MarkdownEditor({ cb, fieldName, defaultValue }: Props) {
  const [editorText, setEditorText] = useState(defaultValue);

  const handleOnChange = (text: string) => {
    setEditorText(text);
    cb(text, fieldName);
  };

  return (
    <div>
      <MdEditor
        modelValue={editorText}
        onChange={(text) => handleOnChange(text)}
        language="en-US"
      />
    </div>
  );
}
export default MarkdownEditor;
