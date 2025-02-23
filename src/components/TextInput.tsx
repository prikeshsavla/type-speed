import { useEffect, useRef } from 'react';

const TextInput = ({
  postContent,
  setPostContent,
  isValid,
  disabled,
  autoFocus,
}: {
  postContent: string;
  setPostContent: Function;
  isValid: boolean;
  disabled: boolean;
  autoFocus: boolean;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <textarea
      data-testid="input"
      id="text-input"
      cols={70}
      disabled={disabled}
      rows={5}
      // style={{visibility: 'hidden'}}
      value={postContent}
      onChange={(e) => setPostContent(e.target.value)}
      aria-invalid={!isValid}
      ref={textAreaRef}
    ></textarea>
  );
};

export default TextInput;
