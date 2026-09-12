import useFeedbackStore from './store'

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = () => {
  const { good, neutral, bad } = useFeedbackStore()
  const total = good + neutral + bad
  if (total === 0) return <p>No feedback given</p>
  return <table><tbody>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="all" value={total} />
    <StatisticLine text="average" value={(good - bad) / total} />
    <StatisticLine text="positive" value={`${(good / total) * 100} %`} />
  </tbody></table>
}

const App = () => {
  const { giveGood, giveNeutral, giveBad, reset } = useFeedbackStore()
  return <main>
    <h1>give feedback</h1>
    <div className="buttons">
      <button onClick={giveGood}>good</button>
      <button onClick={giveNeutral}>neutral</button>
      <button onClick={giveBad}>bad</button>
      <button onClick={reset}>reset</button>
    </div>
    <h2>statistics</h2>
    <Statistics />
  </main>
}

export default App
