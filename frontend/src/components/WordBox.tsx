import { useCallback, useEffect, useRef, useState } from "react";
import { useGameContext } from "../context/GameContext";
import Word from "./Word";
import Cursor from "./Cursor";
import { debounce } from "lodash";

export function WordBox() {
  const { currLetterIdx, currWordIdx, gameWords, wordsClassNames, isLoading } =
    useGameContext();

  const wordBoxRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });

  const updateScrollPosition = useCallback(() => {
    if (isLoading || !wordBoxRef.current) return;

    const currentWordElement =
      wordBoxRef.current.children[currWordIdx];

    if (currentWordElement instanceof HTMLElement) {
      currentWordElement.scrollIntoView({
        behavior: "instant",
        block: "nearest"
      });
    }
  }, [currWordIdx, isLoading]);

  const updateCursorPosition = useCallback(() => {
    if (!wordBoxRef.current) return;

    const currWordElement =
      wordBoxRef.current.children[currWordIdx] as HTMLElement | undefined;

    if (!currWordElement) return;

    const currLetterElement =
      currWordElement.children[currLetterIdx] as HTMLElement | undefined;

    const prevLetterElement =
      currWordElement.children[currLetterIdx - 1] as HTMLElement | undefined;

    if (currLetterElement) {
      const rect = currLetterElement.getBoundingClientRect();
      setCursorPosition({ top: rect.top + 2, left: rect.left });
    } else if (prevLetterElement) {
      const rect = prevLetterElement.getBoundingClientRect();
      const wordRight = currWordElement.getBoundingClientRect().right;
      setCursorPosition({ top: rect.top + 2, left: wordRight });
    }
  }, [currLetterIdx, currWordIdx]);

  const handleResize = useCallback(
    debounce(() => {
      updateCursorPosition();
    }, 300),
    [updateCursorPosition]
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    updateScrollPosition();
  }, [gameWords, wordsClassNames, currWordIdx, updateScrollPosition]);

  useEffect(() => {
    updateCursorPosition();
  }, [currLetterIdx, updateCursorPosition]);

  return (
    <>
      <Cursor top={cursorPosition.top} left={cursorPosition.left} />
      <div className="wordbox" ref={wordBoxRef}>
        {gameWords.map((_, idx) => (
          <Word key={idx} wordIdx={idx} />
        ))}
      </div>
    </>
  );
}

export default WordBox;
