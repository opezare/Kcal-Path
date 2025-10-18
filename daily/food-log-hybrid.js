// food-log-hybrid.js (ฉบับอัปเดต - เพิ่มการเก็บประวัติ)

document.addEventListener('DOMContentLoaded', () => {
    
    let meals = []; 
    
    // --- (แก้ไข) โหลด goals จาก localStorage ---
    const metrics = JSON.parse(localStorage.getItem('kcalPathMetrics'));
    const goals = {
        calories: metrics && metrics.goalCalories ? metrics.goalCalories : 2000, // Default fallback
        protein: metrics && metrics.goalProtein ? metrics.goalProtein : 100,
        fat: metrics && metrics.goalFat ? metrics.goalFat : 70,
        carb: metrics && metrics.goalCarb ? metrics.goalCarb : 250,
    };
    
    // (แก้ไข) อัปเดตตารางเป้าหมายในหน้า UI ด้วย
    const goalKcalEl = document.querySelector('tbody tr:nth-child(1) td:nth-child(3)');
    const goalProteinEl = document.querySelector('tbody tr:nth-child(2) td:nth-child(3)');
    const goalFatEl = document.querySelector('tbody tr:nth-child(3) td:nth-child(3)');
    const goalCarbEl = document.querySelector('tbody tr:nth-child(4) td:nth-child(3)');

    if(goalKcalEl) goalKcalEl.textContent = `${goals.calories.toFixed(0)} kcal`;
    if(goalProteinEl) goalProteinEl.textContent = `${goals.protein.toFixed(1)} g`;
    if(goalFatEl) goalFatEl.textContent = `${goals.fat.toFixed(1)} g`;
    if(goalCarbEl) goalCarbEl.textContent = `${goals.carb.toFixed(1)} g`;

    // --- (โค้ดที่เหลือเหมือนเดิม) ---
    
    const mealListEl = document.querySelector('.meal-list');
    const foodSearchInput = document.getElementById('food-search-input');
    const foodSuggestionsEl = document.getElementById('food-suggestions');
    const mealTypeButtonsContainer = document.getElementById('meal-type-buttons');
    const addFoodBtn = document.getElementById('add-food-btn');
    const resetLogBtn = document.getElementById('reset-log-btn');

    // (เพิ่ม) 1. ฟังก์ชันตัวช่วยสำหรับดึงวันที่ YYYY-MM-DD
    function getTodayDateString() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    // (เพิ่ม) 2. ฟังก์ชันสำหรับ Save/Load (อัปเดตใหม่)
    
    function saveDataToLocalStorage() {
        localStorage.setItem('kcalPathMeals', JSON.stringify(meals));
        localStorage.setItem('kcalPathLogDate', getTodayDateString());
        const activeButton = mealTypeButtonsContainer.querySelector('.meal-type-btn.active');
        const activeMealType = activeButton ? activeButton.dataset.value : 'มื้อเย็น'; 
        localStorage.setItem('kcalPathActiveMealType', activeMealType);
    }

    function loadDataFromLocalStorage() {
        const todayStr = getTodayDateString();
        const lastLogDate = localStorage.getItem('kcalPathLogDate'); 
        const savedMealsStr = localStorage.getItem('kcalPathMeals'); 

        if (lastLogDate === todayStr) {
            if (savedMealsStr) {
                meals = JSON.parse(savedMealsStr);
            } else {
                meals = [];
            }
        } else if (savedMealsStr && lastLogDate) {
            let history = JSON.parse(localStorage.getItem('kcalPathHistory') || '{}');
            const yesterdayMeals = JSON.parse(savedMealsStr);
            if (yesterdayMeals.length > 0) {
                 history[lastLogDate] = yesterdayMeals;
                 console.log(`Archived log from ${lastLogDate}`);
            }
            localStorage.setItem('kcalPathHistory', JSON.stringify(history));
            meals = []; 
            localStorage.setItem('kcalPathMeals', '[]'); 
            localStorage.setItem('kcalPathLogDate', todayStr); 
            
        } else {
            meals = [];
            localStorage.setItem('kcalPathLogDate', todayStr);
        }
        
        const savedMealType = localStorage.getItem('kcalPathActiveMealType') || 'มื้อเย็น'; 
        
        if (mealTypeButtonsContainer) {
            mealTypeButtonsContainer.querySelectorAll('.meal-type-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.value === savedMealType) {
                    btn.classList.add('active');
                }
            });
        }
    }

    // --- 3. ฟังก์ชันสำหรับวาดรายการอาหาร (เหมือนเดิม) ---
    function renderMeals() {
        mealListEl.innerHTML = ''; 
        if (meals.length === 0) {
            mealListEl.innerHTML = '<p class="no-meals-text">ยังไม่มีรายการอาหารสำหรับวันนี้</p>'; // (เพิ่มข้อความ)
            return;
        }

        const mealsByType = {};
        meals.forEach(meal => {
            if (!mealsByType[meal.type]) {
                mealsByType[meal.type] = {
                    items: [], totalKcal: 0, totalProtein: 0, totalFat: 0, totalCarb: 0
                };
            }
            mealsByType[meal.type].items.push(meal.name);
            mealsByType[meal.type].totalKcal += meal.kcal;
            mealsByType[meal.type].totalProtein += meal.protein;
            mealsByType[meal.type].totalFat += meal.fat;
            mealsByType[meal.type].totalCarb += meal.carb;
        });

        for (const mealType in mealsByType) {
            const group = mealsByType[mealType];
            const mealItemEl = document.createElement('div');
            mealItemEl.className = 'meal-item';
            mealItemEl.innerHTML = `
                <h3>${mealType} <span class="meal-kcal">(${group.totalKcal.toFixed(0)} kcal)</span></h3>
                <p>${group.items.join(', ')}</p>
                <p class="meal-nutrients">โปรตีน ${group.totalProtein.toFixed(1)}g | ไขมัน ${group.totalFat.toFixed(1)}g | คาร์บ ${group.totalCarb.toFixed(1)}g</p>
            `;
            mealListEl.appendChild(mealItemEl);
        }
    }

    // --- 4. ฟังก์ชันสำหรับอัปเดตตารางสรุป (เหมือนเดิม) ---
    function updateTotals() {
        let totalKcal = meals.reduce((sum, meal) => sum + meal.kcal, 0);
        let totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
        let totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);
        let totalCarb = meals.reduce((sum, meal) => sum + meal.carb, 0);
        
        const remainingKcal = goals.calories - totalKcal;
        const remainingProtein = goals.protein - totalProtein;
        const remainingFat = goals.fat - totalFat;
        const remainingCarb = goals.carb - totalCarb;

        document.getElementById('log-total-kcal').textContent = `${totalKcal.toFixed(0)} kcal`;
        document.getElementById('log-total-protein').textContent = `${totalProtein.toFixed(1)} g`;
        document.getElementById('log-total-fat').textContent = `${totalFat.toFixed(1)} g`;
        document.getElementById('log-total-carb').textContent = `${totalCarb.toFixed(1)} g`;
        
        document.getElementById('log-remaining-kcal').textContent = `${remainingKcal.toFixed(0)} kcal`;
        document.getElementById('log-remaining-protein').textContent = `${remainingProtein.toFixed(1)} g`;
        document.getElementById('log-remaining-fat').textContent = `${remainingFat.toFixed(1)} g`;
        document.getElementById('log-remaining-carb').textContent = `${remainingCarb.toFixed(1)} g`;

        const proteinAdviceEl = document.getElementById('food-log-protein-advice');
        if (remainingProtein > 0) {
            proteinAdviceEl.textContent = `คุณยังต้องการโปรตีนอีก ${remainingProtein.toFixed(1)}g เพื่อให้ถึงเป้าหมาย!`;
            proteinAdviceEl.style.color = 'var(--text-medium)';
        } else {
            proteinAdviceEl.textContent = 'คุณได้รับโปรตีนถึงเป้าหมายแล้ว!';
            proteinAdviceEl.style.color = 'var(--primary-green)';
        }
        
        const fatRatio = (totalFat / goals.fat) * 100;
        const fatStatusEl = document.getElementById('food-log-fat-status');
        if (fatRatio >= 90) {
            fatStatusEl.textContent = 'ระวัง! ไขมันใกล้ถึงขีดจำกัดแล้ว';
            fatStatusEl.style.color = 'var(--brown)';
        } else {
            fatStatusEl.textContent = 'วันนี้ปริมาณไขมันของคุณยังอยู่ในเกณฑ์ดี';
            fatStatusEl.style.color = 'var(--dark-green)';
        }
    }

    // --- 5. ฟังก์ชัน "ไฮบริด" V2 (Search + Manual) ---
    
    // (5.1) showSuggestions (เหมือนเดิม)
    function showSuggestions() {
        const query = foodSearchInput.value.trim().toLowerCase();
        foodSuggestionsEl.innerHTML = '';

        if (query.length === 0) {
            foodSuggestionsEl.style.display = 'none';
            return;
        }
        
        // (เช็ค) ตรวจสอบว่า menuData ถูกโหลดหรือไม่
        if (typeof menuData === 'undefined') {
            console.error("ตัวแปร menuData (จาก database.js) ไม่ได้ถูกโหลด");
            return;
        }
        
        const matchingFoods = menuData
            .filter(m => m.name.toLowerCase().includes(query))
            .slice(0, 7); 
        if (matchingFoods.length === 0) {
            foodSuggestionsEl.style.display = 'none';
            return;
        }
        matchingFoods.forEach(food => {
            const li = document.createElement('li');
            li.dataset.name = food.name;
            li.innerHTML = `
                <div class="suggestion-main-info">
                    <span class="suggestion-name">${food.name}</span>
                    <span class="suggestion-kcal">${food.nutrition.calories.toFixed(0)} kcal</span>
                </div>
                <div class="suggestion-macros">
                    <span>โปรตีน ${food.nutrition.protein.toFixed(0)}g</span>
                    <span>ไขมัน ${food.nutrition.fat.toFixed(0)}g</span>
                    <span>คาร์บ ${food.nutrition.carbs.toFixed(0)}g</span>
                </div>
            `;
            foodSuggestionsEl.appendChild(li);
        });
        foodSuggestionsEl.style.display = 'block';
    }

    // (5.2) handleSuggestionClick (เหมือนเดิม)
    function handleSuggestionClick(event) {
        const clickedLi = event.target.closest('li');
        if (!clickedLi) return;
        const foodName = clickedLi.dataset.name;
        if (foodName) {
            foodSearchInput.value = foodName; 
            foodSuggestionsEl.innerHTML = ''; 
            foodSuggestionsEl.style.display = 'none';
        }
    }

    // (5.3) handleAddFoodFromUI (เหมือนเดิม, ใช้เวอร์ชันแก้บั๊กแล้ว)
    function handleAddFoodFromUI() {
        const name = foodSearchInput.value.trim();
        const activeButton = mealTypeButtonsContainer.querySelector('.meal-type-btn.active');
        const mealType = activeButton ? activeButton.dataset.value : 'มื้อเย็น';

        if (!name) {
            alert("กรุณาป้อนชื่ออาหาร");
            return;
        }

        // (เช็ค) ตรวจสอบว่า menuData ถูกโหลดหรือไม่
        if (typeof menuData === 'undefined') {
            alert("ฐานข้อมูลอาหาร (database.js) ยังโหลดไม่เสร็จ กรุณาลองใหม่อีกครั้ง");
            return;
        }

        const foodItem = menuData.find(m => m.name.toLowerCase() === name.toLowerCase());
        let newMeal = null;

        if (foodItem) {
            newMeal = {
                name: foodItem.name,
                kcal: foodItem.nutrition.calories,
                protein: foodItem.nutrition.protein,
                fat: foodItem.nutrition.fat,
                carb: foodItem.nutrition.carbs,
                type: mealType
            };
        } else {
            alert(`ไม่พบ '${name}' ในฐานข้อมูล\nกรุณากรอกข้อมูลสารอาหารเอง`);
            
            const proteinStr = prompt("โปรตีน (g):", "0");
            const fatStr = prompt("ไขมัน (g):", "0");
            const carbStr = prompt("คาร์โบไฮเดรต (g):", "0");

            if (proteinStr === null || fatStr === null || carbStr === null) {
                alert("ยกเลิกการเพิ่มรายการ");
                return;
            }
            const protein = parseFloat(proteinStr);
            const fat = parseFloat(fatStr);
            const carb = parseFloat(carbStr);

            if (isNaN(protein) || isNaN(fat) || isNaN(carb) || protein < 0 || fat < 0 || carb < 0) {
                alert("ข้อมูลไม่ถูกต้อง (ต้องเป็นตัวเลข 0 หรือมากกว่า) กรุณาลองใหม่");
                return;
            }
            const kcal = (protein * 4) + (fat * 9) + (carb * 4);
            newMeal = {
                name: name, 
                kcal: Math.round(kcal),
                protein: protein,
                fat: fat,
                carb: carb,
                type: mealType
            };
        }
        
        if (newMeal) {
            meals.push(newMeal);
            renderMeals();
            updateTotals();
            foodSearchInput.value = '';
            foodSuggestionsEl.style.display = 'none';
            saveDataToLocalStorage();
        }
    }

    // (5.4) handleMealTypeClick (เหมือนเดิม)
    function handleMealTypeClick(event) {
        const clickedButton = event.target.closest('.meal-type-btn');
        if (!clickedButton) return;
        mealTypeButtonsContainer.querySelectorAll('.meal-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        clickedButton.classList.add('active');
        localStorage.setItem('kcalPathActiveMealType', clickedButton.dataset.value);
    }

    // (5.5) (แก้ไข) ฟังก์ชันรีเซต (ให้ลบเฉพาะของ "วันนี้")
    function handleResetLog() {
        if (confirm("คุณต้องการลบรายการอาหารทั้งหมดของ *วันนี้* ใช่หรือไม่?")) {
            meals = [];
            localStorage.setItem('kcalPathMeals', '[]');
            renderMeals();
            updateTotals();
        }
    }

    // --- 6. สั่งให้ทำงานเมื่อหน้าโหลดเสร็จ ---
    loadDataFromLocalStorage();
    if (foodSearchInput) foodSearchInput.addEventListener('input', showSuggestions);
    if (foodSuggestionsEl) foodSuggestionsEl.addEventListener('click', handleSuggestionClick);
    if (addFoodBtn) addFoodBtn.addEventListener('click', handleAddFoodFromUI);
    if (mealTypeButtonsContainer) mealTypeButtonsContainer.addEventListener('click', handleMealTypeClick);
    if (resetLogBtn) resetLogBtn.addEventListener('click', handleResetLog);
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.food-search-container')) {
            if (foodSuggestionsEl) foodSuggestionsEl.style.display = 'none';
        }
    });
    renderMeals();
    updateTotals();
});