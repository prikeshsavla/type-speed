const TextInput = ({
  postContent,
  setPostContent,
  isValid,
  disabled,
}: {
  postContent: string;
  setPostContent: Function;
  isValid: boolean;
  disabled: boolean;
}) => {
  return (
    <textarea
      data-testid="input"
      id="text-input"
      cols={70}
      disabled={disabled}
      rows={5}
      value={postContent}
      onChange={(e) => setPostContent(e.target.value)}
      aria-invalid={!isValid}
    ></textarea>
  );
};

export default TextInput;
