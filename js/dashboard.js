const calendarHeader = document.querySelector('.calendar-header');
const calendarDays = document.querySelector('.calendar-days');
let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();


  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  document.querySelector('.card.calendar-card h6').textContent = `${monthNames[month]} ${year}`;



  const dayOfWeek = (new Date(year, month, day).getDay() + 6) % 7;
  const monday = day - dayOfWeek;
  const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];




  html += '<div class="calendar-week">';
  for (let i = 0; i < 7; i++) {
    const dateNum = monday + i;
    const isCurrentMonth = dateNum > 0 && dateNum <= daysInMonth;
    if (isCurrentMonth) {
      html += `<span class="calendar-date${dateNum === day ? ' active' : ''}" data-date="${dateNum}">${dateNum}</span>`;
    } else {
      html += `<span class="text-muted"></span>`;
    }
  }
  html += '</div>';

  calendarDays.innerHTML = html;


  document.querySelectorAll('.calendar-date').forEach(span => {
    span.addEventListener('click', function() {
      currentDate.setDate(Number(this.dataset.date));
      renderCalendar(currentDate);
    });
  });
}


document.querySelectorAll('.calendar-card .fa-chevron-left, .calendar-card .fa-chevron-right').forEach(btn => {
  btn.addEventListener('click', function() {
    if (this.classList.contains('fa-chevron-left')) currentDate.setMonth(currentDate.getMonth() - 1);
    else currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(1);
    renderCalendar(currentDate);
  });
});

renderCalendar(currentDate);