// Menu data
const menuData = [
    // -----------------------------------------------------------
    // 🍚 หมวด 1: เมนูข้าว / จานหลัก
    // -----------------------------------------------------------
    { 
        name:'ผัดกะเพราไก่', 
        imageURL:'https://images.unsplash.com/photo-1636640438799-6f1a0da8228a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:450, protein:35, fat:20, carbs:30} 
    },
    { 
        name:'ข้าวมันไก่', 
        imageURL:'https://images.unsplash.com/photo-1626073102467-1a5d1b2c718e?q=80&w=800&auto=format&fit=crop',
        nutrition:{calories:520, protein:30, fat:16, carbs:58} 
    },
    { 
        name:'ไก่ทอดน้ำปลา', 
        imageURL:'https://images.unsplash.com/photo-1604908177571-271bbf2df4a3?q=80&w=800&auto=format&fit=crop',
        nutrition:{calories:560, protein:40, fat:28, carbs:36} 
    },
    { 
        name:'ข้าวผัดหมู', 
        imageURL:'https://images.unsplash.com/photo-1543339460-a2924197c36a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:630, protein:25, fat:30, carbs:65} 
    },
    { 
        name:'ข้าวขาหมู', 
        imageURL:'https://images.unsplash.com/photo-1579753224097-4022830e7033?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:650, protein:35, fat:38, carbs:40} 
    },
    { 
        name:'ไข่เจียวหมูสับ', 
        imageURL:'https://images.unsplash.com/photo-1615456485890-e55d5e2e7b5b?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:420, protein:20, fat:30, carbs:15} 
    },
    { 
        name:'ข้าวผัดกุ้ง', 
        imageURL:'https://images.unsplash.com/photo-1543261621-c7c4b0057e93?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:580, protein:25, fat:25, carbs:60} 
    },
    { 
        name:'ผัดพริกแกงหมู', 
        imageURL:'https://images.unsplash.com/photo-1636750033664-d115e4f4d2a1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:490, protein:30, fat:25, carbs:35} 
    },
    { 
        name:'หมูกระเทียม', 
        imageURL:'https://images.unsplash.com/photo-1594950949216-9b50b5711718?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:550, protein:32, fat:30, carbs:40} 
    },
    { 
        name:'ผัดผักรวมมิตร (ไก่)', 
        imageURL:'https://images.unsplash.com/photo-1601389825442-f834d8a1c97a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:320, protein:30, fat:12, carbs:25} 
    },
    { 
        name:'แกงเผ็ดเป็ดย่าง', 
        imageURL:'https://images.unsplash.com/photo-1563721345917-1f4a9b69b5c3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:480, protein:35, fat:30, carbs:20} 
    },
    { 
        name:'ผัดพริกเผาหมู', 
        imageURL:'https://images.unsplash.com/photo-1636750033664-d115e4f4d2a1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:500, protein:30, fat:25, carbs:40} 
    },
    { 
        name:'ผัดเปรี้ยวหวานไก่', 
        imageURL:'https://images.unsplash.com/photo-1601389825442-f834d8a1c97a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:420, protein:28, fat:15, carbs:45} 
    },
    { 
        name:'ข้าวหมูแดง', 
        imageURL:'https://images.unsplash.com/photo-1622359560383-a74e548d1e2b?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:550, protein:30, fat:20, carbs:60} 
    },
    { 
        name:'ข้าวผัดรถไฟ (หมู)', 
        imageURL:'https://images.unsplash.com/photo-1543339460-a2924197c36a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:620, protein:25, fat:30, carbs:65} 
    },
    { 
        name:'ผัดถั่วงอกเต้าหู้หมูสับ', 
        imageURL:'https://images.unsplash.com/photo-1601389825442-f834d8a1c97a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:350, protein:30, fat:15, carbs:25} 
    },


    // -----------------------------------------------------------
    // 🥓 หมวด 2: เมนูหมูกรอบ 
    // -----------------------------------------------------------
    { 
        name:'ข้าวหมูกรอบ', 
        imageURL:'https://images.unsplash.com/photo-1622359560383-a74e548d1e2b?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:680, protein:35, fat:45, carbs:35} 
    },
    { 
        name:'ผัดคะน้าหมูกรอบ', 
        imageURL:'https://images.unsplash.com/photo-1636640438799-6f1a0da8228a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:580, protein:28, fat:35, carbs:30} 
    },
    { 
        name:'หมูกรอบคั่วพริกเกลือ', 
        imageURL:'https://images.unsplash.com/photo-1604908177571-271bbf2df4a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:610, protein:30, fat:40, carbs:25} 
    },
    { 
        name:'ผัดกะเพราหมูกรอบ', 
        imageURL:'https://images.unsplash.com/photo-1636640438799-6f1a0da8228a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:600, protein:30, fat:35, carbs:35} 
    },
    { 
        name:'ข้าวผัดพริกแกงหมูกรอบ', 
        imageURL:'https://images.unsplash.com/photo-1636750033664-d115e4f4d2a1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:650, protein:30, fat:40, carbs:55} 
    },
    { 
        name:'ข้าวราดหน้าหมูกรอบ', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:590, protein:28, fat:35, carbs:50} 
    },
    { 
        name:'ผัดพริกเผาหมูกรอบ', 
        imageURL:'https://images.unsplash.com/photo-1636750033664-d115e4f4d2a1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:620, protein:30, fat:38, carbs:55} 
    },
    { 
        name:'หมูกรอบผัดกะปิ', 
        imageURL:'https://images.unsplash.com/photo-1636750033664-d115e4f4d2a1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:640, protein:32, fat:42, carbs:45} 
    },
    { 
        name:'หมูกรอบผัดน้ำมันหอย', 
        imageURL:'https://images.unsplash.com/photo-1636640438799-6f1a0da8228a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:580, protein:30, fat:35, carbs:40} 
    },
    { 
        name:'ผัดมักกะโรนีหมูกรอบ', 
        imageURL:'https://images.unsplash.com/photo-1543261621-c7c4b0057e93?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:680, protein:35, fat:40, carbs:60} 
    },
    { 
        name:'ผัดพริกไทยดำหมูกรอบ', 
        imageURL:'https://images.unsplash.com/photo-1594950949216-9b50b5711718?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:600, protein:32, fat:35, carbs:45} 
    },
    { 
        name:'หมูกรอบผัดพริกอ่อน', 
        imageURL:'https://images.unsplash.com/photo-1636750033664-d115e4f4d2a1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:570, protein:30, fat:35, carbs:40} 
    },


    // -----------------------------------------------------------
    // 🍜 หมวด 3: เมนูเส้น / ก๋วยเตี๋ยว
    // -----------------------------------------------------------
    { 
        name:'ผัดซีอิ๊วไก่', 
        imageURL:'https://images.unsplash.com/photo-1616791244342-a393c3c1e55c?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:480, protein:28, fat:22, carbs:45} 
    },
    { 
        name:'ราดหน้าหมู', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:400, protein:20, fat:15, carbs:48} 
    },
    { 
        name:'ก๋วยเตี๋ยวเรือ (น้ำตก)', 
        imageURL:'https://images.unsplash.com/photo-1549488340-e224e2c94a97?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:360, protein:22, fat:10, carbs:45} 
    },
    { 
        name:'มาม่าผัด', 
        imageURL:'https://images.unsplash.com/photo-1582234057077-9d7a2f5e1f0e?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:410, protein:15, fat:20, carbs:45} 
    },
    { 
        name:'ก๋วยเตี๋ยวคั่วไก่', 
        imageURL:'https://images.unsplash.com/photo-1637731773099-0f0e8f0b7e2a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:450, protein:28, fat:20, carbs:40} 
    },
    { 
        name:'ข้าวซอยไก่', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:450, protein:25, fat:25, carbs:35} 
    },
    { 
        name:'ผัดขี้เมาทะเล', 
        imageURL:'https://images.unsplash.com/photo-1603565612248-c9c4b7875b22?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:490, protein:35, fat:20, carbs:45} 
    },
    { 
        name:'ผัดวุ้นเส้นชะอมกุ้ง', 
        imageURL:'https://images.unsplash.com/photo-1616791244342-a393c3c1e55c?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:380, protein:25, fat:15, carbs:40} 
    },
    { 
        name:'สุกี้แห้งทะเล', 
        imageURL:'https://images.unsplash.com/photo-1549488340-e224e2c94a97?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:300, protein:35, fat:10, carbs:20} 
    },
    { 
        name:'สุกี้น้ำไก่', 
        imageURL:'https://images.unsplash.com/photo-1549488340-e224e2c94a97?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:250, protein:30, fat:5, carbs:20} 
    },
    { 
        name:'หอยทอด', 
        imageURL:'https://images.unsplash.com/photo-1543261621-c7c4b0057e93?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:550, protein:20, fat:35, carbs:40} 
    },
    { 
        name:'ออส่วน', 
        imageURL:'https://images.unsplash.com/photo-1543261621-c7c4b0057e93?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:600, protein:20, fat:45, carbs:30} 
    },
    { 
        name:'ก๋วยเตี๋ยวหลอดหมูกรอบ', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:480, protein:25, fat:28, carbs:45} 
    },
    { 
        name:'บะหมี่แห้งหมูกรอบ', 
        imageURL:'https://images.unsplash.com/photo-1626073102467-1a5d1b2c718e?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:550, protein:30, fat:32, carbs:45} 
    },


    // -----------------------------------------------------------
    // 🍲 หมวด 4: เมนูน้ำ/แกง/ต้ม
    // -----------------------------------------------------------
    { 
        name:'ต้มยำกุ้ง', 
        imageURL:'https://images.unsplash.com/photo-1626073079715-ef71e30c1a02?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:220, protein:15, fat:10, carbs:16} 
    },
    { 
        name:'ต้มเลือดหมู', 
        imageURL:'https://images.unsplash.com/photo-1634842183864-441f710b78d6?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:280, protein:35, fat:10, carbs:15} 
    },
    { 
        name:'แกงเขียวหวานไก่', 
        imageURL:'https://images.unsplash.com/photo-1563721345917-1f4a9b69b5c3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:430, protein:25, fat:25, carbs:30} 
    },
    { 
        name:'ข้าวต้มกุ้ง', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:250, protein:20, fat:5, carbs:30} 
    },
    { 
        name:'ข้าวต้มปลา', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:220, protein:25, fat:3, carbs:25} 
    },


    // -----------------------------------------------------------
    // 🥗 หมวด 5: ยำ/สลัด/ของกินเล่น/อื่น ๆ
    // -----------------------------------------------------------
    { 
        name:'ส้มตำไทย',
        imageURL:'https://images.unsplash.com/photo-1626072845734-b5036e2de4e3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:140, protein:5, fat:4, carbs:18} 
    },
    { 
        name:'หมูสะเต๊ะ (10 ไม้)', 
        imageURL:'https://images.unsplash.com/photo-1604908177571-271bbf2df4a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:400, protein:30, fat:25, carbs:15} 
    },
    { 
        name:'หมูมะนาว', 
        imageURL:'https://images.unsplash.com/photo-1626072845734-b5036e2de4e3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:280, protein:35, fat:10, carbs:10} 
    },


    // -----------------------------------------------------------
    // 🍗 หมวด 6: เมนูทอด (เน้นอาหารทอด)
    // -----------------------------------------------------------
    { 
        name:'ข้าวปลาทอดกระเทียม', 
        imageURL:'https://images.unsplash.com/photo-1604908177571-271bbf2df4a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:550, protein:35, fat:25, carbs:45} 
    },
    { 
        name:'ไก่ทอด (ส่วนสะโพก)', 
        imageURL:'https://images.unsplash.com/photo-1604908177571-271bbf2df4a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:380, protein:28, fat:25, carbs:8} 
    },
    { 
        name:'หมูทอดแดดเดียว (ไม่ราดข้าว)', 
        imageURL:'https://images.unsplash.com/photo-1604908177571-271bbf2df4a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:450, protein:35, fat:30, carbs:10} 
    },
    { 
        name:'ปลากระพงทอดราดพริก', 
        imageURL:'https://images.unsplash.com/photo-1604908177571-271bbf2df4a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:600, protein:40, fat:35, carbs:30} 
    },
    { 
        name:'ไข่ดาว (1 ฟอง)', 
        imageURL:'https://images.unsplash.com/photo-1615456485890-e55d5e2e7b5b?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:120, protein:6, fat:9, carbs:1} 
    },
    { 
        name:'ไก่ทอด (ส่วนปีก) 1 ชิ้น', 
        imageURL:'https://images.unsplash.com/photo-1604908177571-271bbf2df4a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:180, protein:15, fat:12, carbs:4} 
    },
    { 
        name:'ข้าวผัดปลาเค็ม', 
        imageURL:'https://images.unsplash.com/photo-1543339460-a2924197c36a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:600, protein:25, fat:30, carbs:65} 
    },
    { 
        name:'ทอดมันปลากราย (5 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1636750033664-d115e4f4d2a1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:300, protein:20, fat:18, carbs:15} 
    },
    { 
        name:'ลาบทอด (5 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1626072845734-b5036e2de4e3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:350, protein:25, fat:25, carbs:10} 
    },
    { 
        name:'ข้าวหมูทอด', 
        imageURL:'https://images.unsplash.com/photo-1543339460-a2924197c36a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:600, protein:30, fat:35, carbs:40} 
    },
    { 
        name:'ผัดฉู่ฉี่ปลาทอด', 
        imageURL:'https://images.unsplash.com/photo-1636750033664-d115e4f4d2a1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:520, protein:35, fat:30, carbs:25} 
    },
    { 
        name:'กุ้งชุบแป้งทอด (4 ตัว)', 
        imageURL:'https://images.unsplash.com/photo-1543261621-c7c4b0057e93?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:280, protein:15, fat:18, carbs:15} 
    },
    { 
        name:'ปลาทูทอด (1 ตัว)', 
        imageURL:'https://images.unsplash.com/photo-1604908177571-271bbf2df4a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:250, protein:30, fat:15, carbs:0} 
    },
    { 
        name:'หมูทอดกระเทียม (คลีน/ไม่ใช้น้ำมันเยอะ) 100g', 
        imageURL:'https://images.unsplash.com/photo-1594950949216-9b50b5711718?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:250, protein:35, fat:10, carbs:5} 
    },
    { 
        name:'ปีกไก่ทอดน้ำปลา (ไม่ราดข้าว)', 
        imageURL:'https://images.unsplash.com/photo-1604908177571-271bbf2df4a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:400, protein:30, fat:25, carbs:10} 
    },


    // -----------------------------------------------------------
    // 🍚 หมวด 7: เมนูข้าวเปล่า / ข้าวเหนียว
    // -----------------------------------------------------------
    { 
        name:'ข้าวขาว 100g', 
        imageURL:'https://images.unsplash.com/photo-1550989460-0adf9df7ab8e?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:130, protein:2.5, fat:0.3, carbs:28} 
    },
    { 
        name:'ข้าวกล้อง 100g', 
        imageURL:'https://images.unsplash.com/photo-1550989460-0adf9df7ab8e?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:110, protein:2.5, fat:1.0, carbs:23} 
    },
    { 
        name:'ข้าวไรซ์เบอร์รี่ 100g', 
        imageURL:'https://images.unsplash.com/photo-1550989460-0adf9df7ab8e?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:120, protein:3.0, fat:0.8, carbs:24} 
    },
    { 
        name:'ข้าวเหนียว 100g', 
        imageURL:'https://images.unsplash.com/photo-1627917228812-b9034260907d?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:170, protein:3.5, fat:0.2, carbs:37} 
    },


        // เมนูไก่ย่าง/หมูปิ้งที่
    { 
        name:'หมูปิ้ง (ไม้มาตรฐาน)', 
        imageURL:'https://images.unsplash.com/photo-1627917228812-b9034260907d?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:120, protein:8, fat:8, carbs:4} 
    },
    { 
        name:'หมูปิ้ง (เนื้อล้วน)', 
        imageURL:'https://images.unsplash.com/photo-1627917228812-b9034260907d?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:85, protein:10, fat:4, carbs:2} 
    },
    { 
        name:'ข้าวเหนียว + หมูปิ้ง 3 ไม้', 
        imageURL:'https://images.unsplash.com/photo-1627917228812-b9034260907d?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:480, protein:28, fat:25, carbs:40} 
    },


    // -----------------------------------------------------------
    // 🥚 หมวด 8: เมนูไข่
    // -----------------------------------------------------------
    { 
        name:'ไข่ต้ม (เบอร์ 2) 1 ฟอง', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:77, protein:6.3, fat:5.3, carbs:0.6} 
    },
    { 
        name:'ไข่ลวก/ไข่ออนเซ็น 1 ฟอง', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:70, protein:6.0, fat:4.8, carbs:0.5} 
    },
    { 
        name:'ไข่ตุ๋นหมูสับ (ชามเล็ก)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:150, protein:12, fat:8, carbs:5} 
    },
    { 
        name:'ไข่เจียว 1 ฟอง', 
        imageURL:'https://images.unsplash.com/photo-1615456485890-e55d5e2e7b5b?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:150, protein:7, fat:13, carbs:1} 
    },
    { 
        name:'ไข่ดาว (1 ฟอง)', 
        imageURL:'https://images.unsplash.com/photo-1615456485890-e55d5e2e7b5b?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:120, protein:6, fat:9, carbs:1} 
    },
    { 
        name:'ไข่พะโล้ (เฉพาะไข่ 1 ฟอง)', 
        imageURL:'https://images.unsplash.com/photo-1563721345917-1f4a9b69b5c3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:90, protein:7, fat:6, carbs:2} 
    },
    { 
        name:'ไข่ลูกเขย (1 ฟอง)', 
        imageURL:'https://images.unsplash.com/photo-1601389825442-f834d8a1c97a?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:180, protein:7, fat:12, carbs:8} 
    },
    { 
        name:'ไข่แดงเค็ม (1 ฟอง)', 
        imageURL:'https://images.unsplash.com/photo-1626072845734-b5036e2de4e3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:90, protein:4, fat:7, carbs:1} 
    },


    // -----------------------------------------------------------
    // 🍉 หมวด 9: ผลไม้ (อ้างอิงปริมาณ 100 กรัม)
    // -----------------------------------------------------------
    { 
        name:'กล้วยหอม 100g', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:89, protein:1.1, fat:0.3, carbs:23} 
    },
    { 
        name:'ส้มสายน้ำผึ้ง 100g', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:47, protein:0.9, fat:0.1, carbs:12} 
    },
    { 
        name:'แอปเปิ้ลเขียว 100g', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:52, protein:0.3, fat:0.2, carbs:14} 
    },
    { 
        name:'มะม่วงสุก 100g', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:60, protein:0.8, fat:0.4, carbs:15} 
    },
    { 
        name:'ฝรั่ง 100g', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:68, protein:2.6, fat:1.0, carbs:14} 
    },
    { 
        name:'แก้วมังกร 100g', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:60, protein:1.0, fat:0.4, carbs:12} 
    },
    { 
        name:'แตงโม 100g', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:30, protein:0.6, fat:0.2, carbs:8} 
    },
    { 
        name:'สับปะรด 100g', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:50, protein:0.5, fat:0.1, carbs:13} 
    },
    { 
        name:'ลองกอง 100g', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:80, protein:1.0, fat:0.1, carbs:21} 
    },
    { 
        name:'องุ่นเขียว 100g', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:69, protein:0.6, fat:0.3, carbs:18} 
    },
     { 
        name:'ส้มโอ 100g', 
        imageURL:'https://images.unsplash.com/photo-1596781226463-5188849646b1?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:38, protein:0.8, fat:0.04, carbs:9.6} 
    },


    // -----------------------------------------------------------
    // 🥩 หมวด 10: เนื้อสัตว์ (อ้างอิง 100 กรัม เนื้อปรุงสุก)
    // -----------------------------------------------------------
    { 
        name:'อกไก่ (ต้ม/ย่าง) 100g', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:165, protein:31, fat:3.5, carbs:0} 
    },
    { 
        name:'เนื้อวัวสันใน (ย่าง) 100g', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:200, protein:28, fat:9, carbs:0} 
    },
    { 
        name:'เนื้อหมูสันใน (ย่าง/ต้ม) 100g', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:180, protein:29, fat:6, carbs:0} 
    },
    { 
        name:'ปลาแซลมอน (ย่าง/อบ) 100g', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:208, protein:25, fat:12, carbs:0} 
    },
    { 
        name:'กุ้ง (ต้ม/ย่าง) 100g', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:99, protein:24, fat:0.3, carbs:0.5} 
    },
    { 
        name:'หมูสามชั้น (ต้ม) 100g', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:350, protein:20, fat:30, carbs:0} 
    },
    { 
        name:'เนื้อวัวติดมัน (ย่าง) 100g', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:250, protein:25, fat:16, carbs:0} 
    },
    { 
        name:'ไข่ขาว (ต้ม) 100g', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:52, protein:11, fat:0.2, carbs:0.7} 
    },
    { 
        name:'ปลาทูน่าในน้ำแร่ (1 กระป๋อง)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:110, protein:25, fat:1, carbs:0} 
    },
    { 
        name:'ปลาทับทิม (นึ่ง) 100g', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:110, protein:22, fat:2, carbs:0} 
    },
    { 
        name:'เนื้อเป็ด (ย่าง/หนังออก) 100g', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:200, protein:25, fat:10, carbs:0} 
    },
    { 
        name:'ปู (นึ่ง) 100g', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:87, protein:18, fat:1, carbs:0} 
    },


    // -----------------------------------------------------------
    // 🍰 หมวด 11: ขนมหวาน / เบเกอรี่ / ขนมไทย
    // -----------------------------------------------------------
    { 
        name:'ข้าวเหนียวมะม่วง (1 จาน)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:350, protein:5, fat:18, carbs:40} 
    },
    { 
        name:'เค้กช็อกโกแลต (1 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:300, protein:4, fat:15, carbs:38} 
    },
    { 
        name:'ไอศกรีมวานิลลา (2 สกู๊ป)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:220, protein:4, fat:12, carbs:25} 
    },
    { 
        name:'บัวลอยไข่หวาน (1 ถ้วย)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:250, protein:5, fat:10, carbs:35} 
    },
    { 
        name:'ขนมปังเนยน้ำตาล (1 แผ่น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:180, protein:3, fat:10, carbs:20} 
    },
    { 
        name:'โดนัทเคลือบน้ำตาล (1 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:250, protein:3, fat:14, carbs:28} 
    },
    { 
        name:'ขนมชั้น (2 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:150, protein:1, fat:4, carbs:28} 
    },
    { 
        name:'ทองหยิบ/ทองหยอด (3 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:180, protein:3, fat:5, carbs:32} 
    },
    { 
        name:'วุ้นกะทิ (1 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:120, protein:1, fat:8, carbs:12} 
    },
    { 
        name:'ทับทิมกรอบ (1 ถ้วย)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:200, protein:1, fat:5, carbs:38} 
    },
    { 
        name:'คุกกี้ช็อกโกแลตชิพ (2 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:280, protein:3, fat:16, carbs:30} 
    },
    { 
        name:'เอแคลร์ (3 ลูก)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:180, protein:4, fat:12, carbs:14} 
    },
    { 
        name:'สังขยาฟักทอง (1/4 ลูก)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:220, protein:5, fat:12, carbs:22} 
    },
    { 
        name:'พุดดิ้งนมสด (1 ถ้วย)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:180, protein:6, fat:10, carbs:18} 
    },
    { 
        name:'เค้กกล้วยหอม (1 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:240, protein:3, fat:12, carbs:30} 
    },


    { 
        name:'ครัวซองต์ (Plain) 1 ชิ้น', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:250, protein:5, fat:15, carbs:25} 
    },
    { 
        name:'บราวนี่ (1 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:350, protein:4, fat:20, carbs:40} 
    },
    { 
        name:'ชีสเค้ก (1 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:320, protein:8, fat:20, carbs:25} 
    },
    { 
        name:'ทาร์ตไข่ (1 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:180, protein:4, fat:10, carbs:18} 
    },
    { 
        name:'มาการอง (2 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:160, protein:3, fat:8, carbs:20} 
    },
    { 
        name:'วาฟเฟิล (1 ชิ้น) ไม่รวมท็อปปิ้ง', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:200, protein:5, fat:10, carbs:25} 
    },
    { 
        name:'เค้กโรล/สวิสโรล (1 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:220, protein:4, fat:10, carbs:30} 
    },
    { 
        name:'มัฟฟินบลูเบอร์รี่ (1 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:380, protein:6, fat:18, carbs:48} 
    },
    { 
        name:'ซอฟต์คุกกี้ (ขนาดใหญ่) 1 ชิ้น', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:280, protein:4, fat:15, carbs:32} 
    },
    { 
        name:'พายไส้ไก่ (1 ชิ้น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:320, protein:10, fat:20, carbs:25} 
    },
    { 
        name:'ขนมปังโฮลวีท (2 แผ่น)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:160, protein:8, fat:2, carbs:30} 
    },
    { 
        name:'พุดดิ้งช็อกโกแลต (1 ถ้วย)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:200, protein:5, fat:10, carbs:25} 
    },


    // -----------------------------------------------------------
    // 🍹 หมวด 12: เครื่องดื่ม / กาแฟ / ชา (1 แก้วมาตรฐาน 16oz)
    // -----------------------------------------------------------
    { 
        name:'ชาไทยเย็น (สูตรหวานปกติ)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:350, protein:3, fat:18, carbs:45} 
    },
    { 
        name:'กาแฟเย็น (สูตรหวานปกติ)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:220, protein:3, fat:10, carbs:30} 
    },
    { 
        name:'ชาเขียวนมเย็น (สูตรหวานปกติ)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:300, protein:4, fat:15, carbs:38} 
    },
    { 
        name:'โกโก้เย็น (สูตรหวานปกติ)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:280, protein:5, fat:14, carbs:35} 
    },
    { 
        name:'ชานมไข่มุก (แก้วเล็ก)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:300, protein:2, fat:10, carbs:50} 
    },
    { 
        name:'ชาไทยเย็น (สูตรหวานน้อย)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:180, protein:3, fat:10, carbs:20} 
    },
    { 
        name:'อเมริกาโน่เย็น (ไม่หวาน)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:10, protein:0.5, fat:0, carbs:1.5} 
    },
    { 
        name:'ลาเต้ร้อน (นมสด 1 แก้ว)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:150, protein:8, fat:8, carbs:12} 
    },
    { 
        name:'คาปูชิโนเย็น (หวานปกติ)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:180, protein:5, fat:8, carbs:20} 
    },
    { 
        name:'น้ำอัดลม (1 กระป๋อง)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:140, protein:0, fat:0, carbs:35} 
    },
    { 
        name:'น้ำผลไม้กล่อง (200ml)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:100, protein:0.5, fat:0, carbs:25} 
    },
    { 
        name:'นมสดเย็น (หวานปกติ)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:200, protein:8, fat:10, carbs:18} 
    },
    { 
        name:'น้ำเปล่า/โซดา (ไม่ปรุงรส)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:0, protein:0, fat:0, carbs:0} 
    },
    { 
        name:'โอวัลติน/ไมโลเย็น (ปกติ)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:280, protein:5, fat:12, carbs:38} 
    },
    { 
        name:'กาแฟดำ (ชงเอง) 1 แก้ว', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:2, protein:0, fat:0, carbs:0.4} 
    },


    { 
        name:'น้ำมะพร้าวปั่นนมสด (หวานปกติ)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:250, protein:4, fat:12, carbs:30} 
    },
    { 
        name:'น้ำสตรอเบอร์รี่ปั่น (หวานปกติ)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:180, protein:1, fat:0.5, carbs:42} 
    },
    { 
        name:'กล้วยปั่นนมสด (1 ลูก)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:220, protein:5, fat:5, carbs:38} 
    },
    { 
        name:'น้ำฝรั่ง/แอปเปิ้ลปั่น (ไม่หวาน)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:120, protein:1, fat:0.5, carbs:28} 
    },
    { 
        name:'น้ำผลไม้รวมปั่น (สมูทตี้ดีท็อกซ์)', 
        imageURL:'https://images.unsplash.com/photo-1547844111-c9f7a7d451a3?q=80&w=800&auto=format&fit=crop', 
        nutrition:{calories:150, protein:2, fat:1, carbs:35} 
    }

];




