# การวิเคราะห์โปรเจค Dark Mode Switch

โปรเจคนี้เป็นการสาธิตการสร้างปุ่มสลับโหมดมืด (Dark Mode) โดยใช้ HTML, CSS, และ JavaScript พื้นฐาน

## หลักการทำงาน

1.  **HTML (`index.html`):** เป็นโครงสร้างของหน้าเว็บ ประกอบด้วยปุ่มสำหรับสลับธีม (`<button id="theme-switch">`) ซึ่งภายในมีไอคอน SVG รูปพระจันทร์และพระอาทิตย์
2.  **CSS (`style.css`):**
    - ใช้ CSS Variables (`:root`) ในการกำหนดชุดสีสำหรับโหมดสว่าง (Light Mode) เป็นค่าเริ่มต้น
    - มีการสร้าง class `.darkmode` ซึ่งจะทำการ override ค่า CSS Variables ให้เป็นชุดสีสำหรับโหมดมืด
    - เมื่อ class `.darkmode` ถูกเพิ่มเข้าไปใน `<body>` ของ HTML สีของทั้งหน้าเว็บจะเปลี่ยนไปตามที่กำหนดไว้
    - ใช้ CSS ในการซ่อน/แสดงไอคอน SVG ที่เหมาะสมตามธีมปัจจุบัน (ซ่อนพระจันทร์เมื่อเป็นโหมดมืด และซ่อนพระอาทิตย์เมื่อเป็นโหมดสว่าง)
3.  **JavaScript (`darkmode.js`):**
    - จัดการกับการคลิกปุ่มสลับธีม
    - มีฟังก์ชัน `enableDarkmode()` สำหรับเพิ่ม class `.darkmode` ไปยัง `<body>` และ `disableDarkmode()` สำหรับลบ class นั้นออก
    - ใช้ `localStorage` ของเบราว์เซอร์เพื่อบันทึกสถานะของธีม (เปิดหรือปิดโหมดมืด) ทำให้เมื่อผู้ใช้เปิดหน้าเว็บอีกครั้ง ธีมที่เลือกไว้จะยังคงอยู่
    - เมื่อหน้าเว็บโหลดเสร็จ สคริปต์จะตรวจสอบค่าใน `localStorage` เพื่อกำหนดธีมเริ่มต้นให้ถูกต้อง

---

## โค้ด

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Darkmode</title>
    <link rel="stylesheet" href="style.css" />
    <script type="text/javascript" src="darkmode.js" defer></script>
  </head>
  <body>
    <header>
      <button id="theme-switch">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path
            d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path
            d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"
          />
        </svg>
      </button>
      <h1>Some random website</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem, beatae
        voluptates iure iste eveniet, molestias rerum dicta accusantium dolore
        libero laboriosam aspernatur! Nobis ipsum id asperiores ullam illo
        consectetur aut odit quis ut beatae incidunt, esse sunt ratione
        distinctio labore!
      </p>
      <button class="cta-button">Go Premium</button>
      <button>More Info</button>
    </header>
    <section>
      <h2>About us</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste facilis
        commodi aperiam aspernatur. Dolores, quis distinctio eos vero minima
        odio dolorem facere ab? Qui cum suscipit animi, nihil dignissimos nam
        minima tempora. Numquam doloribus, corporis culpa molestias provident
        vitae voluptatem recusandae, iste commodi est error qui enim, odit
        quisquam hic.
      </p>
      <button>Get in Touch</button>
    </section>
  </body>
</html>
```

### `style.css`

```css
:root {
  --base-color: white;
  --base-variant: #e8e9ed;
  --text-color: #111528;
  --secondary-text: #232738;
  --primary-color: #3a435d;
  --accent-color: #0071ff;
}
.darkmode {
  --base-color: #070b1d;
  --base-variant: #101425;
  --text-color: #ffffff;
  --secondary-text: #a4a5b8;
  --primary-color: #3a435d;
  --accent-color: #0071ff;
}
* {
  margin: 0;
  padding: 0;
}
html {
  font-family: Poppins;
}
body {
  min-height: 100vh;
  background-color: var(--base-color);
  color: var(--text-color);
}
header,
section {
  padding: 70px min(50px, 7%);
}
section {
  background-color: var(--base-variant);
}
p {
  margin: 10px 0 20px 0;
  color: var(--secondary-text);
}
button {
  border: none;
  padding: 0.8em 2em;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  font: inherit;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
}
.cta-button {
  background-color: var(--accent-color);
}
#theme-switch {
  height: 50px;
  width: 50px;
  padding: 0;
  border-radius: 50%;
  background-color: var(--base-variant);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  right: 20px;
}
#theme-switch svg {
  fill: var(--primary-color);
}
#theme-switch svg:last-child {
  display: none;
}
.darkmode #theme-switch svg:first-child {
  display: none;
}
.darkmode #theme-switch svg:last-child {
  display: block;
}
```

### `darkmode.js`

```javascript
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
```
