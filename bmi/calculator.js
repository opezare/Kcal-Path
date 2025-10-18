// calculator.js (โค้ดที่แก้ไขแล้ว)

// --- Navbar Scroll Script ---
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- Button & Data Initialization ---
const genderButtons = document.getElementById('gender-buttons');
const goalButtons = document.getElementById('goal-buttons');
let selectedGender = 'male'; 
let selectedGoal = 'maintain'; 
let selectedActivityValue = 1.2; // default

// --- Custom Select Element Handlers ---
const activityContainer = document.getElementById('activity-select-container');
const activityDisplay = document.getElementById('activity-display');
const activityOptions = document.getElementById('activity-options');
const activityDisplaySpan = activityDisplay.querySelector('span');

// --- Form & Result Elements ---
const calculatorForm = document.getElementById('calculator-form');
const ageInput = document.getElementById('age-input');
const weightInput = document.getElementById('weight-input');
const heightInput = document.getElementById('height-input');

const resultBmiEl = document.getElementById('result-bmi');
const resultBmiCategoryEl = document.getElementById('result-bmi-category'); 
const resultBmrEl = document.getElementById('result-bmr');
const resultTdeeEl = document.getElementById('result-tdee');
const resultGoalEl = document.getElementById('result-goal');
const resultAdviceEl = document.getElementById('result-advice');
const bodyModelImage = document.getElementById('body-model-image');

// --- (ลบ) Utility Functions (ย้ายตรรกะไปรวมใน submit) ---
// (ลบ function calculateMetrics)
// (ลบ function showResults)

// --- Event Listeners ---

// Gender Toggle
genderButtons.addEventListener('click', (e) => {
    const clickedButton = e.target.closest('.meal-type-btn');
    if (!clickedButton) return;
    genderButtons.querySelectorAll('.meal-type-btn').forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
    selectedGender = clickedButton.dataset.value;
});

// Goal Toggle
goalButtons.addEventListener('click', (e) => {
    const clickedButton = e.target.closest('.meal-type-btn');
    if (!clickedButton) return;
    goalButtons.querySelectorAll('.meal-type-btn').forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
    selectedGoal = clickedButton.dataset.value;
});

// Activity Dropdown Toggle (พร้อม Logic เปิดขึ้น/ลง)
activityDisplay.addEventListener('click', () => {
    const rect = activityDisplay.getBoundingClientRect(); 
    const viewportHeight = window.innerHeight; 

    if (rect.bottom > (viewportHeight * 0.6)) {
        activityContainer.classList.add('open-up');
    } else {
        activityContainer.classList.remove('open-up');
    }
    
    activityContainer.classList.toggle('open');
});

// Activity Option Selection
activityOptions.addEventListener('click', (e) => {
    const clickedLi = e.target.closest('li'); 
    if (clickedLi) {
        const selectedText = clickedLi.querySelector('.option-primary').textContent; 
        selectedActivityValue = parseFloat(clickedLi.dataset.value); 
        
        activityDisplaySpan.textContent = selectedText; 
        activityContainer.classList.remove('open'); 
        activityContainer.classList.remove('open-up'); 
    }
});

// Close Dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!activityContainer.contains(e.target)) {
        activityContainer.classList.remove('open');
        activityContainer.classList.remove('open-up');
    }
});