let totals = { calories:0, protein:0, fat:0, carbs:0 };
const GOALS = { calories:2000, protein:75, fat:70, carbs:300 };

// Elements
const searchInput = document.getElementById('top-search');
const suggestions = document.getElementById('suggestions');

// *** ELEMENTS FOR "ADDITIONAL" INPUTS (ใหม่) ***
const additionalInputsBox = document.getElementById('additionalInputs');
const addCalInput = document.getElementById('additional-calories');
const addProInput = document.getElementById('additional-protein');
const addFatInput = document.getElementById('additional-fat');
const addCarbInput = document.getElementById('additional-carbs');
// ********************************************

const calProg = document.getElementById('calProg');
const proProg = document.getElementById('proProg');
const fatProg = document.getElementById('fatProg');
const carbProg = document.getElementById('carbProg');
const calNum = document.getElementById('calNum');
const proNum = document.getElementById('proNum');
const fatNum = document.getElementById('fatNum');
const carbNum = document.getElementById('carbNum');
const resetBtn = document.getElementById('resetDay');

const bmiResult = document.getElementById('bmiResult');
const bmrResult = document.getElementById('bmrResult');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const ageInput = document.getElementById('age');
const genderInput = document.getElementById('gender');
const activityInput = document.getElementById('activity');
const goalInput = document.getElementById('goal');
const calcBtn = document.getElementById('calcBtn');

