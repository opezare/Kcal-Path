document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ข้อมูลหลัก (เหมือนเดิม) ---
    const meals = [];
    const goals = {
        calories: 1900,
        protein: 85,
        fat: 65,
        carb: 220,
    };
    
    // --- 2. (แก้ไข) เลือก Elements ที่ต้องใช้ ---
    const mealListEl = document.querySelector('.meal-list');
    
    const foodSearchInput = document.getElementById('food-search-input');
    const foodSuggestionsEl = document.getElementById('food-suggestions');
    // เปลี่ยนจาก select เป็น container ของปุ่ม
    const mealTypeButtonsContainer = document.getElementById('meal-type-buttons');
    const addFoodBtn = document.getElementById('add-food-btn');

    // --- 3. ฟังก์ชันสำหรับวาดรายการอาหาร (เหมือนเดิม) ---
    function renderMeals() {
        mealListEl.innerHTML = ''; 
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

    // --- 5. (แก้ไข) ฟังก์ชัน "ไฮบริด" V2 (Search + Manual) ---

// (5.1) ฟังก์ชันแสดงคำแนะนำเมื่อพิมพ์ (ฉบับอัปเกรด)
    function showSuggestions() {
        const query = foodSearchInput.value.trim().toLowerCase();
        foodSuggestionsEl.innerHTML = '';

        if (query.length === 0) {
            foodSuggestionsEl.style.display = 'none';
            return;
        }

        const matchingFoods = menuData
            .filter(m => m.name.toLowerCase().includes(query))
            .slice(0, 7); // แสดงผลสูงสุด 7 รายการ

        if (matchingFoods.length === 0) {
            foodSuggestionsEl.style.display = 'none';
            return;
        }

        matchingFoods.forEach(food => {
            const li = document.createElement('li');
            li.dataset.name = food.name;
            
            // (แก้ไข) เพิ่ม HTML ให้แสดง Macros (P, F, C)
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

    // (5.2) ฟังก์ชันเมื่อคลิกเลือกคำแนะนำ
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

    // (5.3) ฟังก์ชันหลักสำหรับปุ่ม "เพิ่มรายการ"
    function handleAddFoodFromUI() {
        const name = foodSearchInput.value.trim();
        
        // (แก้ไข) ค้นหาปุ่มที่ active เพื่อดึงค่า
        const activeButton = mealTypeButtonsContainer.querySelector('.meal-type-btn.active');
        const mealType = activeButton ? activeButton.dataset.value : 'มื้อเย็น'; // ใช้ 'มื้อเย็น' เป็นค่าสำรอง

        if (!name) {
            alert("กรุณาป้อนชื่ออาหาร");
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
            
            const protein = parseFloat(prompt("โปรตีน (g):", "0"));
            const fat = parseFloat(prompt("ไขมัน (g):", "0"));
            const carb = parseFloat(prompt("คาร์โบไฮเดรต (g):", "0"));

            if (isNaN(protein) || isNaN(fat) || isNaN(carb)) {
                alert("ข้อมูลไม่ถูกต้อง กรุณาลองใหม่");
                return;
            }

            const kcal = (protein * 4) + (fat * 9) + (carb * 4);
            newMeal = {
                name: name, 
                kcal: kcal,
                protein: protein,
                fat: fat,
                carb: carb,
                type: mealType
            };
        }

        meals.push(newMeal);
        renderMeals();
        updateTotals();
        foodSearchInput.value = '';
        foodSuggestionsEl.style.display = 'none';
    }

    // (5.4) (เพิ่มใหม่) ฟังก์ชันสำหรับจัดการการคลิกปุ่มเลือกมื้อ
    function handleMealTypeClick(event) {
        const clickedButton = event.target.closest('.meal-type-btn');
        if (!clickedButton) return; // ไม่ได้คลิกที่ปุ่ม

        // ลบคลาส 'active' ออกจากปุ่มทั้งหมด
        mealTypeButtonsContainer.querySelectorAll('.meal-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // เพิ่มคลาส 'active' ให้ปุ่มที่ถูกคลิก
        clickedButton.classList.add('active');
    }

    // --- 6. (แก้ไข) สั่งให้ทำงานเมื่อหน้าโหลดเสร็จ ---
    
    // (6.1) เพิ่ม Event Listeners
    if (foodSearchInput) {
        foodSearchInput.addEventListener('input', showSuggestions);
    }
    if (foodSuggestionsEl) {
        foodSuggestionsEl.addEventListener('click', handleSuggestionClick);
    }
    if (addFoodBtn) {
        addFoodBtn.addEventListener('click', handleAddFoodFromUI);
    }
    // (เพิ่มใหม่)
    if (mealTypeButtonsContainer) {
        mealTypeButtonsContainer.addEventListener('click', handleMealTypeClick);
    }
    
    // (6.2) ซ่อน suggestions เมื่อคลิกที่อื่น
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.food-search-container')) {
            foodSuggestionsEl.style.display = 'none';
        }
    });

    // (6.3) สั่งให้วาดและคำนวณครั้งแรก
    renderMeals();
    updateTotals();
});