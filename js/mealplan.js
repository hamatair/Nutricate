    const filterTabs = document.getElementById('filterTabs');
    const searchInput = document.getElementById('search');
    const searchResult = document.getElementById('searchResult');
    const searchItems = Array.from(searchResult.querySelectorAll('.search-item'));

    const dateLabel = document.getElementById('dateLabel');
    const dateDisplay = document.getElementById('dateDisplay');
    const calendarPopup = document.getElementById('calendarPopup');
    const calendarMonthYear = document.getElementById('calendarMonthYear');
    const calendarGrid = document.getElementById('calendarGrid');
    const prevDateBtn = document.getElementById('prevDate');
    const nextDateBtn = document.getElementById('nextDate');

    // Track calories consumed per meal type per day
    const mealMaxCalories = {
      Breakfast: 500,
      Lunch: 660,
      Snack: 83,
      Dinner: 440,
    };

    // Store calories per date string (yyyy-mm-dd)
    let mealCaloriesByDate = {};

    // Current selected date
    let currentDate = new Date(2028, 8, 5); // 5th September 2028 (month 0-based)

    // Format date display like "5th September 2028"
    function formatDateDisplay(date) {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const suffix = getDaySuffix(day);
      return `${day}${suffix} ${month} ${year}`;
    }

    function getDaySuffix(day) {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    }

    // Update date label text
    function updateDateLabel() {
      dateDisplay.textContent = formatDateDisplay(currentDate);
    }

    // Initialize calories for current date if not exist
    function initCaloriesForDate(dateStr) {
      if (!mealCaloriesByDate[dateStr]) {
        mealCaloriesByDate[dateStr] = {
          Breakfast: 0,
          Lunch: 0,
          Snack: 0,
          Dinner: 0,
        };
      }
    }

    // Update all progress bars for current date
    function updateAllProgressBars() {
      const dateStr = currentDate.toISOString().slice(0, 10);
      initCaloriesForDate(dateStr);
      const calories = mealCaloriesByDate[dateStr];
      for (const mealType in calories) {
        updateProgress(mealType, calories[mealType]);
      }
    }

    // Update progress bar and text for a meal type and calories
    function updateProgress(mealType, current) {
      const max = mealMaxCalories[mealType];
      const percent = (current / max) * 100;

      // Update progress bar width
      const progressBar = document.getElementById(`progress-${mealType.toLowerCase()}`);
      if (progressBar) {
        progressBar.style.width = `${percent}%`;
      }

      // Update calories text
      const caloriesText = document.getElementById(`calories-${mealType.toLowerCase()}`);
      if (caloriesText) {
        caloriesText.innerHTML = `${current}<span>/${max}</span>`;
      }
    }

    // Filter items based on tab and search
    function filterItems() {
      const filter = filterTabs.querySelector('button.active').dataset.filter.toLowerCase();
      const searchTerm = searchInput.value.toLowerCase();

      searchItems.forEach(item => {
        const mealType = item.dataset.meal.toLowerCase();
        const title = item.querySelector('h4').textContent.toLowerCase();

        const matchesFilter = filter === 'all' || mealType === filter;
        const matchesSearch = title.includes(searchTerm);

        if (matchesFilter && matchesSearch) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }

    // Add to Meal Plan buttons
    searchItems.forEach(item => {
      const btn = item.querySelector('.btn-add');
      btn.addEventListener('click', () => {
        const mealType = item.dataset.meal;
        const calories = parseInt(item.dataset.calories, 10);
        const dateStr = currentDate.toISOString().slice(0, 10);

        initCaloriesForDate(dateStr);

        // Add calories to current meal calories, but do not exceed max
        mealCaloriesByDate[dateStr][mealType] = Math.min(
          mealCaloriesByDate[dateStr][mealType] + calories,
          mealMaxCalories[mealType]
        );

        updateProgress(mealType, mealCaloriesByDate[dateStr][mealType]);
      });
    });

    // Filter tabs click
    filterTabs.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') return;

      // Update active tab
      filterTabs.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.tabIndex = -1;
      });
      e.target.classList.add('active');
      e.target.setAttribute('aria-selected', 'true');
      e.target.tabIndex = 0;

      filterItems();
    });

    searchInput.addEventListener('input', () => {
      filterItems();
    });

    // Calendar logic
    let calendarYear = currentDate.getFullYear();
    let calendarMonth = currentDate.getMonth();

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function renderCalendar(year, month) {
    // Clear previous calendar
    calendarGrid.innerHTML = '';

    // Update the month and year header
    calendarMonthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

    // Day names header
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayNameEl = document.createElement('div');
        dayNameEl.className = 'calendar-day-name';
        dayNameEl.textContent = day;
        calendarGrid.appendChild(dayNameEl);
    });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // Fill empty slots before the first day of the month
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day disabled';
        calendarGrid.appendChild(emptyCell);
    }

    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;

        // Remove the 'selected' class from all previous days
        const selectedDay = calendarGrid.querySelector('.selected');
        if (selectedDay) {
        selectedDay.classList.remove('selected');
        }

        // Highlight the selected day
        if (
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth() &&
        day === currentDate.getDate()
        ) {
        dayEl.classList.add('selected');
        }

        // Add click event for selecting a day
        dayEl.addEventListener('click', () => {
        currentDate = new Date(year, month, day);
        updateDateLabel();
        calendarPopup.hidden = true;
        resetProgressBars();
        });

        calendarGrid.appendChild(dayEl);
    }
    }


    // Show/hide calendar popup
    dateLabel.addEventListener('click', (e) => {
      e.stopPropagation();
      calendarPopup.hidden = !calendarPopup.hidden;
      if (!calendarPopup.hidden) {
        calendarPopup.focus();
      }
    });

    // Close calendar if clicking outside
    document.addEventListener('click', () => {
      calendarPopup.hidden = true;
    });

    calendarPopup.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Calendar month navigation
    document.getElementById('calendarPrevMonth').addEventListener('click', () => {
      calendarMonth--;
      if (calendarMonth < 0) {
        calendarMonth = 11;
        calendarYear--;
      }
      renderCalendar(calendarYear, calendarMonth);
    });

    document.getElementById('calendarNextMonth').addEventListener('click', () => {
      calendarMonth++;
      if (calendarMonth > 11) {
        calendarMonth = 0;
        calendarYear++;
      }
      renderCalendar(calendarYear, calendarMonth);
    });

    // Prev/Next date buttons
    prevDateBtn.addEventListener('click', () => {
      currentDate.setDate(currentDate.getDate() - 1);
      calendarYear = currentDate.getFullYear();
      calendarMonth = currentDate.getMonth();
      updateDateLabel();
      renderCalendar(calendarYear, calendarMonth);
      resetProgressBars();
    });

    nextDateBtn.addEventListener('click', () => {
      currentDate.setDate(currentDate.getDate() + 1);
      calendarYear = currentDate.getFullYear();
      calendarMonth = currentDate.getMonth();
      updateDateLabel();
      renderCalendar(calendarYear, calendarMonth);
      resetProgressBars();
    });

    // Reset progress bars for current date (initialize if needed)
    function resetProgressBars() {
      const dateStr = currentDate.toISOString().slice(0, 10);
      initCaloriesForDate(dateStr);
      updateAllProgressBars();
    }

    // Initialize
    updateDateLabel();
    calendarYear = currentDate.getFullYear();
    calendarMonth = currentDate.getMonth();
    renderCalendar(calendarYear, calendarMonth);
    resetProgressBars();
    filterItems();
