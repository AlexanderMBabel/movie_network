import React, { Component } from 'react';
import { Editor, RichUtils, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import axios from 'axios';

export class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      serverData: null
    };
    this.onChange = editorState => this.setState({ editorState });
    this.setEditor = editor => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
    this.onSubmit = () => {
      //   console.log(convertToRaw(this.state.editorState.getCurrentContent()));
      axios
        .post(this.props.postUrl, { ...this.props.more, review: convertToRaw(this.state.editorState.getCurrentContent()) }, this.props.headers)
        .then(res => console.log(res.data))
        .catch(err => console.err(err));
    };
  }

  componentDidMount() {
    this.focusEditor();
    axios
      .get(this.props.getUrl, this.props.headers)
      .then(res => this.setState({ ...this.state, serverData: res.data }))
      .catch(err => console.error(err));

    if (this.state.serverData) {
      this.setState({ ...this.state, editorState: convertFromRaw(this.state.serverData.review) });
    }
  }

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  };

  render() {
    return (
      <div>
        <div className="p-2">
          <BlockStyleControls editorState={this.state.editorState} onToggle={this.toggleBlockType} />
          <InlineStyleControls editorState={this.state.editorState} onToggle={this.toggleInlineStyle} />
        </div>
        <div style={styles.editor} onClick={this.focusEditor}>
          <Editor ref={this.setEditor} editorState={this.state.editorState} onChange={this.onChange} customStyleMap={styleMap} blockStyleFn={getBlockStyle} />
        </div>
        <div>
          <button onClick={this.onSubmit} className="p-2 rounded bg-teal-600 text-teal-100">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '12em',
    borderRadius: '5px',
    padding: '.5rem'
  }
};

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Roboto", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

function StyleButton({ active, style, label, onToggle }) {
  let className = 'p-2 m-1 font-smeibold rounded shadow  hover:text-teal-800 ';
  if (active) {
    className += 'text-pink-800 bg-teal-300 rounded shadow';
  }

  return (
    <span
      className={className}
      onMouseDown={e => {
        e.preventDefault();
        onToggle(style);
      }}
    >
      {label}
    </span>
  );
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code' }
];

function BlockStyleControls(props) {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => {
        return <StyleButton key={type.label} active={type.style === blockType} label={type.label} onToggle={props.onToggle} style={type.style} />;
      })}
    </div>
  );
}

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' }
];

function InlineStyleControls(props) {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="m-4">
      {INLINE_STYLES.map(type => (
        <StyleButton key={type.label} active={currentStyle.has(type.style)} label={type.label} onToggle={props.onToggle} style={type.style} />
      ))}
    </div>
  );
}

export default TextEditor;
