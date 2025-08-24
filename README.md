
# Kcal Path — Login & Multi-step Wizard (Vanilla HTML/CSS/JS)

โปรเจกต์ตัวอย่างที่ทำ UI ตามไฟล์ดีไซน์ “Kcal path login.pdf” โดย **แยกไฟล์** ออกเป็น `index.html`, `wizard.html`, `styles.css`, `script.js`

## โครงสร้างไฟล์
```
kcal-path-site/
├─ index.html     # หน้าเข้าสู่ระบบ (Forgot Password / Sign in)
├─ wizard.html    # ฟอร์มหลายขั้นตอน: เพศ → อายุ/น้ำหนัก/ส่วนสูง → การขยับร่างกาย → เป้าหมาย → ยืนยัน
├─ styles.css     # สไตล์ทั้งหมด (รีเซ็ต, ยูทิลิตี้, การ์ด, ปุ่ม, Wizard, ฯลฯ)
└─ script.js      # ลอจิกทั้งหมด (validation, sessionStorage, การนำทาง)
```

## การใช้งาน
1. เปิด `index.html` ด้วยเบราว์เซอร์
2. กด **Sign in** (ระบบเดโม จะพาไป `wizard.html`)
3. กรอกข้อมูลทีละขั้น → ถัดไป → จนถึงหน้ายืนยัน แล้วกด **ยืนยัน**

> **หมายเหตุ:** โค้ดนี้ใช้ **Vanilla JS** 100% ไม่มีไลบรารีภายนอก เพื่อให้ง่ายต่อการแก้ไขและเรียนรู้

## ปรับแต่ง
- ปรับสีธีมได้ที่ตัวแปรใน `:root` ของ `styles.css`
- หากอยากคำนวณ BMR/TDEE เพิ่ม ให้ใส่ลอจิกต่อที่ `updateConfirmPreview()` ใน `script.js`