const menuDetailBox = document.getElementById('menuDetail');
const menuImage = document.getElementById('menuImage');
const menuName = document.getElementById('menuName');
const calDetail = document.getElementById('calDetail');
const proDetail = document.getElementById('proDetail');
const fatDetail = document.getElementById('fatDetail');
const carbDetail = document.getElementById('carbDetail');
const addMenuBtn = document.getElementById('addMenuBtn');

function prepare(circle){
  const r = parseFloat(circle.getAttribute('r'));
  const c = 2*Math.PI*r;
  circle.style.strokeDasharray = c;
  circle.style.strokeDashoffset = c;
  return c;
}
const calCirc = prepare(calProg);
const proCirc = prepare(proProg);
const fatCirc = prepare(fatProg);
const carbCirc = prepare(carbProg);

function setProgress(circle, circumference, fraction){
  fraction = Math.max(0, Math.min(1, fraction));
  circle.style.strokeDashoffset = circumference * (1 - fraction);
}

function updateUI(){
  calNum.textContent = `${totals.calories} kcal`;
  proNum.textContent = `${totals.protein} g`;
  fatNum.textContent = `${totals.fat} g`;
  carbNum.textContent = `${totals.carbs} g`;
  setProgress(calProg, calCirc, totals.calories/GOALS.calories);
  setProgress(proProg, proCirc, totals.protein/GOALS.protein);
  setProgress(fatProg, fatCirc, totals.fat/GOALS.fat);
  setProgress(carbProg, carbCirc, totals.carbs/GOALS.carbs);
}

