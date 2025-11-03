// course.js - course array, dynamic rendering, filters, and total credits
document.addEventListener('DOMContentLoaded', () => {
  // Course List Array (copy into this file). Update completed: true for courses you've finished.
  const courses = [
    { id: 1, title: "WDD 130 - Intro to Web", code: "WDD130", category: "WDD", credits: 3, completed: true, description: "Intro to HTML & CSS." },
    { id: 2, title: "WDD 131 - CSS Layouts", code: "WDD131", category: "WDD", credits: 3, completed: true, description: "Responsive layout techniques." },
    { id: 3, title: "WDD 231 - JavaScript", code: "WDD231", category: "WDD", credits: 4, completed: false, description: "DOM, events, and APIs." },
    { id: 4, title: "CSE 110 - Programming Foundations", code: "CSE110", category: "CSE", credits: 3, completed: true, description: "Intro to programming." },
    { id: 5, title: "CSE 220 - Data Structures", code: "CSE220", category: "CSE", credits: 3, completed: false, description: "Basic DS & algorithms." }
    // ... add remaining courses as needed
  ];

  // DOM refs
  const coursesList = document.getElementById('coursesList');
  const totalCreditsEl = document.getElementById('totalCredits');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function renderCourseCard(course) {
    const wrapper = document.createElement('article');
    wrapper.className = 'course-card';
    wrapper.setAttribute('role', 'article');
    wrapper.setAttribute('aria-label', `${course.title} (${course.code})`);

    if (course.completed) wrapper.classList.add('completed');

    const meta = document.createElement('div');
    meta.className = 'meta';

    const title = document.createElement('h3');
    title.className = 'course-title';
    title.textContent = `${course.title}`;

    const sub = document.createElement('p');
    sub.className = 'course-sub';
    sub.textContent = `${course.code} · ${course.category} · ${course.credits} credits`;

    const desc = document.createElement('p');
    desc.className = 'course-desc';
    desc.textContent = course.description;

    meta.appendChild(title);
    meta.appendChild(sub);
    meta.appendChild(desc);

    // optional badge for completed
    const status = document.createElement('div');
    status.className = 'status';
    status.setAttribute('aria-hidden', 'true');
    status.textContent = course.completed ? 'Completed' : 'In progress';

    wrapper.appendChild(meta);
    wrapper.appendChild(status);
    return wrapper;
  }

  function displayCourses(list) {
    coursesList.innerHTML = '';
    if (!list.length) {
      coursesList.innerHTML = '<p>No courses match the selected filter.</p>';
      totalCreditsEl.textContent = '0';
      return;
    }

    list.forEach(course => {
      const node = renderCourseCard(course);
      coursesList.appendChild(node);
    });

    // calculate total credits using reduce of currently displayed courses
    const totalCredits = list.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
    totalCreditsEl.textContent = totalCredits;
  }

  // initial display all
  displayCourses(courses);

  // filter logic
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      if (filter === 'all') {
        displayCourses(courses);
      } else {
        const filtered = courses.filter(c => c.category === filter);
        displayCourses(filtered);
      }
    });
  });

  // Keyboard accessible: allow Enter on filter buttons
  filterButtons.forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') btn.click();
    });
  });

});
