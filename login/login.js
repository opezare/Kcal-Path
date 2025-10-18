/* ==========================================================================
   Kcal Path — Frontend Logic (Vanilla JS, no frameworks)
   Handles:
   - Login form (demo only)
   - Multi-step wizard: gender, age/weight/height, activity, goal, confirm
   - (แก้ไข) ใช้ localStorage เพื่อบันทึกข้อมูลข้าม session
   - (แก้ไข) คำนวณและบันทึกข้อมูลหลักของผู้ใช้
   ========================================================================== */

/** Utilities **/
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// (แก้ไข) เปลี่ยน key สำหรับ state ชั่วคราวของ wizard
const WIZARD_STATE_KEY = "kcalPathWizardState"; 

/** Simple router-ish helpers (separate pages) **/
function go(href){ window.location.href = href; }

/** (แก้ไข) Persist wizard state (ใช้ sessionStorage สำหรับ state ชั่วคราว) **/
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

/** Login page logic **/
function initLogin(){
  const form = $("#loginForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#email").value.trim();
    const password = $("#password").value.trim();
    const error = $("#loginError");

    error.textContent = "";

    // demo validation only
    if(!email || !password){
      error.textContent = "กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน";
      return;
    }
    // ล้าง state เก่า (ถ้ามี) และไปหน้า wizard
    clearState();
    go("wizard.html");
  });

  $("#forgot").addEventListener("click", () => {
    alert("ลืมรหัสผ่าน — : ยืนยันอีเมลเพื่อรีเซ็ต");
  });
}

/** Wizard page logic **/
function setProgress(stepIndex, totalSteps){
  const pct = Math.round(((stepIndex + 1) / totalSteps) * 100);
  const bar = $(".progress .bar");
  if(bar) bar.style.width = pct + "%";
  const badge = $("#stepBadge");
  if(badge) badge.textContent = `ขั้นตอน ${stepIndex + 1}/${totalSteps}`;
}