// *** FUNCTIONS FOR "ADDITIONAL" INPUTS (ใหม่) ***
function toggleAdditionalInputs() {
    // ใช้ 'flex' หรือ 'block' ตามที่ CSS ของคุณตั้งค่าไว้ในส่วนก่อนหน้า
    if (additionalInputsBox.style.display === 'none' || additionalInputsBox.style.display === '') {
        additionalInputsBox.style.display = 'flex'; 
    } else {
        additionalInputsBox.style.display = 'none';
    }
}

function applyAdditionalNutrition() {
    // 1. ดึงค่าที่กรอกมา และแปลงเป็นตัวเลข
    const addedCalories = parseFloat(addCalInput.value) || 0;
    const addedProtein = parseFloat(addProInput.value) || 0;
    const addedFat = parseFloat(addFatInput.value) || 0;
    const addedCarbs = parseFloat(addCarbInput.value) || 0;
    
    // 2. นำไปรวมกับค่ารวมปัจจุบันในวัตถุ totals
    totals.calories += addedCalories;
    totals.protein += addedProtein;
    totals.fat += addedFat;
    totals.carbs += addedCarbs;
    
    // 3. อัปเดต UI เพื่อแสดงค่ารวมใหม่
    updateUI();
    
    // 4. รีเซ็ตค่าในช่องกรอกข้อมูลและปิดกล่อง
    addCalInput.value = 0;
    addProInput.value = 0;
    addFatInput.value = 0;
    addCarbInput.value = 0;
    toggleAdditionalInputs();
}
// *******************************************


