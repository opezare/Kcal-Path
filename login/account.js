// account.js

document.addEventListener('DOMContentLoaded', () => {
    // --- เลือก Elements ---
    const form = document.getElementById('account-form');
    const emailInput = document.getElementById('acc-email');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const ageInput = document.getElementById('acc-age');
    const weightInput = document.getElementById('acc-weight');
    const heightInput = document.getElementById('acc-height');
    // const activitySelect = document.getElementById('acc-activity'); // (ลบ) ตัวแปร select เดิม
    const goalRadios = document.querySelectorAll('input[name="goal"]');

    // (เพิ่ม) Elements สำหรับ Custom Select
    const activityContainer = document.getElementById('activity-select-container');
    const activityDisplay = document.getElementById('activity-display');
    const activityOptions = document.getElementById('activity-options');
    const activityDisplaySpan = activityDisplay.querySelector('span');
    let selectedActivityValue = 1.2; // (เพิ่ม) ตัวแปรเก็บค่า Activity ที่เลือก

    const bmiEl = document.getElementById('acc-bmi');
    const bmiCatEl = document.getElementById('acc-bmi-cat');
    const tdeeEl = document.getElementById('acc-tdee');
    const goalCalEl = document.getElementById('acc-goal-cal');

    const editBtn = document.getElementById('edit-profile-btn');
    const saveBtn = document.getElementById('save-profile-btn');
    const cancelBtn = document.getElementById('cancel-edit-btn');
    const logoutBtn = document.getElementById('logout-btn');

    const formMessageEl = document.getElementById('form-message');
    const formErrorEl = document.getElementById('form-error');

    // (แก้ไข) เอา activitySelect ออกจาก editableFields โดยตรง (จะจัดการผ่าน container)
    const editableInputs = [ageInput, weightInput, heightInput]; 
    const editableRadios = [...genderRadios, ...goalRadios];

    // --- โหลดข้อมูล & แสดงผล ---
    function loadProfileData() {
        const inputs = JSON.parse(localStorage.getItem('kcalPathInputs')) || {};
        const metrics = JSON.parse(localStorage.getItem('kcalPathMetrics')) || {};
        const bmi = localStorage.getItem('kcalPathBmi') || '-';
        const bmiCategory = localStorage.getItem('kcalPathBmiCategory') || '-';
        const userEmail = localStorage.getItem('kcalPathUserEmail') || 'user@example.com'; 

        emailInput.value = userEmail; 
        ageInput.value = inputs.age || '';
        weightInput.value = inputs.weight || '';
        heightInput.value = inputs.height || '';

        genderRadios.forEach(radio => {
            radio.checked = (radio.value === inputs.gender);
        });

        // (แก้ไข) ตั้งค่า Activity Level สำหรับ Custom Select
        selectedActivityValue = inputs.activity || 1.2; // โหลดค่าที่บันทึกไว้
        const matchingOption = activityOptions.querySelector(`li[data-value="${selectedActivityValue}"]`);
        if (matchingOption) {
            activityDisplaySpan.textContent = matchingOption.querySelector('.option-primary').textContent; 
        } else {
             activityDisplaySpan.textContent = 'ไม่ออกกำลังกายเลย'; // ค่า Default ถ้าหาไม่เจอ
        }

        goalRadios.forEach(radio => {
            radio.checked = (radio.value === inputs.goal);
        });

        bmiEl.textContent = parseFloat(bmi).toFixed(1) || '-';
        bmiCatEl.textContent = bmiCategory;
        tdeeEl.textContent = metrics.tdee || '-';
        goalCalEl.textContent = metrics.goalCalories || '-';

        formMessageEl.textContent = '';
        formErrorEl.textContent = '';
        formMessageEl.classList.add('hidden');
        formErrorEl.classList.add('hidden');
    }

    // --- สลับโหมดแก้ไข/แสดงผล ---
    function setEditMode(isEditing) {
        if (isEditing) {
            // เปิดให้แก้ไข Input ตัวเลข
            editableInputs.forEach(field => {
                 field.readOnly = false; 
                 field.style.backgroundColor = '#fff';
                 field.style.cursor = 'text';
                 field.style.border = '1px solid var(--border-color)'; // เพิ่มขอบตอนแก้ไข
            });
             // เปิดให้แก้ไข Radio
            editableRadios.forEach(radio => radio.disabled = false);
            document.querySelectorAll('.radio-group .option').forEach(label => {
                 label.style.cursor = 'pointer';
                 label.style.color = 'var(--text-dark)';
            });
            // เปิดให้แก้ไข Custom Select
            activityContainer.classList.remove('disabled');

            editBtn.classList.add('hidden');
            saveBtn.classList.remove('hidden');
            cancelBtn.classList.remove('hidden');
        } else {
            // ปิด Input ตัวเลข
            editableInputs.forEach(field => {
                field.readOnly = true;
                field.style.backgroundColor = '#e9ecef';
                field.style.cursor = 'not-allowed';
                 field.style.border = 'none'; // เอาขอบออกตอนแสดงผล
            });
             // ปิด Radio
            editableRadios.forEach(radio => radio.disabled = true);
            document.querySelectorAll('.radio-group .option').forEach(label => {
                 label.style.cursor = 'not-allowed';
                 label.style.color = 'var(--text-light)';
            });
             // ปิด Custom Select
             activityContainer.classList.add('disabled');
             activityContainer.classList.remove('open'); // ปิด dropdown ถ้าเปิดอยู่
             activityContainer.classList.remove('open-up');

            editBtn.classList.remove('hidden');
            saveBtn.classList.add('hidden');
            cancelBtn.classList.add('hidden');
        }
        formMessageEl.textContent = '';
        formErrorEl.textContent = '';
        formMessageEl.classList.add('hidden');
        formErrorEl.classList.add('hidden');
    }

    // --- คำนวณค่าต่างๆ (เหมือนเดิม) ---
    function calculateAndUpdateMetrics(inputsData) {
        // ... (โค้ดคำนวณเหมือนเดิม ไม่ต้องแก้) ...
         const { gender, age, weight, height, activity, goal } = inputsData;

        if (!gender || !age || !weight || !height || !activity || !goal) {
            console.error("ข้อมูลไม่ครบถ้วนสำหรับการคำนวณ");
            return null; // หรือ throw error
        }

        const h_m = height / 100;
        const bmi = weight / (h_m * h_m);
        let bmiStatus = '';
        if (bmi < 18.5) bmiStatus = 'น้ำหนักน้อย/ผอม';
        else if (bmi < 23) bmiStatus = 'สมส่วน';
        else if (bmi < 25) bmiStatus = 'น้ำหนักเกิน';
        else if (bmi < 30) bmiStatus = 'อ้วนระดับ 1';
        else bmiStatus = 'อ้วนระดับ 2 (อันตราย)';

        let bmr = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'male' ? 5 : -161);
        bmr = Math.round(bmr);
        let tdee = Math.round(bmr * activity);

        let goalCalories = tdee;
        if (goal === 'lose') goalCalories = Math.round(tdee - 500);
        else if (goal === 'gain') goalCalories = Math.round(tdee + 500);

        const goalCarb = Math.round((goalCalories * 0.40) / 4);
        const goalProtein = Math.round((goalCalories * 0.30) / 4);
        const goalFat = Math.round((goalCalories * 0.30) / 9);

        const metrics = {
            bmr: bmr,
            tdee: tdee,
            goalCalories: goalCalories,
            goalCarb: goalCarb,
            goalProtein: goalProtein,
            goalFat: goalFat
        };

        localStorage.setItem('kcalPathInputs', JSON.stringify(inputsData));
        localStorage.setItem('kcalPathMetrics', JSON.stringify(metrics));
        localStorage.setItem('kcalPathBmi', bmi.toFixed(1));
        localStorage.setItem('kcalPathBmiCategory', bmiStatus);

        return { metrics, bmi: bmi.toFixed(1), bmiCategory: bmiStatus };
    }

    // --- Event Listeners ---

    // กดปุ่ม Edit
    editBtn.addEventListener('click', () => {
        setEditMode(true);
    });

    // กดปุ่ม Cancel
    cancelBtn.addEventListener('click', () => {
        loadProfileData(); 
        setEditMode(false);
    });

    // (เพิ่ม) Event Listener สำหรับ Custom Select
    activityDisplay.addEventListener('click', () => {
        // ถ้าอยู่ในโหมดแสดงผล (disabled) ไม่ต้องทำอะไร
        if (activityContainer.classList.contains('disabled')) return; 

        const rect = activityDisplay.getBoundingClientRect(); 
        const viewportHeight = window.innerHeight; 

        if (rect.bottom > (viewportHeight * 0.6)) {
            activityContainer.classList.add('open-up');
        } else {
            activityContainer.classList.remove('open-up');
        }
        
        activityContainer.classList.toggle('open');
    });

    activityOptions.addEventListener('click', (e) => {
        const clickedLi = e.target.closest('li'); 
        if (clickedLi) {
            const selectedText = clickedLi.querySelector('.option-primary').textContent; 
            selectedActivityValue = parseFloat(clickedLi.dataset.value); // อัปเดตค่าที่เลือก
            
            activityDisplaySpan.textContent = selectedText; 
            activityContainer.classList.remove('open'); 
            activityContainer.classList.remove('open-up'); 
        }
    });

    // (เพิ่ม) ปิด Dropdown เมื่อคลิกนอกพื้นที่
    document.addEventListener('click', (e) => {
        if (!activityContainer.contains(e.target)) {
            activityContainer.classList.remove('open');
            activityContainer.classList.remove('open-up');
        }
    });


    // กดปุ่ม Save (Submit Form)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        formErrorEl.textContent = ''; 
        formErrorEl.classList.add('hidden');

        const selectedGender = document.querySelector('input[name="gender"]:checked')?.value;
        const age = parseFloat(ageInput.value);
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const activity = selectedActivityValue; // (แก้ไข) ใช้ค่าจากตัวแปร
        const selectedGoal = document.querySelector('input[name="goal"]:checked')?.value;

        if (!selectedGender || isNaN(age) || isNaN(weight) || isNaN(height) || !selectedGoal || age <= 0 || weight <= 0 || height <= 0) {
            formErrorEl.textContent = 'กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน';
             formErrorEl.classList.remove('hidden');
            return;
        }

        const updatedInputs = {
            gender: selectedGender,
            age: age,
            weight: weight,
            height: height,
            activity: activity, // ใช้ค่าที่อัปเดตแล้ว
            goal: selectedGoal
        };

        const result = calculateAndUpdateMetrics(updatedInputs);

        if(result) {
            bmiEl.textContent = result.bmi;
            bmiCatEl.textContent = result.bmiCategory;
            tdeeEl.textContent = result.metrics.tdee;
            goalCalEl.textContent = result.metrics.goalCalories;
            setEditMode(false);
            formMessageEl.textContent = 'บันทึกข้อมูลเรียบร้อยแล้ว!';
            formMessageEl.classList.remove('hidden');
            setTimeout(() => {
                formMessageEl.classList.add('hidden');
            }, 3000);
        } else {
             formErrorEl.textContent = 'เกิดข้อผิดพลาดในการคำนวณหรือบันทึกข้อมูล';
             formErrorEl.classList.remove('hidden');
        }
    });

    // กดปุ่ม Logout (เหมือนเดิม)
    logoutBtn.addEventListener('click', () => {
        if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
            localStorage.removeItem('kcalPathInputs');
            localStorage.removeItem('kcalPathMetrics');
            localStorage.removeItem('kcalPathBmi');
            localStorage.removeItem('kcalPathBmiCategory');
            localStorage.removeItem('kcalPathUserEmail'); 
            // localStorage.removeItem('kcalPathMeals'); 
            // localStorage.removeItem('kcalPathLogDate');
            sessionStorage.removeItem('kcalPathWizardState'); 
            window.location.href = 'login.html'; 
        }
    });

    // --- โหลดข้อมูลครั้งแรก ---
    loadProfileData();
    setEditMode(false); 

});