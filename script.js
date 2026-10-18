// script.js - VERSI FIREBASE LENGKAP (AMBIL & TAMBAH DATA)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// Tambahkan addDoc untuk menyimpan data
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Konfigurasi Sera Coffee
const firebaseConfig = {
  apiKey: "AIzaSyAJsFGevRIW1x_tNTVEqOXmE91AXwcnuiU",
  authDomain: "seracoffeepos.firebaseapp.com",
  projectId: "seracoffeepos",
  storageBucket: "seracoffeepos.firebasestorage.app",
  messagingSenderId: "361363482046",
  appId: "1:361363482046:web:706c1084cadbff697945ef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let produkList = [];
let keranjang = [];

document.addEventListener("DOMContentLoaded", () => {
  ambilDataDariFirebase();
});

// FUNGSI 1: AMBIL DATA
window.ambilDataDariFirebase = async function() {
  const areaProduk = document.getElementById("area-produk");
  if(!areaProduk) return;
  
  areaProduk.innerHTML = "<p style='padding: 16px; color: #6b7280; text-align:center;'>Memuat menu Sera Coffee...</p>";

  try {
    const querySnapshot = await getDocs(collection(db, "produk"));
    produkList = []; 
    querySnapshot.forEach((doc) => {
      let dataAsli = doc.data();
      dataAsli.id = doc.id; 
      produkList.push(dataAsli);
    });
    tampilkanProdukUI();
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    areaProduk.innerHTML = "<p style='padding: 16px; color: red;'>Gagal memuat data. Periksa internet atau Firebase Rules.</p>";
  }
}

// FUNGSI 2: TAMPILKAN KE LAYAR
function tampilkanProdukUI() {
  const areaProduk = document.getElementById("area-produk");
  areaProduk.innerHTML = ""; 

  produkList.forEach(produk => {
    const div = document.createElement("div");
    div.className = "add-item-card"; 
    div.style.marginBottom = "12px"; 
    div.innerHTML = `
      <div class="add-icon-box" style="background-color: #e6f4ea; color: #00b87c;">
        <svg class="icon" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      </div>
      <div class="add-item-text" style="flex: 1;">
        <div style="font-weight:bold; color:#333;">${produk.nama}</div>
        <div style="color: #00b87c; font-size: 14px; margin-top:2px;">Rp ${Number(produk.harga).toLocaleString("id-ID")}</div>
      </div>
    `;
    div.onclick = () => tambahKeKeranjang(produk);
    areaProduk.appendChild(div);
  });

  // Tambahkan Tombol "Tambah Barang" di akhir daftar barang
  const btnTambah = document.createElement("div");
  btnTambah.className = "add-item-card";
  btnTambah.style.marginBottom = "12px";
  btnTambah.style.justifyContent = "center";
  btnTambah.style.border = "2px dashed #00b87c";
  btnTambah.style.backgroundColor = "#f4fcf7";
  btnTambah.innerHTML = `<div style="font-weight:bold; color:#00b87c;">+ Tambah Menu Baru</div>`;
  btnTambah.onclick = () => window.bukaModalTambah();
  areaProduk.appendChild(btnTambah);
}

// FUNGSI 3: LOGIKA KERANJANG
window.tambahKeKeranjang = function(produk) {
  keranjang.push(produk); 
  updateKeranjangUI();    
}

function updateKeranjangUI() {
  const elemenJumlah = document.getElementById("jumlah-barang");
  const elemenTotal = document.getElementById("total-harga");
  if(!elemenJumlah || !elemenTotal) return;
  
  let totalHarga = 0;
  keranjang.forEach(item => totalHarga += Number(item.harga));

  elemenJumlah.innerHTML = `${keranjang.length} <span style="font-size: 14px; font-weight: normal;">Barang</span>`;
  if(keranjang.length > 0) {
    elemenTotal.innerHTML = `Rp ${totalHarga.toLocaleString("id-ID")}`;
  } else {
    elemenTotal.innerHTML = "";
  }
}

// FUNGSI 4: SIDEBAR MENU
window.bukaMenu = function() {
  document.getElementById("sidebar-menu").classList.add("open");
  document.getElementById("overlay-menu").classList.add("open");
}
window.tutupMenu = function() {
  document.getElementById("sidebar-menu").classList.remove("open");
  document.getElementById("overlay-menu").classList.remove("open");
}

// FUNGSI 5: MODAL & SIMPAN KE FIREBASE
window.bukaModalTambah = function() {
  document.getElementById("modal-tambah").classList.add("show");
}
window.tutupModalTambah = function() {
  document.getElementById("modal-tambah").classList.remove("show");
}

window.simpanBarangBaru = async function() {
  const inputNama = document.getElementById("input-nama").value;
  const inputHarga = document.getElementById("input-harga").value;

  // Cek apakah ada yang kosong
  if(!inputNama || !inputHarga) {
    alert("Harap isi Nama dan Harga barang!");
    return;
  }

  // Ubah teks tombol menjadi "Menyimpan..."
  const btnSimpan = document.querySelector(".btn-modal-simpan");
  btnSimpan.innerText = "Menyimpan...";
  btnSimpan.disabled = true;

  try {
    // Perintah untuk mengirim data ke Firebase
    await addDoc(collection(db, "produk"), {
      nama: inputNama,
      harga: Number(inputHarga)
    });
    
    // Sukses, bersihkan form dan tutup
    document.getElementById("input-nama").value = "";
    document.getElementById("input-harga").value = "";
    tutupModalTambah();
    
    // Panggil ulang data dari Firebase agar barang baru langsung muncul
    window.ambilDataDariFirebase();

  } catch (error) {
    console.error("Gagal menyimpan:", error);
    alert("Gagal menyimpan barang ke Firebase.");
  } finally {
    // Kembalikan kondisi tombol
    btnSimpan.innerText = "Simpan";
    btnSimpan.disabled = false;
  }
}
