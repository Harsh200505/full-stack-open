const Person = ({ person, onDelete }) => (
  <p>
    {person.name} {person.number}{' '}
    <button onClick={() => onDelete(person)}>delete</button>
  </p>
)

const Persons = ({ persons, onDelete }) => (
  <div>
    {persons.map((person) => (
      <Person key={person.id} person={person} onDelete={onDelete} />
    ))}
  </div>
)

export default Persons

