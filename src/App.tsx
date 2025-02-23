import { useCallback, useEffect, useState } from "react";
import {generatePhrase, countdown} from "./lib/utilities";
// import countdown from "./lib/countdown";
import TextInput from "./components/TextInput";
import CompareText from "./components/CompareText";

function App() {
  const TEST_TIME = 10;
  const DEBUG = true;
  const [phrase, setPhrase] = useState("");
  const [postContent, setPostContent] = useState("");
  const [validInput, setValidInput] = useState("");
  const [finalInput, setFinalInput] = useState("");
  const [timer, setTimer] = useState(60);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [autoFocus, setAutoFocus] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const compareString = (original: string, input: string): boolean => {
    return original.startsWith(input);
  };

  const resetTest = (): void => {
    setTimer(TEST_TIME);
    setPostContent("");
    setValidInput("");
    setFinalInput("");
  };
  const startTest = (): void => {
    resetTest();
    if(phrase == ""){
      setPhrase(generatePhrase());
    }
    setInputDisabled(false);
    setAutoFocus(true);
    countdown(TEST_TIME, setTimer);
  };

  useEffect(() => {
    if (timer == 0 && (finalInput + validInput).trim().length != 0) {
      const cpm = (finalInput + validInput).length;
      const wpm = wordCount(finalInput + validInput);
      setPhrase("");
      setPostContent("");
      setInputDisabled(true);
      setAutoFocus(false);
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

  useEffect(() => {
    if(!compareString(phrase, postContent)){
      console.log("Error");
    }
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
      <article>
        <CompareText source={phrase} target={postContent} />
      </article>
      <TextInput
        disabled={inputDisabled} 
        postContent={postContent}
        setPostContent={setPostContent}
        isValid={isValidPostContent()}
        autoFocus={autoFocus}
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
        
        {DEBUG &&
          <article>
            DEBUG: 
            <p>ValidInput: {validInput}</p>
            <p>Final Input: {finalInput}</p>
            <p>Errors: {errors}</p>
          </article>
        }
        
      </div>
    </>
  );
}

export default App;