resetBtn.addEventListener('click', ()=>{
  totals = { calories:0, protein:0, fat:0, carbs:0 };
  updateUI();
  searchInput.value = '';
  suggestions.innerHTML = '';
  suggestions.style.display = 'none';
  menuDetailBox.style.display = 'none';
});

// Search suggestions
searchInput.addEventListener('input', ()=>{
  const q = searchInput.value.trim().toLowerCase();
  suggestions.innerHTML = '';
  if(!q){ suggestions.style.display = 'none'; return; }
  const matched = menuData.filter(m => m.name.toLowerCase().includes(q));
  matched.forEach(item=>{
    const li = document.createElement('li');
    const regex = new RegExp(`(${q})`, 'gi');
    li.innerHTML = item.name.replace(regex, `<span class="match">$1</span>`);
    
    li.addEventListener('click', ()=>{
        menuDetailBox.style.display = 'flex';
        menuImage.src = item.imageURL;
        menuName.textContent = item.name;
        calDetail.textContent = item.nutrition.calories;
        proDetail.textContent = item.nutrition.protein;
        fatDetail.textContent = item.nutrition.fat;
        carbDetail.textContent = item.nutrition.carbs;
        
        suggestions.style.display = 'none';
        searchInput.value = '';
    });
    suggestions.appendChild(li);
  });
  suggestions.style.display = matched.length? 'block':'none';
});

