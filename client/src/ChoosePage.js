import React, { useEffect, useState } from "react";

import Line from "./Line";
import Question from "./Question";

export default function ChoosePage({ choosePageClasses, setStereotypesCount }) {
  const [round, setRound] = useState(1);
  const [lineNum, setLineNum] = useState(1);
  const [lines, setLines] = useState([], "lines");
  const [score, setScore] = useState(0);

  // Get stereotypescount count
  useEffect(() => {
    async function fetchStats() {
      const response = await fetch("/stats");
      const stats = await response.json();
      setStereotypesCount(stats.stereotypes);
    }
    fetchStats();
  }, [setStereotypesCount]);

  return (
    <div className={choosePageClasses.join(" ")}>
      {/* Current line */}
      <Question
        round={round}
        setStereotypesCount={setStereotypesCount}
        setRound={setRound}
        setLineNum={setLineNum}
        lineNum={lineNum}
        setLines={setLines}
        setScore={setScore}
        score={score}
      ></Question>

      {/* Answers list */}
      <div className="answers">
        {lines.map(
          ({ lineNum, round, type, couples, choice, results, score }) => {
            if (type === "score") {
              return <Line key={lineNum} type="score" score={score} />;
            }

            const [couple1, couple2] = couples;
            return (
              <Line
                key={lineNum}
                type="answer"
                round={round}
                couple1={couple1}
                couple2={couple2}
                currentChoice={choice}
                results={results}
                score={score}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
