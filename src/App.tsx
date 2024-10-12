import { useEffect, useState } from 'react'
import './App.css'
import generatePhrase from './lib/phraseGenerator';

function App() {
  const [phrase, setPhrase] = useState(generatePhrase())
  const [postContent, setPostContent] = useState('');
  const [validInput, setValidInput] = useState('');
  const [finalInput, setFinalInput] = useState('');

  useEffect(() => {
    if(compareString(phrase, postContent)){
      setValidInput(postContent)
    }
    if(phrase == postContent){
      setFinalInput(finalInput + validInput)
      setPhrase(generatePhrase())
      setPostContent('')
    }
  }, [finalInput, validInput, phrase, postContent]);

  const validatePostContent =  (): string => {
    if(compareString(phrase, postContent)){
      return 'lightgreen'
    }
    else {
      return 'orange'
    }
  }

  const compareString = (original: string, input:string) : boolean => {
    return original.indexOf(input) == 0 
  }
  
  return (
    <>
      <p>
      {phrase}
      </p>

      <textarea data-testid="input" style={{backgroundColor: validatePostContent(), color: 'black'}} cols={70} rows={20} value={postContent} 
      onChange={e => setPostContent(e.target.value)} ></textarea>
      <div>
        <ul>
          <li data-testid='user-char-count'>Char count: {(finalInput + validInput).length} / {(finalInput + phrase).length}</li>
          <li data-testid='user-word-count'>Word count: {(finalInput + validInput).split(' ').length} / {(finalInput +phrase).split(" ").length}</li>
          <li>Time Left: 10s</li>
        </ul>
        
        <p>
        ValidInput: {validInput}
        </p>
        <p>
          Final Input: {finalInput}
        </p>
        </div>
    </>
  )
}

export default App