addMenuBtn.addEventListener('click', () => {
    const selectedCalories = parseFloat(calDetail.textContent);
    const selectedProtein = parseFloat(proDetail.textContent);
    const selectedFat = parseFloat(fatDetail.textContent);
    const selectedCarbs = parseFloat(carbDetail.textContent);
    
    totals.calories += selectedCalories;
    totals.protein += selectedProtein;
    totals.fat += selectedFat;
    totals.carbs += selectedCarbs;
    
    updateUI();
    
    menuDetailBox.style.display = 'none';
});

document.addEventListener('click', e=>{ if(!e.target.closest('.search-box')) suggestions.style.display='none'; });

// BMI / BMR / TDEE
function calculateMetrics(weight, height, age, gender, activity, goalType){
  const h_m = height / 100;
  const bmi = weight / (h_m*h_m);
  let bmr = (10*weight)+(6.25*height)-(5*age)+(gender==='male'?5:-161);
  let tdee = Math.round(bmr*activity);
  let goalCalories = tdee;
  if(goalType==='lose') goalCalories = Math.round(tdee*0.8);
  else if(goalType==='gain') goalCalories = Math.round(tdee*1.2);
  return {bmi,bmr,tdee,goalCalories};
}

function showResults(bmi, bmr, tdee, goalCalories){
  let bmiStatus='';
  if(bmi<18.5) bmiStatus='น้ำหนักน้อย';
  else if(bmi<25) bmiStatus='น้ำหนักปกติ';
  else if(bmi<30) bmiStatus='น้ำหนักเกิน';
  else bmiStatus='อ้วน';

  bmrResult.innerHTML = `BMR: <span style="font-weight:700;">${bmr.toFixed(0)} kcal</span>, TDEE: <span style="font-weight:700;">${tdee} kcal</span>, เป้าหมาย: <span style="font-weight:700;">${goalCalories} kcal</span>`;
  bmiResult.innerHTML = `BMI: <span style="font-weight:700;">${bmi.toFixed(1)}</span> <span style="color:${bmiStatus==='น้ำหนักปกติ'?'green':(bmiStatus==='น้ำหนักน้อย'?'orange':'red')}; font-weight:700;">${bmiStatus}</span>`;
  localStorage.setItem('bmi', bmi.toFixed(1));
  localStorage.setItem('personal', JSON.stringify({bmr,tdee,goalCalories}));
  GOALS.calories = goalCalories;
}

