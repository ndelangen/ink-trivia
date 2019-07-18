const React = require('react');
const { getQuestions } = require('./data');

const useCount = (startCount = 600, gameSpeed = 100) => {
	const [count, setCount] = React.useState(startCount);
	const done = count === 0;
	
	const ref = React.useRef(count);
  ref.current = count;
	
	React.useEffect(() => {
		let timer;
		if (!done) {
			timer = setInterval(() => { setCount(ref.current - 1)}, gameSpeed);
		}
		return () => {
			if (timer) {
				clearInterval(timer);
			}
		}
	}, [gameSpeed, done]);

	return [count, setCount];
}

const useQuestions = () => {
  const [questions, setQuestions] = React.useState(undefined);
  
  React.useMemo(() => {
    getQuestions((err, data) => {
      if(err){
        console.error(err);
        process.exit(1);
      }
      setQuestions(data);
    });
  }, []);

  return questions;

}

const useAppState = (teams) => {
  const [count, setCount] = useCount();
  const questions = useQuestions();
	const [state, setState] = React.useState({ 
    team: teams[0],
		round: 0,
		scores: teams.reduce((acc, i) => Object.assign(acc, {[i]: 0}), {}),
  });
  
	const next = (wasCorrect) => {
		if(state.round < 10) {
			setCount(600);
			setState({
				team: teams.reduce((acc, t, i, l) => {
					if (acc) {
						return acc;
					}
					if (state.team === t && i < l.length -1) {
						return l[i+1];
					}
					if (state.team === t && i === l.length -1) {
						return l[0];
					}
				}, false),
				round: state.round + 1,
				scores: wasCorrect ? {
					...state.scores,
					[state.team]: state.scores[state.team] + count,
				} : state.scores,
			});
		} else {
			setCount(0);
		}
	}

	if(count === 0 && state.round < 10) {
		next(false);
	} else if (state.round === 10 && count !== 0) {
		setCount(0);
	}
  
	return [state, questions, (questions ? count : 0), next]
}

module.exports = {
  useAppState,
};
