import { useCallback, useEffect, useState } from "react";
import generatePhrase from "./lib/utilities";
import countdown from "./lib/countdown";
import TextInput from "./components/TextInput";

function App() {
  const [phrase, setPhrase] = useState(generatePhrase());
  const [postContent, setPostContent] = useState("");
  const [validInput, setValidInput] = useState("");
  const [finalInput, setFinalInput] = useState("");
  const [timer, setTimer] = useState(60);

  const compareString = (original: string, input: string): boolean => {
    return original.startsWith(input);
  };

  useEffect(() => {
    countdown(60, setTimer);
  }, []);

  useEffect(() => {
    if (compareString(phrase, postContent)) {
      setValidInput(postContent);
    }
    if (phrase == postContent) {
      setFinalInput((prevFinalInput) =>
        (prevFinalInput + " " + postContent).trim()
      );
      setPhrase(generatePhrase());
      setPostContent("");
    }
  }, [phrase, postContent]);

  const isValidPostContent = useCallback((): boolean => {
    return compareString(phrase, postContent);
  }, [phrase, postContent]);

  const wordCount = (str: string): number => {
    const words = str.match(/\S+/g);
    if (words && words.length !== 0) {
      return words.length;
    } else {
      return 0;
    }
  };

  return (
    <>
      <p>{phrase}</p>
      <TextInput
        postContent={postContent}
        setPostContent={setPostContent}
        isValid={isValidPostContent()}
      />
      <div>
        <ul>
          <li data-testid="user-char-count">
            Char count: {(finalInput + validInput).length} /{" "}
            {(finalInput + phrase).length}
          </li>
          <li data-testid="user-word-count">
            Word count: {wordCount(finalInput + validInput)} /{" "}
            {wordCount(finalInput + phrase)}
          </li>
          <li>Time Left : {timer}s</li>
        </ul>

        <p>ValidInput: {validInput}</p>
        <p>Final Input: {finalInput}</p>
      </div>
    </>
  );
}

export default App;
