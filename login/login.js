/* ==========================================================================
   Kcal Path — Frontend Logic (Vanilla JS, no frameworks)
   ========================================================================== */

/** Utilities **/
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Key for temporary wizard state
const WIZARD_STATE_KEY = "kcalPathWizardState";

/** Simple router-ish helpers (separate pages) **/
function go(href){ window.location.href = href; }

/** Persist wizard state (use sessionStorage for temporary state) **/
function loadState(){
  try { return JSON.parse(sessionStorage.getItem(WIZARD_STATE_KEY)) || {}; }
  catch(e){ return {}; }
}
function saveState(patch){
  const next = { ...loadState(), ...patch };
  sessionStorage.setItem(WIZARD_STATE_KEY, JSON.stringify(next));
  return next;
}
function clearState(){ sessionStorage.removeItem(WIZARD_STATE_KEY); }

/** Tab Switching Logic **/
function initAuthTabs() {
    const tabContainer = $('.auth-tabs');
    if (!tabContainer) return;

    const tabButtons = $$('.tab-btn', tabContainer);
    const sections = $$('.auth-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            sections.forEach(section => {
                if (section.id === `${targetTab}Section`) {
                    section.classList.add('active-section');
                } else {
                    section.classList.remove('active-section');
                }
            });

            $$(".error").forEach(e => e.textContent = "");
        });
    });
}


/** (แก้ไข) Login page logic - เพิ่มการตรวจสอบโปรไฟล์ **/
function initLogin(){
  const form = $("#loginForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#login-email").value.trim();
    const password = $("#login-password").value.trim();
    const error = $("#loginError");

    error.textContent = "";

    if(!email || !password){
      error.textContent = "กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน";
      return;
    }

    // --- !! สำคัญ: เพิ่มโค้ดเรียก Backend Login จริงที่นี่ !! ---
    // ตอนนี้, จำลองว่าสำเร็จ:
    console.log("Simulating Login:", email);

    localStorage.setItem('kcalPathUserEmail', email);
    clearState();

    // --- (แก้ไข) ตรวจสอบว่ามีโปรไฟล์หรือไม่ ก่อน redirect ---
    if (localStorage.getItem('kcalPathInputs')) {
        // ถ้ามีข้อมูลโปรไฟล์อยู่แล้ว -> ไปหน้าแรก
        go("../page/page.html");
    } else {
        // ถ้ายังไม่มีข้อมูลโปรไฟล์ -> ไปหน้า Wizard เพื่อตั้งค่า
        alert("เข้าสู่ระบบสำเร็จ! กรุณาตั้งค่าโปรไฟล์ของคุณก่อนใช้งาน"); // แจ้งผู้ใช้
        go("wizard.html");
    }
    // --- สิ้นสุดการแก้ไข ---

  });

  const forgotButton = $("#forgot");
  if (forgotButton) {
      forgotButton.addEventListener("click", () => {
        alert("ลืมรหัสผ่าน — ฟังก์ชันนี้ยังไม่เปิดใช้งาน");
      });
  }
}

/** Register page logic (เหมือนเดิม) **/
function initRegister() {
    const form = $("#registerForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = $("#register-email").value.trim();
        const password = $("#register-password").value.trim();
        const confirmPassword = $("#register-confirm-password").value.trim();
        const error = $("#registerError");

        error.textContent = "";

        if (!email || !password || !confirmPassword) {
            error.textContent = "กรุณากรอกข้อมูลลงทะเบียนให้ครบถ้วน";
            return;
        }
        if (password.length < 6) {
             error.textContent = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
             return;
        }
        if (password !== confirmPassword) {
            error.textContent = "รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน";
            return;
        }

        // --- !! สำคัญ: เพิ่มโค้ดเรียก Backend Registration จริงที่นี่ !! ---
        console.log("Simulating Registration:", email);
        localStorage.setItem('kcalPathUserEmail', email);
        alert("ลงทะเบียนสำเร็จ! กรุณาตั้งค่าโปรไฟล์ของคุณ");
        clearState();
        go("wizard.html"); // หลังลงทะเบียน ให้ไปตั้งค่าโปรไฟล์ก่อน
    });
}


/** Wizard page logic (เหมือนเดิม) **/
function setProgress(stepIndex, totalSteps){ /* ... */ }
function initWizard(){ /* ... */ }
function calculateAndSaveMasterData() { /* ... */ }
function validate(stepIdx){ /* ... */ }
function error(sel, msg){ /* ... */ }
function clearErrors(){ /* ... */ }
function collectAndSave(){ /* ... */ }
function hydrateFromState(s){ /* ... */ }
function updateConfirmPreview(){ /* ... */ }
function activityLabel(v){ /* ... */ }
function goalLabel(v){ /* ... */ }
// --- (โค้ดฟังก์ชัน Wizard ทั้งหมดเหมือนเดิม) ---
function setProgress(stepIndex, totalSteps){
  const pct = Math.round(((stepIndex + 1) / totalSteps) * 100);
  const bar = $(".progress .bar");
  if(bar) bar.style.width = pct + "%";
  const badge = $("#stepBadge");
  if(badge) badge.textContent = `ขั้นตอน ${stepIndex + 1}/${totalSteps}`;
}

