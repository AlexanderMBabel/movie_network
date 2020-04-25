import React, { useState, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidenav from '../Sidenav';
import { Editor, EditorState } from 'draft-js';

const AddReview = ({ title }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = React.useRef(null);

  const focusEditor = () => {
    editor.current.focus();
  };

  useEffect(() => {
    focusEditor();
  }, []);
  return (
    <div style={{ height: '92vh', width: '100%' }} className="flex">
      <Sidenav />
      <section className="flex items-center justify-center w-full">
        <div className="w-3/4">
          <p>Add a review for {title}</p>
        </div>
        <div style={{ height: '20vh' }} className="" onClick={focusEditor}>
          <Editor ref={editor} editorState={editorState} onChange={setEditorState} />
        </div>
      </section>
    </div>
  );
};

AddReview.propTypes = {};

const mapStateToProps = state => ({
  id: state.search.id,
  type: state.search.type,
  title: state.search.title
});

export default connect(mapStateToProps, {})(AddReview);
