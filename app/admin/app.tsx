"use client"

import simpleRestProvider from "ra-data-simple-rest"
import { Admin, Resource } from  "react-admin"

import { CourseList } from "./course/list"
import { CourseEdit } from "./course/course-edit"
import { CourseCreate } from "./course/course-create"
import { UnitList } from "./unit/list"
import { UnitEdit } from "./unit/unit-edit"
import { UnitCreate } from "./unit/unit-create"
import { LessonList } from "./lesson/list"
import { LessonEdit } from "./lesson/lesson-edit"
import { LessonCreate } from "./lesson/lesson-create"
import { ChallengeList } from "./challenge/list"
import { ChallengeEdit } from "./challenge/challenge-edit"
import { ChallengeCreate } from "./challenge/challenge-create"
import { ChallengeOptionList } from "./challengeOption/list"
import { ChallengeOptionEdit } from "./challengeOption/challenge-option-edit"
import { ChallengeOptionCreate } from "./challengeOption/challenge-option-create"

const dataProvider = simpleRestProvider("/api")

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource 
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation={"title"}
      />
      
      <Resource 
        name="units"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation={"title"}
      />
      
      <Resource 
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation={"title"}
      />
      
      <Resource 
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation={"question"}
      />
      
      <Resource 
        name="challengeOptions"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        recordRepresentation={"text"}
        options={{label: "Challenge options"}}
      />
    </Admin>
  )
}

export default App