function initWizard(){
  const wizard = $("#wizard");
  if(!wizard) return; // Only run if wizard exists

  const steps = $$(".step", wizard);
  let current = 0;
  const total = steps.length;

  const state = loadState();
  hydrateFromState(state);

  function show(i){
    steps.forEach((el, idx) => el.style.display = idx === i ? "grid" : "none");
    setProgress(i, total);
    current = i;
  }

  // Buttons
  $$(".next", wizard).forEach(btn => btn.addEventListener("click", () => { // Scope selectors to wizard
    if(validate(current)){
      collectAndSave(); // Save before moving next
      show(Math.min(current + 1, total - 1));
    }
  }));

  $$(".prev", wizard).forEach(btn => btn.addEventListener("click", () => { // Scope selectors to wizard
     collectAndSave(); // Save before moving back
     // Special case: Cancel from step 1 goes back to login
     if (current === 0) {
         if (confirm("คุณต้องการยกเลิกการตั้งค่าโปรไฟล์หรือไม่?")) {
             clearState();
             go("login.html"); // Or wherever login is
         }
         return;
     }
    show(Math.max(current - 1, 0));
  }));

  // Final confirm
  const confirmBtn = $("#confirmSubmit");
  if(confirmBtn){
    confirmBtn.addEventListener("click", () => {
      collectAndSave(); // Make sure latest data is saved before final validation
      if(validate(current)){

        // --- คำนวณและบันทึกข้อมูลหลัก ---
        calculateAndSaveMasterData();

        alert("ยืนยันสำเร็จ! \nระบบจะบันทึกข้อมูลของคุณไว้");
        go("../page/page.html");
      }
    });
  }

  // Dynamic: any change -> save (but only if inside the wizard)
  wizard.addEventListener("input", (e) => {
       // Only save if the input event originates from within the wizard form
       if(e.target.closest('#wizard')) {
           collectAndSave();
       }
   });

  // Prime first view
  show(0);
  updateConfirmPreview(); // Update preview on initial load

  /** ฟังก์ชันคำนวณและบันทึกข้อมูลหลัก **/
  function calculateAndSaveMasterData() {
        const state = loadState();

        const weight = parseFloat(state.weight);
        const height = parseFloat(state.height);
        const age = parseFloat(state.age);
        const gender = state.gender;

        const activityMultipliers = {
            "none": 1.2, "light": 1.375, "moderate": 1.55, "active": 1.725, "athlete": 1.9
        };
        const activityValue = activityMultipliers[state.activity] || 1.2;

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
        let tdee = Math.round(bmr * activityValue);

        let goalCalories = tdee;
        if (state.goal === 'lose') goalCalories = Math.round(tdee - 500);
        else if (state.goal === 'gain') goalCalories = Math.round(tdee + 500);

        const goalCarb = Math.round((goalCalories * 0.40) / 4);
        const goalProtein = Math.round((goalCalories * 0.30) / 4);
        const goalFat = Math.round((goalCalories * 0.30) / 9);

        const inputs = {
            gender: gender, age: age, weight: weight, height: height,
            activity: activityValue, goal: state.goal
        };
        localStorage.setItem('kcalPathInputs', JSON.stringify(inputs));

        const metrics = {
            bmr: bmr, tdee: tdee, goalCalories: goalCalories,
            goalCarb: goalCarb, goalProtein: goalProtein, goalFat: goalFat
        };
        localStorage.setItem('kcalPathMetrics', JSON.stringify(metrics));

        localStorage.setItem('kcalPathBmi', bmi.toFixed(1));
        localStorage.setItem('kcalPathBmiCategory', bmiStatus);

        clearState(); // ล้าง state ชั่วคราวของ wizard หลังบันทึกถาวร
  }


  /** Validation per step **/
  function validate(stepIdx){
    clearErrors();
    const currentState = loadState(); // Load current state for validation

    if(stepIdx === 0){
      if(!currentState.gender) return error("#genderError", "กรุณาเลือกเพศ");
    }
    else if(stepIdx === 1){
      const age = +currentState.age;
      const weight = +currentState.weight;
      const height = +currentState.height;
      if(!(age >= 5 && age <= 120)) return error("#awwError", "อายุต้องอยู่ระหว่าง 5–120 ปี");
      if(!(weight >= 20 && weight <= 300)) return error("#awwError", "น้ำหนักต้องอยู่ระหว่าง 20–300 กก.");
      if(!(height >= 80 && height <= 250)) return error("#awwError", "ส่วนสูงต้องอยู่ระหว่าง 80–250 ซม.");
    }
    else if(stepIdx === 2){
      if(!currentState.activity) return error("#activityError", "กรุณาเลือกระดับการขยับร่างกาย");
    }
    else if(stepIdx === 3){
      if(!currentState.goal) return error("#goalError", "กรุณาเลือกเป้าหมาย");
    }
    else if(stepIdx === 4){ // Confirm step validation
      if(!currentState.gender || !currentState.age || !currentState.weight || !currentState.height || !currentState.activity || !currentState.goal){
        return error("#confirmError", "ข้อมูลไม่ครบถ้วน กรุณาย้อนกลับไปตรวจสอบ");
      }
    }
    return true; // Assume valid if no errors found for the step
  }

  function error(sel, msg){
    const el = $(sel);
    if(el) el.textContent = msg;
    return false;
  }
  function clearErrors(){ $$(".error", wizard).forEach(e => e.textContent = ""); } // Scope to wizard

  /** Gather data from inputs, persist, and update preview **/
  function collectAndSave(){
      const data = {
          gender: $$('input[name="gender"]:checked', wizard).map(i => i.value)[0] || loadState().gender || null,
          age: $("#age", wizard)?.value || loadState().age || null,
          weight: $("#weight", wizard)?.value || loadState().weight || null,
          height: $("#height", wizard)?.value || loadState().height || null,
          activity: $$('input[name="activity"]:checked', wizard).map(i => i.value)[0] || loadState().activity || null,
          goal: $$('input[name="goal"]:checked', wizard).map(i => i.value)[0] || loadState().goal || null,
      };
      // Only save if at least one value is not null to avoid overwriting with nulls initially
      if (Object.values(data).some(v => v !== null)) {
         saveState(data);
         updateConfirmPreview(); // Update preview whenever data is saved
      }
  }


  /** On load, fill values from sessionStorage **/
  function hydrateFromState(s){
    if(!s) return;
    if(s.gender) {
      const g = $(`input[name="gender"][value="${s.gender}"]`, wizard);
      if(g) g.checked = true;
    }
    if(s.age) $("#age", wizard).value = s.age;
    if(s.weight) $("#weight", wizard).value = s.weight;
    if(s.height) $("#height", wizard).value = s.height;
    if(s.activity){
      const a = $(`input[name="activity"][value="${s.activity}"]`, wizard);
      if(a) a.checked = true;
    }
    if(s.goal){
      const g2 = $(`input[name="goal"][value="${s.goal}"]`, wizard);
      if(g2) g2.checked = true;
    }
  }

  /** Confirmation preview block **/
  function updateConfirmPreview(){
    const s = loadState();
    const genderEl = $("#pv-gender");
    const ageEl = $("#pv-age");
    const weightEl = $("#pv-weight");
    const heightEl = $("#pv-height");
    const activityEl = $("#pv-activity");
    const goalEl = $("#pv-goal");

    if(genderEl) genderEl.textContent  = s.gender   ? (s.gender === "male" ? "ชาย" : "หญิง") : "-";
    if(ageEl) ageEl.textContent     = s.age      || "-";
    if(weightEl) weightEl.textContent  = s.weight   || "-";
    if(heightEl) heightEl.textContent  = s.height   || "-";
    if(activityEl) activityEl.textContent= activityLabel(s.activity) || "-";
    if(goalEl) goalEl.textContent    = goalLabel(s.goal) || "-";
  }

    function activityLabel(v){
    switch(v){
      case "none": return "ไม่ออกกำลังกาย (นั่งทำงาน)";
      case "light": return "เบา (1–3 วัน/สัปดาห์)";
      case "moderate": return "ปานกลาง (3–5 วัน/สัปดาห์)";
      case "active": return "หนัก (6–7 วัน/สัปดาห์)";
      case "athlete": return "หนักมาก (วันละ 2 ครั้ง)";
    }
    return null;
  }
  function goalLabel(v){
    switch(v){
      case "lose": return "ลดน้ำหนัก";
      case "maintain": return "รักษาน้ำหนักให้นิ่งที่";
      case "gain": return "เพิ่มน้ำหนัก";
    }
    return null;
  }
}
// --- สิ้นสุดโค้ด Wizard ---


/** Auto-init on each page **/
document.addEventListener("DOMContentLoaded", () => {
  initAuthTabs();
  initLogin();
  initRegister();
  initWizard();
});