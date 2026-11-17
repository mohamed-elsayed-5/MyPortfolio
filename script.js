const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();

let motionTimer;
const radar = document.querySelector('#radar');
const sensorStatus = document.querySelector('#sensor-status');
document.querySelector('#motion-button').addEventListener('click', () => {
  clearTimeout(motionTimer);
  radar.classList.add('detected');
  sensorStatus.replaceChildren(Object.assign(document.createElement('i'), {}), document.createTextNode('MOTION DETECTED'));
  motionTimer = setTimeout(() => {
    radar.classList.remove('detected');
    sensorStatus.replaceChildren(document.createElement('i'), document.createTextNode('STANDBY'));
  }, 3500);
});

const seats = document.querySelector('#seats');
const seatStatus = document.querySelector('#seat-status');
const unavailable = [3, 10, 11, 21];
for (let i = 0; i < 32; i++) {
  const seat = document.createElement('button');
  const name = String.fromCharCode(65 + Math.floor(i / 8)) + (i % 8 + 1);
  seat.className = 'seat';
  seat.type = 'button';
  seat.disabled = unavailable.includes(i);
  seat.setAttribute('aria-label', 'Seat ' + name + (seat.disabled ? ', unavailable' : ''));
  seat.setAttribute('aria-pressed', 'false');
  seat.addEventListener('click', () => {
    const selected = seat.classList.contains('selected');
    seats.querySelectorAll('button').forEach(button => {
      button.classList.remove('selected');
      button.setAttribute('aria-pressed', 'false');
    });
    if (!selected) {
      seat.classList.add('selected');
      seat.setAttribute('aria-pressed', 'true');
    }
    seatStatus.textContent = selected ? 'Pick a seat' : 'Seat ' + name + ' selected';
  });
  seats.append(seat);
}

const projects = {
  motion: {
    category: 'COMPUTER ORGANIZATION',
    title: 'Motion Sensor',
    description: 'A course project centered on motion sensing and the connection between physical input and a computer’s response.',
    points: ['Motion detection as an input to a computing system.', 'How hardware signals connect to program logic.', 'The relationship between sensing, processing, and output.'],
    note: 'Try “Simulate motion” on the project card. It illustrates a detection event in the browser; it is not connected to a live sensor.'
  },
  movie: {
    category: 'OBJECT-ORIENTED PROGRAMMING · JAVA',
    title: 'Movie Booking System',
    description: 'A Java coursework project that uses the familiar world of cinema to explore object-oriented software design.',
    points: ['Representing users, movies, shows, and bookings in a system.', 'Organizing responsibilities with classes and objects.', 'Connecting a booking workflow to object-oriented concepts.'],
    note: 'The seat selector is an illustrative JavaScript concept made for this portfolio. It does not make real bookings or run the Java application.'
  }
};

Object.assign(projects, {"face": {"category": "COMPUTER VISION / TEAM LEADER", "title": "Face Recognition Door Lock System", "description": "Led a six-member team building a smart security system that combines real-time face recognition with keypad fallback authentication.", "points": ["Used Python, OpenCV, Arduino Uno, a keypad, LCD, buzzer, LEDs, and a servo motor.", "Designed and implemented the real-time authentication workflow.", "Helped plan the project, divide tasks, test hardware/software integration, debug issues, and prepare the final presentation."], "note": "Team project. My role included leadership, implementation, integration, and testing."}, "hospital": {"category": "C++ / CONSOLE APPLICATION", "title": "Hospital Management System", "description": "Developed a console-based hospital management application using C++ programming fundamentals.", "points": ["Implemented patient, doctor, room, and billing modules.", "Used arrays, structs, enumerations, functions, and pointers.", "Added file input/output to save and load system data between program runs."], "note": "A practical application of programming fundamentals and persistent file storage."}, "time": {"category": "SOFTWARE ENGINEERING INTERNSHIP", "title": "Time Management System", "description": "Worked with a three-member team on a full-stack Time Management System during my August-September 2025 internship.", "points": ["Contributed to frontend development and basic backend tasks.", "Worked on testing, debugging, and feature improvements.", "Collaborated with the QA team to identify issues and improve stability before delivery."], "note": "Collaborative internship project. The description reflects my contributions to the team."}});

const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    document.querySelector('#dialog-category').textContent = project.category;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-description').textContent = project.description;
    document.querySelector('#dialog-note').textContent = project.note;
    const list = document.querySelector('#dialog-points');
    list.replaceChildren();
    project.points.forEach(point => {
      const item = document.createElement('li');
      item.textContent = point;
      list.append(item);
    });
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelectorAll('.dialog-close, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
