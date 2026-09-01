const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return <strong>total of {total} exercises</strong>
}

const Course = ({ course }) => (
  <section>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </section>
)

export default Course

