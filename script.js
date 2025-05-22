document.getElementById('calculateBtn').addEventListener('click', function () {
  const age = parseInt(document.getElementById('age').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const activityLevel = parseFloat(document.getElementById('activity').value);
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  if (isNaN(age) || isNaN(weight) || isNaN(height) || !gender || isNaN(activityLevel)) {
    alert('Please fill out all fields.');
    return;
  }

  // Calcul du BMR selon le sexe
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Dépense calorique journalière estimée
  const dailyCalories = Math.round(bmr * activityLevel);

  // Animation d'affichage des résultats
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
        <li>Petit déjeuner : Flocons d'avoine aux fruits (300 kcal)</li>
        <li>Déjeuner : Salade de poulet grillé (500 kcal)</li>
        <li>Dîner : Saumon au four avec légumes vapeur (400 kcal)</li>
        <li>Collation : Yaourt aux amandes (200 kcal)</li>
      </ul>
    `;
  } else if (calories < 2500) {
    mealSuggestions = `
      <ul>
        <li>Petit déjeuner : Œufs brouillés avec avocat (450 kcal)</li>
        <li>Déjeuner : Bol de riz au poulet (700 kcal)</li>
        <li>Dîner : Steak grillé avec pommes de terre rôties (600 kcal)</li>
        <li>Collation : Smoothie protéiné (300 kcal)</li>
      </ul>
    `;
  } else {
    mealSuggestions = `
      <ul>
        <li>Petit déjeuner : Pancakes avec bacon (600 kcal)</li>
        <li>Déjeuner : Sandwich à la dinde et fromage (800 kcal)</li>
        <li>Dîner : Poisson grillé avec quinoa et légumes (700 kcal)</li>
        <li>Collation : Tartine au beurre de cacahuètes (400 kcal)</li>
      </ul>
    `;
  }

  document.getElementById('mealSuggestions').innerHTML = mealSuggestions;
}

document.getElementById('toggleTheme').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode');
});
