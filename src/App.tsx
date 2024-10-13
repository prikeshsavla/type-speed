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
  const [inputDisabled, setInputDisabled] = useState(true);

  const compareString = (original: string, input: string): boolean => {
    return original.startsWith(input);
  };

  const resetTest = (): void => {
    setTimer(5);
    setPostContent("");
    setValidInput("");
    setFinalInput("");
  };
  const startTest = (): void => {
    resetTest();
    setPhrase(generatePhrase());
    setInputDisabled(false);
    document.getElementById("text-input")?.focus();
    countdown(5, setTimer);
  };

  useEffect(() => {
    if (timer == 0 && (finalInput + validInput).trim().length != 0) {
      const cpm = (finalInput + validInput).length;
      const wpm = wordCount(finalInput + validInput);
      resetTest();
      setInputDisabled(true);
      alert(`Test finished: CPM: ${cpm}, WPM: ${wpm}`);
    }
  }, [timer]);

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
      <button onClick={startTest}>Start Typing Test</button>
      <p>{phrase}</p>
      <TextInput
        disabled={inputDisabled}
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
