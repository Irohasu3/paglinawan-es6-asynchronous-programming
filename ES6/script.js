class Student {
  constructor(id, name, age, course) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }

  introduce() {
    return `Hi, my name is ${this.name}, I am ${this.age} years old, and I am enrolled in ${this.course}.`;
  }
}

class Instructor {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }

  teach() {
    return `I am ${this.name} and I teach ${this.subject}.`;
  }
}


function renderOutput(students, courses, instructors) {
  const output = document.getElementById("output");
  output.innerHTML = "";

  
  let studentList = "<h2>Students:</h2><ul>";
  students.forEach(s => {
    let highlight = s.age > 21 ? " <strong>*</strong>" : "";
    studentList += `<li>${s.name} (${s.age}) - ${s.course}${highlight}</li>`;
  });
  studentList += "</ul>";

  
  let courseList = "<h2>Courses:</h2><ul>";
  courses.forEach(c => {
    courseList += `<li>${c.title}: ${c.description}</li>`;
  });
  courseList += "</ul>";

  
  let instructorList = "<h2>Instructors:</h2><ul>";
  instructors.forEach(i => {
    instructorList += `<li>${i.name} - ${i.subject}</li>`;
  });
  instructorList += "</ul>";

  
  let relation = "<h2>Data Relationships:</h2>";
  students.forEach(s => {
    const course = courses.find(c => c.title === s.course);
    relation += `<p>${s.name} → ${s.course} → ${course.description}</p>`;
  });

  courses.forEach(c => {
    let instructor = instructors[Math.floor(Math.random() * instructors.length)];
    relation += `<p>${c.title} → Taught by ${instructor.name}</p>`;
  });

  output.innerHTML = studentList + courseList + instructorList + relation;
}


function loadDataWithPromises() {
  fetch("data/students.json")
    .then(response => response.json())
    .then(data => {
      const students = data.students.map(s => new Student(s.id, s.name, s.age, s.course));
      const instructors = data.instructors.map(i => new Instructor(i.id, i.name, i.subject));
      const courses = data.courses;

      console.log("Using Promises:", { students, instructors, courses });
      renderOutput(students, courses, instructors);
    })
    .catch(err => console.error("Error loading JSON:", err));
}


async function loadDataWithAsync() {
  try {
    const response = await fetch("data/students.json");
    const data = await response.json();

    const students = data.students.map(s => new Student(s.id, s.name, s.age, s.course));
    const instructors = data.instructors.map(i => new Instructor(i.id, i.name, i.subject));
    const courses = data.courses;

    console.log("Using Async/Await:", { students, instructors, courses });
    renderOutput(students, courses, instructors);
  } catch (error) {
    console.error("Error with async/await:", error);
  }
}


loadDataWithPromises();

