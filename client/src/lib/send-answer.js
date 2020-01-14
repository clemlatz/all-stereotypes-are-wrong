export default async function sendAnswer(
  round,
  lineNum,
  couples,
  association1,
  association2,
  choice,
  token,
  setIsLoading,
  setStereotypesCount,
  setRound,
  setLineNum,
  setLines,
  setScore,
  score
) {
  try {
    const [couple1, couple2] = couples;
    setIsLoading(true);
    const response = await fetch('/answer', {
      method: 'POST',
      body: JSON.stringify({
        association1,
        association2,
        couple1: couple1.id,
        couple2: couple2.id,
        token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsLoading(false);
    const json = await response.json();
    if (json.error) {
      throw json.error;
    } else {
      // Get stats from server response and calculate percent
      const { count, total, stats } = json;
      const percent = Math.floor((count / total) * 100);

      // If user is successful (at least 50% of responses matches theirs),
      // increase score
      const success = percent >= 50;
      if (success) {
        score = score + 1;
        setScore(score);
      }

      // Update stereotypes count and increase round number
      setStereotypesCount(stats.stereotypes);

      // Increase line number
      lineNum = lineNum + 1;
      setLineNum(lineNum);

      // Add answer to the list
      setLines(lines => {
        return [
          {
            round,
            lineNum,
            type: 'answer',
            couples,
            choice,
            results: { count, total, percent, success },
          },
          ...lines,
        ];
      });

      // If this was the 10th round, add score line to answers list
      // and reset round to 0
      if (round === 10) {
        // Increase line number
        lineNum = lineNum + 1;
        setLineNum(lineNum);

        setLines(lines => {
          return [
            {
              round,
              lineNum,
              type: 'score',
              couples: {},
              results: {},
              score,
            },
            ...lines,
          ];
        });
        setRound(1);
        setScore(0);
      }

      // Else increase round
      else {
        setRound(round => round + 1);
      }
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
}