window.addEventListener('load', ()=>{
    const savedBMI = localStorage.getItem('bmi');
    const savedPersonal = JSON.parse(localStorage.getItem('personal'));
    const savedInputs = JSON.parse(localStorage.getItem('inputs'));
    
    if(savedInputs){
        weightInput.value = savedInputs.weight;
        heightInput.value = savedInputs.height;
        ageInput.value = savedInputs.age;
        genderInput.value = savedInputs.gender;
        activityInput.value = savedInputs.activity;
        goalInput.value = savedInputs.goal;
    }
    
    if(savedBMI && savedPersonal){
        showResults(Number(savedBMI), savedPersonal.bmr, savedPersonal.tdee, savedPersonal.goalCalories);
    }
    
    updateUI();
});

calcBtn.addEventListener('click', ()=>{
  const w = parseFloat(weightInput.value);
  const h = parseFloat(heightInput.value);
  const a = parseFloat(ageInput.value);
  const g = genderInput.value;
  const act = parseFloat(activityInput.value);
  const goal = goalInput.value;
  
  if(w>0 && h>0 && a>0){
    const metrics = calculateMetrics(w,h,a,g,act,goal);
    showResults(metrics.bmi, metrics.bmr, metrics.tdee, metrics.goalCalories);
    
    const inputs = {weight:w, height:h, age:a, gender:g, activity:act, goal:goal};
    localStorage.setItem('inputs', JSON.stringify(inputs));
  } else alert('กรุณากรอกข้อมูลให้ครบและถูกต้อง');
});

updateUI();