
/* ==========================================================================
   Kcal Path — Frontend Logic (Vanilla JS, no frameworks)
   Handles:
   - Login form (demo only)
   - Multi-step wizard: gender, age/weight/height, activity, goal, confirm
   - Client-side validation & state persistence via sessionStorage
   - Simple navigation helpers
   ========================================================================== */

/** Utilities **/
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const STORAGE_KEY = "kcalPathState";

/** Simple router-ish helpers (separate pages) **/
function go(href){ window.location.href = href; }

/** Persist wizard state across pages **/
function loadState(){
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {}; }
  catch(e){ return {}; }
}
function saveState(patch){
  const next = { ...loadState(), ...patch };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
function clearState(){ sessionStorage.removeItem(STORAGE_KEY); }

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
    // pretend success then go to wizard
    go("wizard.html");
  });

  $("#forgot").addEventListener("click", () => {
    alert("ลืมรหัสผ่าน — เดโม: สมมุติว่ารับอีเมลเพื่อรีเซ็ต");
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
        alert("ยืนยันสำเร็จ! (เดโม)\nระบบจะบันทึกข้อมูลของคุณไว้ใน sessionStorage");
      }
    });
  }

  // Dynamic: any change -> save
  wizard.addEventListener("input", () => collectAndSave());

  // Prime first view
  show(0);
  updateConfirmPreview();

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
      // nothing extra, but ensure state exists
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
