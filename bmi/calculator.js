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
const bodyModelImage = document.getElementById('body-model-image'); // ประกาศตัวแปรนี้เพิ่ม

// --- Utility Functions ---

function calculateMetrics(weight, height, age, gender, activity, goalType) {
    const h_m = height / 100;
    const bmi = weight / (h_m * h_m);
    // BMR (Mifflin-St Jeor)
    let bmr = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'male' ? 5 : -161);
    bmr = Math.round(bmr);
    let tdee = Math.round(bmr * activity);
    let goalCalories = tdee;
    
    // คำนวณแคลอรีตามเป้าหมาย (ลด/เพิ่ม 500 kcal เพื่อให้สอดคล้องกับ Logic ของโค้ดที่ถูกลบไป)
    if (goalType === 'lose') goalCalories = Math.round(tdee - 500); 
    else if (goalType === 'gain') goalCalories = Math.round(tdee + 500); 
    
    return { bmi, bmr, tdee, goalCalories };
}

function showResults(bmi, bmr, tdee, goalCalories) {
    let bmiStatus = '';
    let categoryClass = 'advice-message'; 
    
    // เกณฑ์ BMI สำหรับคนเอเชีย (อิงตามโค้ดที่ถูกลบไป)
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
        imageSuffix = 'overweight.png'; // อ้างอิงจากโค้ดที่ถูกลบ
    } else if (bmi < 30) {
        bmiStatus = 'อ้วนระดับ 1';
        categoryClass += ' warning-text';
        imageSuffix = 'obese1.png'; // อ้างอิงจากโค้ดที่ถูกลบ
    } else {
        bmiStatus = 'อ้วนระดับ 2 (อันตราย)';
        categoryClass += ' warning-text';
        imageSuffix = 'obese2.png'; // อ้างอิงจากโค้ดที่ถูกลบ
    }

    resultBmiEl.textContent = `${bmi.toFixed(1)}`;
    resultBmiCategoryEl.textContent = bmiStatus;
    resultBmrEl.textContent = `${bmr} kcal`;
    resultTdeeEl.textContent = `${tdee} kcal`;
    resultGoalEl.textContent = `${goalCalories} kcal`;
    resultAdviceEl.textContent = `แคลอรีสำหรับเป้าหมายของคุณ: ${goalCalories} kcal/วัน`;
    resultAdviceEl.className = categoryClass; 

    // --- ส่วนที่แก้ไข: การเปลี่ยนรูปภาพ ---
    // กำหนด Path Prefix ตามเพศ (ลบ './' เพื่อแก้ไขปัญหา Path ผิดพลาด)
    const pathPrefix = (selectedGender === 'male') ? 'assets/images/male_' : 'assets/images/female_';
    
    // ใช้ Path Prefix และ Suffix ที่กำหนดตาม BMI
    if (imageSuffix !== 'default.png') {
        bodyModelImage.src = pathPrefix + imageSuffix; 
    } else {
        // ใช้รูป default ถ้าหาไม่เจอ
        bodyModelImage.src = 'assets/images/default.png';
    }
    
    // Save to LocalStorage
    localStorage.setItem('kcalPathBmi', bmi.toFixed(1));
    localStorage.setItem('kcalPathBmiCategory', bmiStatus);
    localStorage.setItem('kcalPathMetrics', JSON.stringify({ bmr, tdee, goalCalories }));
}

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

    // เช็คว่าปุ่มอยู่ต่ำกว่า 60% ของหน้าจอหรือไม่
    if (rect.bottom > (viewportHeight * 0.6)) {
        // ถ้าอยู่ล่าง ให้เปิดขึ้นบน
        activityContainer.classList.add('open-up');
    } else {
        // ถ้าอยู่บน ให้เปิดลงล่าง
        activityContainer.classList.remove('open-up');
    }
    
    // สั่งเปิด/ปิด
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

// Form Submission (Calculate Button)
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

    const metrics = calculateMetrics(weight, height, age, selectedGender, activity, selectedGoal);
    showResults(metrics.bmi, metrics.bmr, metrics.tdee, metrics.goalCalories);

    const inputs = {
        gender: selectedGender,
        age: age,
        weight: weight,
        height: height,
        activity: activity, 
        goal: selectedGoal
    };
    localStorage.setItem('kcalPathInputs', JSON.stringify(inputs));
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
        
        // โหลดรูปภาพเริ่มต้นตามข้อมูลที่บันทึกไว้
        if (savedInputs) {
             const pathPrefix = (savedInputs.gender === 'male') ? 'assets/images/male_' : 'assets/images/female_';
             bodyModelImage.src = pathPrefix + imageSuffix;
        }


        resultAdviceEl.className = categoryClass;
    }
});