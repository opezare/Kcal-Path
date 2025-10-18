// auth-guard.js
(function() {
    // ตรวจสอบว่ามีข้อมูลโปรไฟล์ (ที่ได้จาก Wizard หรือ Calculator) หรือไม่
    const profileData = localStorage.getItem('kcalPathInputs');
    
    // ถ้าไม่มีข้อมูล และ เราไม่ได้อยู่ที่หน้า login หรือ wizard
    if (!profileData && 
        !window.location.pathname.includes('/login.html') && 
        !window.location.pathname.includes('/wizard.html')) {
        
        alert("กรุณาตั้งค่าโปรไฟล์ของคุณก่อนเข้าใช้งาน");
        
        // พยายามเด้งกลับไปหน้า login (ปรับ path ตามโครงสร้างของคุณ)
        // สมมติว่า login อยู่ที่ /login/login.html
        let loginPath = '../login/login.html';
        
        // ตรวจสอบว่าเราอยู่ที่ root หรือไม่
        if (window.location.pathname.includes('/page/')) {
             loginPath = '../login/login.html';
        } else if (window.location.pathname.includes('/daily/')) {
             loginPath = '../login/login.html';
        } else if (window.location.pathname.includes('/bmi/')) {
             loginPath = '../login/login.html';
        } else if (window.location.pathname.includes('/statistics/')) {
             loginPath = '../login/login.html';
        } else {
             loginPath = 'login/login.html'; // ถ้าอยู่ที่ root
        }

        window.location.href = loginPath; 
    }
})();