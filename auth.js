// js/auth.js

// Import Firebase (Nanti kamu perlu tambahkan auth di firebase-config.js)
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// import { app } from "./firebase-config.js";
// const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");
    
    const linkToRegister = document.getElementById("link-to-register");
    const linkToLogin = document.getElementById("link-to-login");

    // Efek ganti halaman dari Login ke Daftar
    linkToRegister.addEventListener("click", () => {
        formLogin.classList.add("hidden");
        formRegister.classList.remove("hidden");
    });

    // Efek ganti halaman dari Daftar ke Login
    linkToLogin.addEventListener("click", () => {
        formRegister.classList.add("hidden");
        formLogin.classList.remove("hidden");
    });

    // Tombol Login Ditekan
    document.getElementById("btn-login").addEventListener("click", () => {
        const email = document.getElementById("login-email").value;
        const pass = document.getElementById("login-password").value;
        
        if(!email || !pass) return alert("Isi email dan password!");
        
        console.log("Mencoba login dengan:", email);
        // Nanti masukkan kode signInWithEmailAndPassword di sini
        // Jika berhasil: window.location.href = "index.html";
    });

    // Tombol Daftar Ditekan
    document.getElementById("btn-register").addEventListener("click", () => {
        const nama = document.getElementById("reg-nama").value;
        const email = document.getElementById("reg-email").value;
        const pass = document.getElementById("reg-password").value;
        
        if(!nama || !email || !pass) return alert("Isi semua data pendaftaran!");
        if(pass.length < 6) return alert("Password minimal 6 karakter!");

        console.log("Mencoba mendaftar:", nama, email);
        // Nanti masukkan kode createUserWithEmailAndPassword di sini
        // Jika berhasil, simpan nama ke Firestore dan arahkan ke index.html
    });
});
