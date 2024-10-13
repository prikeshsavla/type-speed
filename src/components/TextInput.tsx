const TextInput = ({
  postContent,
  setPostContent,
  isValid,
}: {
  postContent: string;
  setPostContent: Function;
  isValid: boolean;
}) => {
  return (
    <textarea
      data-testid="input"
      cols={70}
      rows={5}
      value={postContent}
      onChange={(e) => setPostContent(e.target.value)}
      aria-invalid={!isValid}
    ></textarea>
  );
};

export default TextInput;
