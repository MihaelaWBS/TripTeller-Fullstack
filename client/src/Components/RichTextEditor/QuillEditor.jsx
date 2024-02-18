import React, { useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "./QuillEditor.css";
import uploadImageToCloudinary from "../Cloudinary/CloudinaryService";
import DOMPurify from "dompurify";

const QuillEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quillInstance = quillRef.current.getEditor();

      const toolbar = quillInstance.getModule("toolbar");
      toolbar.addHandler("image", () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input.files[0];
          if (file) {
            try {
              const imageUrl = await uploadImageToCloudinary(file);
              const range = quillInstance.getSelection();
              if (range) {
                quillInstance.insertEmbed(range.index, "image", imageUrl);
              }
            } catch (error) {
              console.error("Failed to upload image", error);
            }
          }
        };
      });
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
    ],
  };

  const sanitizedOnChange = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    console.log("Sanitized content:", sanitizedContent);
    onChange(sanitizedContent);
  };

  return (
    <ReactQuill
      className="ql-snow"
      ref={quillRef}
      value={value}
      onChange={sanitizedOnChange}
      modules={modules}
    />
  );
};

export default QuillEditor;