function initWizard(){
  const wizard = $("#wizard");
  if(!wizard) return;

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
  $$(".next").forEach(btn => btn.addEventListener("click", () => {
    if(validate(current)){
      show(Math.min(current + 1, total - 1));
    }
  }));

  $$(".prev").forEach(btn => btn.addEventListener("click", () => {
    show(Math.max(current - 1, 0));
  }));

  // Final confirm
  const confirmBtn = $("#confirmSubmit");
  if(confirmBtn){
    confirmBtn.addEventListener("click", () => {
      if(validate(current)){
        
        // --- (เพิ่มใหม่) คำนวณและบันทึกข้อมูลหลัก ---
        calculateAndSaveMasterData();
        
        alert("ยืนยันสำเร็จ! \nระบบจะบันทึกข้อมูลของคุณไว้");
        go("../page/page.html"); // (แก้ไข) ไปหน้า page.html
      }
    });
  }

  // Dynamic: any change -> save
  wizard.addEventListener("input", () => collectAndSave());

  // Prime first view
  show(0);
  updateConfirmPreview();

  /** (เพิ่ม) ฟังก์ชันคำนวณและบันทึกข้อมูลหลัก **/
  function calculateAndSaveMasterData() {
        const state = loadState(); // โหลดข้อมูลล่าสุด (ที่เพิ่ง validate ผ่าน)
        
        const weight = parseFloat(state.weight);
        const height = parseFloat(state.height);
        const age = parseFloat(state.age);
        const gender = state.gender;
        
        // (1) หาค่า Activity Multiplier
        const activityMultipliers = {
            "none": 1.2,
            "light": 1.375,
            "moderate": 1.55,
            "active": 1.725,
            "athlete": 1.9
        };
        const activityValue = activityMultipliers[state.activity] || 1.2;

        // (2) คำนวณ BMI
        const h_m = height / 100;
        const bmi = weight / (h_m * h_m);
        let bmiStatus = '';
        if (bmi < 18.5) bmiStatus = 'น้ำหนักน้อย/ผอม';
        else if (bmi < 23) bmiStatus = 'สมส่วน';
        else if (bmi < 25) bmiStatus = 'น้ำหนักเกิน';
        else if (bmi < 30) bmiStatus = 'อ้วนระดับ 1';
        else bmiStatus = 'อ้วนระดับ 2 (อันตราย)';

        // (3) คำนวณ BMR (Mifflin-St Jeor)
        let bmr = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'male' ? 5 : -161);
        bmr = Math.round(bmr);
        
        // (4) คำนวณ TDEE
        let tdee = Math.round(bmr * activityValue);
        
        // (5) คำนวณ Goal Calories
        let goalCalories = tdee;
        if (state.goal === 'lose') goalCalories = Math.round(tdee - 500); 
        else if (state.goal === 'gain') goalCalories = Math.round(tdee + 500); 

        // (6) คำนวณ Macro Goals (40% Carb, 30% Protein, 30% Fat)
        const goalCarb = Math.round((goalCalories * 0.40) / 4);
        const goalProtein = Math.round((goalCalories * 0.30) / 4);
        const goalFat = Math.round((goalCalories * 0.30) / 9);

        // (7) บันทึกข้อมูลทั้งหมดลง localStorage ให้ไฟล์อื่นใช้
        const inputs = {
            gender: gender,
            age: age,
            weight: weight,
            height: height,
            activity: activityValue, // บันทึกเป็นค่าตัวเลข
            goal: state.goal
        };
        // บันทึกถาวรลง localStorage
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
        
        // (8) ล้าง state ชั่วคราวของ wizard
        clearState();
  }


  /** Validation per step **/
  function validate(stepIdx){
    clearErrors();
    // step 0: gender
    if(stepIdx === 0){
      const gender = $$('input[name="gender"]:checked').map(i => i.value)[0];
      if(!gender) return error("#genderError", "กรุณาเลือกเพศ");
      return true;
    }
    // step 1: age, weight, height
    if(stepIdx === 1){
      const age = +$("#age").value;
      const weight = +$("#weight").value;
      const height = +$("#height").value;
      if(!(age >= 5 && age <= 120)) return error("#awwError", "อายุต้องอยู่ระหว่าง 5–120 ปี");
      if(!(weight >= 20 && weight <= 300)) return error("#awwError", "น้ำหนักต้องอยู่ระหว่าง 20–300 กก.");
      if(!(height >= 80 && height <= 250)) return error("#awwError", "ส่วนสูงต้องอยู่ระหว่าง 80–250 ซม.");
      return true;
    }
    // step 2: activity
    if(stepIdx === 2){
      const act = $$('input[name="activity"]:checked').map(i => i.value)[0];
      if(!act) return error("#activityError", "กรุณาเลือกระดับการขยับร่างกาย");
      return true;
    }
    // step 3: goal
    if(stepIdx === 3){
      const goal = $$('input[name="goal"]:checked').map(i => i.value)[0];
      if(!goal) return error("#goalError", "กรุณาเลือกเป้าหมาย");
      return true;
    }
    // step 4: confirm
    if(stepIdx === 4){
      const s = loadState();
      if(!s.gender || !s.age || !s.weight || !s.height || !s.activity || !s.goal){
        return error("#confirmError", "ข้อมูลไม่ครบถ้วน");
      }
      return true;
    }
    return true;
  }

  function error(sel, msg){
    const el = $(sel);
    if(el) el.textContent = msg;
    return false;
  }
  function clearErrors(){ $$(".error").forEach(e => e.textContent = ""); }

  /** Gather, persist, and update preview **/
  function collectAndSave(){
    const data = {
      gender: $$('input[name="gender"]:checked').map(i => i.value)[0] || null,
      age: $("#age")?.value || null,
      weight: $("#weight")?.value || null,
      height: $("#height")?.value || null,
      activity: $$('input[name="activity"]:checked').map(i => i.value)[0] || null,
      goal: $$('input[name="goal"]:checked').map(i => i.value)[0] || null,
    };
    saveState(data);
    updateConfirmPreview();
  }

  /** On load, fill values from sessionStorage **/
  function hydrateFromState(s){
    if(!s) return;
    if(s.gender) {
      const g = $(`input[name="gender"][value="${s.gender}"]`);
      if(g) g.checked = true;
    }
    if(s.age) $("#age").value = s.age;
    if(s.weight) $("#weight").value = s.weight;
    if(s.height) $("#height").value = s.height;
    if(s.activity){
      const a = $(`input[name="activity"][value="${s.activity}"]`);
      if(a) a.checked = true;
    }
    if(s.goal){
      const g2 = $(`input[name="goal"][value="${s.goal}"]`);
      if(g2) g2.checked = true;
    }
  }

  /** Confirmation preview block **/
  function updateConfirmPreview(){
    const s = loadState();
    $("#pv-gender").textContent  = s.gender   ? (s.gender === "male" ? "ชาย" : "หญิง") : "-";
    $("#pv-age").textContent     = s.age      || "-";
    $("#pv-weight").textContent  = s.weight   || "-";
    $("#pv-height").textContent  = s.height   || "-";
    $("#pv-activity").textContent= activityLabel(s.activity) || "-";
    $("#pv-goal").textContent    = goalLabel(s.goal) || "-";
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

/** Auto-init on each page **/
document.addEventListener("DOMContentLoaded", () => {
  initLogin();
  initWizard();
});