
import { useId, useState } from 'react';
import './App.css';

function App() {

  const [questionnaire, setQuestionnaire] = useState([

    {
      id: useId(),
      question: `You're really busy at work and a colleague is telling you their life story and personal woes. You:`,
      answer: [
        {id:useId(), title: `Don't dare to interrupt them`, score: 4},

        {
          id: useId(), 
        title: `Think it's more important to give them some of your time; work can wait`,
        score: 3
        },
        {
          id: useId(),
          title: `Listen, but with only with half an ear`,
          score: 2
        },
        {
          id: useId(),
          title: `interrupt and explain that you are really busy at the moment`,
          score: 1
        }
      ]
    },

    {
      id: useId(),
      question: `You're having an animated discussion with a colleague regarding a project that you're in charge of. You:`,
      answer: [
        {id:useId(), title: `Don't dare contradict them`, score: 4},

        {
          id: useId(), 
        title: `Think that they are obviously right`,
        score: 3
        },
        {
          id: useId(),
          title: `Defennd your own point of view tooth and nail`,
          score: 2
        },
        {
          id: useId(),
          title: `continuously interrup your colleague`,
          score: 1
        }
      ]
    },

    {
      id: useId(),
      question: `You've been sitting in the doctors waiting room for more than 25minutes. You:`,
      answer: [
        {id:useId(), title: `Look at yopur watch every two minutes`, score: 4},

        {
          id: useId(), 
        title: `Bubble with inner anger, but keep quiet`,
        score: 3
        },
        {
          id: useId(),
          title: `Explain to other equally impatient people in the room that the doctor is always running late`,
          score: 2
        },
        {
          id: useId(),
          title: `complain in a loud voice while tapping your foot impatiently`,
          score: 1
        }
      ]
    }
  ])

  const [currentQuestionIndex, setCuurentQuestionIndex] = useState(0)

  const selectAnswerHandler = (questionId, answer) => {
    const newQuestionnaire = questionnaire.map((question) => {
      if (question.id === questionId) {
        question.selectedAnswer = answer
      }
return question
    }
    )
    setQuestionnaire(newQuestionnaire)
  }
  const nextQuestionHandler = () => {
    setCuurentQuestionIndex(currentQuestionIndex + 1)
  }

  const previousQuestionHandler = () => {
    setCuurentQuestionIndex(currentQuestionIndex - 1)
  }

  const submitHandler = () => {
    const totalScores = questionnaire.reduce(
      (a, c) => a + c.selectedAnswer.score,
      0
    )

    if (totalScores <= 6) {
      alert(`You are a bloody Introvert`)
    } else {
      alert(`You are highly extroverted`)
    }

    window.location.reload()
  }

  return (
    <div className="main">
      <h1>
        Questions {currentQuestionIndex + 1}/{questionnaire.length}
      </h1>

      {questionnaire.map((question, index) => (
        <div
          className={
            index === currentQuestionIndex
              ? "show question_div"
              : "hide question_div"
          }
          key={question.id}
        >
          <h1>{question.question}</h1>

          <ul className="answers-ctn">
            {question.answers.map((answer, i) => (
              <li
                className={
                  question?.selectedAnswer?.id === answer.id ? "selected" : ""
                }
                key={i}
                onClick={() => selectAnswerHandler(question.id, answer)}
              >
                {answer.title}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="buttons_div">
        {currentQuestionIndex !== 0 && (
          <button onClick={previousQuestionHandler}>Previous</button>
        )}
        {currentQuestionIndex + 1 !== questionnaire.length ? (
          <>
            {questionnaire[currentQuestionIndex].selectedAnswer && (
              <button onClick={nextQuestionHandler}>Next</button>
            )}
          </>
        ) : (
          <>
            {questionnaire[currentQuestionIndex].selectedAnswer && (
              <button onClick={submitHandler}>Submit</button>
            )}
          </>
        )}
      </div>
    </div>
  )
}


export default App;
