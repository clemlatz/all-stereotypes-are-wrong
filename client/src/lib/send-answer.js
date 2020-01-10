export default async function sendAnswer(
  round,
  couples,
  association1,
  association2,
  choice,
  token,
  setIsLoading,
  setStereotypesCount,
  setAnswers,
  setRound,
  setScore
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
      success && setScore(score => score + 1);

      // Update stereotypes count and increase round number
      setStereotypesCount(stats.stereotypes);
      setRound(round => round + 1);

      // Add answer to the list
      setAnswers(answers => {
        return [
          {
            round,
            couples,
            choice,
            results: { count, total, percent, success },
          },
          ...answers,
        ];
      });
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
}
