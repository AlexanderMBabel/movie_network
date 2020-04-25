import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    focusEditor();
    return () => {};
  }, []);
  return (
    <div onClick={focusEditor}>
      <Editor ref={editor} editorState={editorState} onChange={editorState => setEditorState(editorState)} />
    </div>
  );
};

export default TextEditor;