// (แก้ไข) Form Submission (รวมตรรกะทั้งหมดและบันทึกข้อมูลหลัก)
calculatorForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const age = parseFloat(ageInput.value);
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    const activity = selectedActivityValue; 

    if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
        resultAdviceEl.textContent = 'กรุณากรอกข้อมูลตัวเลขให้ถูกต้อง';
        resultAdviceEl.className = 'advice-message warning-text';
        return;
    }

    // --- (แก้ไข) คัดลอกตรรกะจาก login.js มาวาง ---
    
    // (1) คำนวณ BMI
    const h_m = height / 100;
    const bmi = weight / (h_m * h_m);
    let bmiStatus = '';
    let categoryClass = 'advice-message'; 
    let imageSuffix = 'default.png'; 
    
    if (bmi < 18.5) {
        bmiStatus = 'น้ำหนักน้อย/ผอม';
        categoryClass += ' warning-text'; 
        imageSuffix = 'underweight.png';
    } else if (bmi < 23) { 
        bmiStatus = 'สมส่วน';
        imageSuffix = 'healthy.png';
    } else if (bmi < 25) {
        bmiStatus = 'น้ำหนักเกิน';
        categoryClass += ' warning-text';
        imageSuffix = 'overweight.png';
    } else if (bmi < 30) {
        bmiStatus = 'อ้วนระดับ 1';
        categoryClass += ' warning-text';
        imageSuffix = 'obese1.png';
    } else {
        bmiStatus = 'อ้วนระดับ 2 (อันตราย)';
        categoryClass += ' warning-text';
        imageSuffix = 'obese2.png';
    }

    // (2) คำนวณ BMR (Mifflin-St Jeor)
    let bmr = (10 * weight) + (6.25 * height) - (5 * age) + (selectedGender === 'male' ? 5 : -161);
    bmr = Math.round(bmr);
    
    // (3) คำนวณ TDEE
    let tdee = Math.round(bmr * activity);
    
    // (4) คำนวณ Goal Calories
    let goalCalories = tdee;
    if (selectedGoal === 'lose') goalCalories = Math.round(tdee - 500); 
    else if (selectedGoal === 'gain') goalCalories = Math.round(tdee + 500); 

    // (5) คำนวณ Macro Goals (40/30/30)
    const goalCarb = Math.round((goalCalories * 0.40) / 4);
    const goalProtein = Math.round((goalCalories * 0.30) / 4);
    const goalFat = Math.round((goalCalories * 0.30) / 9);

    // (6) แสดงผลลัพธ์ (ย้ายมาจาก showResults)
    resultBmiEl.textContent = `${bmi.toFixed(1)}`;
    resultBmiCategoryEl.textContent = bmiStatus;
    resultBmrEl.textContent = `${bmr} kcal`;
    resultTdeeEl.textContent = `${tdee} kcal`;
    resultGoalEl.textContent = `${goalCalories} kcal`;
    resultAdviceEl.textContent = `แคลอรีสำหรับเป้าหมายของคุณ: ${goalCalories} kcal/วัน`;
    resultAdviceEl.className = categoryClass; 
    const pathPrefix = (selectedGender === 'male') ? 'assets/images/male_' : 'assets/images/female_';
    if (imageSuffix !== 'default.png') {
        bodyModelImage.src = pathPrefix + imageSuffix; 
    } else {
        bodyModelImage.src = 'assets/images/default.png';
    }
    
    // (7) บันทึกข้อมูลทั้งหมดลง localStorage
    const inputs = {
        gender: selectedGender,
        age: age,
        weight: weight,
        height: height,
        activity: activity, 
        goal: selectedGoal
    };
    localStorage.setItem('kcalPathInputs', JSON.stringify(inputs));
    
    const metrics = {
        bmr: bmr,
        tdee: tdee,
        goalCalories: goalCalories,
        goalCarb: goalCarb,
        goalProtein: goalProtein,
        goalFat: goalFat
    };
    localStorage.setItem('kcalPathMetrics', JSON.stringify(metrics));

    localStorage.setItem('kcalPathBmi', bmi.toFixed(1));
    localStorage.setItem('kcalPathBmiCategory', bmiStatus);

    // --- (แก้ไข) สิ้นสุดตรรกะ ---
});

// Initial Load (Load saved data)
window.addEventListener('load', () => {
    const savedInputs = JSON.parse(localStorage.getItem('kcalPathInputs'));
    const savedMetrics = JSON.parse(localStorage.getItem('kcalPathMetrics'));
    const savedBmi = localStorage.getItem('kcalPathBmi');
    const savedBmiCategory = localStorage.getItem('kcalPathBmiCategory');

    if (savedInputs) {
        ageInput.value = savedInputs.age;
        weightInput.value = savedInputs.weight;
        heightInput.value = savedInputs.height;
        
        // Restore Gender
        selectedGender = savedInputs.gender;
        genderButtons.querySelectorAll('.meal-type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === selectedGender);
        });

        // Restore Activity
        selectedActivityValue = savedInputs.activity || 1.2;
        const matchingOption = activityOptions.querySelector(`li[data-value="${selectedActivityValue}"]`);
        if (matchingOption) {
            activityDisplaySpan.textContent = matchingOption.querySelector('.option-primary').textContent; 
        }

        // Restore Goal
        selectedGoal = savedInputs.goal || 'maintain';
        goalButtons.querySelectorAll('.meal-type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === selectedGoal);
        });
    }

    if (savedBmi && savedMetrics) {
        resultBmiEl.textContent = `${Number(savedBmi).toFixed(1)}`;
        resultBmiCategoryEl.textContent = savedBmiCategory;
        resultBmrEl.textContent = `${savedMetrics.bmr} kcal`;
        resultTdeeEl.textContent = `${savedMetrics.tdee} kcal`;
        resultGoalEl.textContent = `${savedMetrics.goalCalories} kcal`;
        resultAdviceEl.textContent = `แคลอรีสำหรับเป้าหมายของคุณ: ${savedMetrics.goalCalories} kcal/วัน`;
        
        let categoryClass = 'advice-message';
        let imageSuffix = '';

        if (savedBmiCategory === 'น้ำหนักน้อย/ผอม') {
            categoryClass += ' warning-text';
            imageSuffix = 'underweight.png';
        } else if (savedBmiCategory === 'น้ำหนักเกิน') {
            categoryClass += ' warning-text';
            imageSuffix = 'overweight.png';
        } else if (savedBmiCategory.includes('อ้วน')) {
            categoryClass += ' warning-text';
            imageSuffix = savedBmiCategory === 'อ้วนระดับ 1' ? 'obese1.png' : 'obese2.png';
        } else {
            imageSuffix = 'healthy.png';
        }
        
        if (savedInputs) {
             const pathPrefix = (savedInputs.gender === 'male') ? 'assets/images/male_' : 'assets/images/female_';
             bodyModelImage.src = pathPrefix + imageSuffix;
        }

        resultAdviceEl.className = categoryClass;
    }
});