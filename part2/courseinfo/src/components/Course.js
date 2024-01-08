import React from 'react'

const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({ course }) => <b>Number of exercises {course.parts.reduce((sum, curr) => sum + curr.exercises, 0)}</b>

const Part = (props) => <p> {props.part.name} {props.part.exercises} </p>

const Content = ({ course }) => course.parts.map(part => <Part key={part.id} part={part} />)

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course