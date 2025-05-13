document.getElementById('calculateBtn').addEventListener('click', function () {
  const age = parseInt(document.getElementById('age').value);
  const weight = parseInt(document.getElementById('weight').value);
  const height = parseInt(document.getElementById('height').value);
  const activityLevel = parseFloat(document.getElementById('activity').value);

  if (isNaN(age) || isNaN(weight) || isNaN(height)) {
    alert('Please fill out all fields.');
    return;
  }

  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const dailyCalories = Math.round(bmr * activityLevel);

  const inputSection = document.getElementById('inputSection');
  const resultsSection = document.getElementById('resultsSection');

  inputSection.style.opacity = '0';
  inputSection.style.transform = 'translateY(-40px)';
  setTimeout(() => {
    inputSection.style.display = 'none';
    resultsSection.classList.add('show');
    animateCalories(0, dailyCalories);
    suggestMeals(dailyCalories);
  }, 500);
});

function animateCalories(start, end) {
  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(progress * (end - start) + start);
    document.getElementById('calorieCount').textContent = currentValue + ' kcal';
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function suggestMeals(calories) {
  let mealSuggestions = '';

  if (calories < 2000) {
    mealSuggestions = `
      <ul>
        <li>Breakfast: Oatmeal with fruits (300 kcal)</li>
        <li>Lunch: Grilled chicken salad (500 kcal)</li>
        <li>Dinner: Baked salmon with steamed veggies (400 kcal)</li>
        <li>Snacks: Yogurt with almonds (200 kcal)</li>
      </ul>
    `;
  } else if (calories < 2500) {
    mealSuggestions = `
      <ul>
        <li>Breakfast: Scrambled eggs with avocado (450 kcal)</li>
        <li>Lunch: Chicken rice bowl (700 kcal)</li>
        <li>Dinner: Grilled steak with roasted potatoes (600 kcal)</li>
        <li>Snacks: Protein smoothie (300 kcal)</li>
      </ul>
    `;
  } else {
    mealSuggestions = `
      <ul>
        <li>Breakfast: Pancakes with bacon (600 kcal)</li>
        <li>Lunch: Turkey sandwich with cheese (800 kcal)</li>
        <li>Dinner: Grilled fish with quinoa and veggies (700 kcal)</li>
        <li>Snacks: Peanut butter toast (400 kcal)</li>
      </ul>
    `;
  }

  document.getElementById('mealSuggestions').innerHTML = mealSuggestions;
}

document.getElementById('toggleTheme').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode');
});
