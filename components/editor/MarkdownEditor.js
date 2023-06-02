import { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

function MarkdownEditor({ cb, fieldName, defaultValue }) {
  const [editorText, setEditorText] = useState(defaultValue);

  const handleOnChange = (text) => {
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
