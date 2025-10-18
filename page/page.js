// --- ส่วนที่ 1: การจัดการข้อมูลหลัก ---
const dailyData = {
    calories: 1230,
    protein: 63,
    fat: 37,
    sodium: 1400,
    bmi: 23.5, // ใช้ค่าทศนิยม
    weight: 70.2, // ใช้ค่าทศนิยม
    height: 173
};

const goals = {
    calories: 1800,
    protein: 80,
    fat: 50
};

// --- ส่วนที่ 2: ฟังก์ชันสำหรับหน้า dashboard และ food-log ---

function renderDashboard() {
    // เลือก Element ที่ต้องการอัปเดต
    const calorieValueEl = document.getElementById('calorie-value');
    const proteinValueEl = document.getElementById('protein-value');
    const fatValueEl = document.getElementById('fat-value');
    const bmiValueEl = document.getElementById('bmi-value');
    const weightValueEl = document.getElementById('weight-value');
    const dailyCalorieGoalEl = document.getElementById('daily-calorie-goal');

    // อัปเดตค่าตัวเลขในหน้าแดชบอร์ดหลัก
    if (calorieValueEl) calorieValueEl.textContent = dailyData.calories;
    if (proteinValueEl) proteinValueEl.textContent = dailyData.protein;
    if (fatValueEl) fatValueEl.textContent = dailyData.fat;
    if (bmiValueEl) bmiValueEl.textContent = dailyData.bmi;
    if (weightValueEl) weightValueEl.textContent = dailyData.weight;
    if (dailyCalorieGoalEl) dailyCalorieGoalEl.textContent = goals.calories;

    // อัปเดต Progress Circle ตามข้อมูลจริง
    const calorieProgressCircle = document.querySelector('.progress-circle.large');
    if (calorieProgressCircle) {
        calorieProgressCircle.style.setProperty('--progress', (dailyData.calories / goals.calories) * 100);
    }
    
    // อัปเดตวงกลมสารอาหารหลัก
    const nutrientProgressCircles = document.querySelectorAll('.nutrient-item .progress-circle');
    if (nutrientProgressCircles.length > 0) {
        nutrientProgressCircles[0].style.setProperty('--progress', (dailyData.protein / goals.protein) * 100);
        nutrientProgressCircles[1].style.setProperty('--progress', (dailyData.fat / goals.fat) * 100);
        // สามารถเพิ่ม nutrient อื่นๆ ได้ที่นี่
    }
}

function renderFoodLog() {
    // ข้อมูลมื้ออาหารตัวอย่าง (ควรโหลดจากฐานข้อมูลจริง)
    const meals = [
        { name: 'มื้อเช้า', kcal: 444, protein: 40, fat: 9.3, carb: 45 },
        { name: 'มื้อเที่ยง', kcal: 250, protein: 20, fat: 10, carb: 15 }
    ];

    // คำนวณผลรวม
    const totalKcal = meals.reduce((sum, meal) => sum + meal.kcal, 0);
    const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
    const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);
    const totalCarb = meals.reduce((sum, meal) => sum + meal.carb, 0);

    // อัปเดตตารางสรุปสารอาหาร
    document.getElementById('log-total-kcal').textContent = `${totalKcal} kcal`;
    document.getElementById('log-total-protein').textContent = `${totalProtein} g`;
    document.getElementById('log-total-fat').textContent = `${totalFat} g`;
    document.getElementById('log-total-carb').textContent = `${totalCarb} g`;

    // แสดงคำแนะนำ/คำเตือน
    const remainingProtein = goals.protein - totalProtein;
    const proteinAdviceEl = document.getElementById('food-log-protein-advice');
    if (proteinAdviceEl) {
        if (remainingProtein > 0) {
            proteinAdviceEl.textContent = `คุณยังต้องการโปรตีนอีก ${remainingProtein}g เพื่อให้ถึงเป้าหมาย!`;
        } else {
            proteinAdviceEl.textContent = 'คุณได้รับโปรตีนถึงเป้าหมายแล้ว!';
            proteinAdviceEl.style.color = 'var(--primary-green)';
        }
    }

    const fatPercentage = (totalFat / goals.fat) * 100;
    const fatStatusEl = document.getElementById('food-log-fat-status');
    if (fatStatusEl) {
        if (fatPercentage >= 90) {
            fatStatusEl.textContent = 'ระวัง! ไขมันใกล้ถึงขีดจำกัดแล้ว';
            fatStatusEl.style.color = 'var(--brown-accent)';
        } else {
            fatStatusEl.textContent = 'วันนี้ปริมาณไขมันของคุณยังอยู่ในเกณฑ์ดี';
            fatStatusEl.style.color = 'var(--primary-green)';
        }
    }
}

// --- ส่วนที่ 3: Event Listeners และการเรียกใช้งาน ---
document.addEventListener('DOMContentLoaded', () => {
    // ตรวจสอบว่าหน้าปัจจุบันคือหน้าอะไร แล้วเรียกใช้ฟังก์ชันที่เกี่ยวข้อง
    const pageTitle = document.title;
    if (pageTitle.includes('หน้าแรก')) {
        renderDashboard();
    } else if (pageTitle.includes('บันทึกอาหาร')) {
        renderFoodLog();
    }
    // ไม่ต้องมี Event Listener สำหรับการเปลี่ยนหน้า เพราะใช้หลายไฟล์ HTML
});

// โค้ดสร้างกราฟ Chart.js ยังคงใช้ได้ตามเดิม แต่ควรแยกไว้ในไฟล์ stats.html โดยเฉพาะ