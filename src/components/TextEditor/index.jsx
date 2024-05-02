import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ value, onChange }) => {
  const handleChange = (content) => {
    onChange(content);
  };

  return <ReactQuill value={value} onChange={handleChange} />;
};

export default TextEditor;
