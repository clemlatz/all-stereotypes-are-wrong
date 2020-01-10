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
  setRound
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
      const { count, total } = json;
      const percent = Math.floor((count / total) * 100);
      const success = percent >= 50;
      setStereotypesCount(json.stats.stereotypes);
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
      setRound(round => round + 1);
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
}
