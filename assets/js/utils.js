// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const generateNewStartingState = (a) => {
  const arrangement = shuffle(["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"]);

  const tileState = arrangement.reduce((acc, curr, idx) => {
    acc[idx] = {
      content: curr,
      matched: false,
      hidden: true,
      id: idx
    }

    return acc;
  }, {});

  return {
    step: steps.CHOOSE,
    score: 0,
    tileState
  }
}

export const steps = {
  CHOOSE: "choose",
  MATCH: "match",
  MISS: "miss"
};


