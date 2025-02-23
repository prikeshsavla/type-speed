interface CharacterMap {
    text: string;
    isCorrect: boolean;
    isPresent: boolean;
}
const CompareText = ({ source, target}: {source: string, target: string}) => {
    const textMap:CharacterMap[] = source.split("").map((char: string, index: number) => {
        return {
            text: char,
            isCorrect: target[index] === char,
            isPresent: index < target.length
        }
    })

    const textSpan = (textMap: CharacterMap[]) => {
        return textMap.map((char, index) => {
            return (
                <span key={index} style={{color: char.isPresent? (char.isCorrect ? "white" : "red"): "grey"}}>
                    {char.text}
                </span>
            )
        })
    }

    return (
        <>
        {textSpan(textMap)}
        </>
    )
}
export default CompareText;