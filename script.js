document.getElementById('calculateBtn').addEventListener('click', function() {
    const age = parseInt(document.getElementById('age').value);
    const weight = parseInt(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const activityLevel = parseFloat(document.getElementById('activity').value);
  
    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
      alert('Please fill out all fields.');
      return;
    }
  
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;  // BMR formula for men
    const dailyCalories = bmr * activityLevel;  // Total daily energy expenditure
  
    // Display the calculated calories
    document.getElementById('calorieCount').textContent = dailyCalories.toFixed(0);
  
    // Suggest meals based on calories
    suggestMeals(dailyCalories);
  });
  
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