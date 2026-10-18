// script.js - VERSI FIREBASE LENGKAP DENGAN PEMISAHAN ADMIN & KASIR

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const auth = getAuth(app);

let produkList = [];
let keranjang = [];
let isFetching = false; 

// PROTEKSI HALAMAN
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.ambilDataDariFirebase();
  } else {
    if(!window.location.href.includes("login.html") && !window.location.href.includes("index.html")) {
        window.location.href = "login.html";
    }
  }
});

// FUNGSI KELUAR
window.keluarAkun = function() {
  if(confirm("Apakah Anda yakin ingin keluar?")) {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    }).catch((error) => alert("Gagal keluar dari akun."));
  }
}

// FUNGSI 1: AMBIL DATA
window.ambilDataDariFirebase = async function() {
  if(isFetching) return;
  isFetching = true;

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
    areaProduk.innerHTML = "<p style='padding: 16px; color: red;'>Data gagal dimuat. Periksa koneksi internet.</p>";
  } finally {
    isFetching = false;
  }
}

// FUNGSI 2: TAMPILKAN KE LAYAR
function tampilkanProdukUI() {
  const areaProduk = document.getElementById("area-produk");
  areaProduk.innerHTML = ""; 

  // Cek apakah ini halaman Manajemen atau Penjualan
  const halamanSaatIni = document.body.getAttribute("data-page");

  produkList.forEach(produk => {
    const div = document.createElement("div");
    div.className = "add-item-card"; 
    div.style.marginBottom = "12px"; 
    
    if (halamanSaatIni === "manajemen") {
      // TAMPILAN MANAJEMEN: Ada ikon hapus, tidak masuk keranjang saat diklik
      div.innerHTML = `
        <div class="add-icon-box" style="background-color: #e6f4ea; color: #00b87c;">
          <svg class="icon" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </div>
        <div class="add-item-text" style="flex: 1;">
          <div style="font-weight:bold; color:#333;">${produk.nama}</div>
          <div style="color: #00b87c; font-size: 14px; margin-top:2px;">Rp ${Number(produk.harga).toLocaleString("id-ID")}</div>
        </div>
        <div onclick="hapusBarang('${produk.id}', '${produk.nama}')" style="padding: 8px; color: #ef4444; border-radius: 8px; cursor: pointer;">
          <svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </div>
      `;
    } else {
      // TAMPILAN PENJUALAN: Tidak ada hapus, masuk keranjang saat diklik
      div.innerHTML = `
        <div class="add-icon-box" style="background-color: #e6f4ea; color: #00b87c;">
          <svg class="icon" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </div>
        <div class="add-item-text" style="flex: 1;">
          <div style="font-weight:bold; color:#333;">${produk.nama}</div>
          <div style="color: #00b87c; font-size: 14px; margin-top:2px;">Rp ${Number(produk.harga).toLocaleString("id-ID")}</div>
        </div>
      `;
      // Tambahkan event klik untuk masuk keranjang
      div.onclick = () => tambahKeKeranjang(produk);
    }
    
    areaProduk.appendChild(div);
  });

  // Jika ini halaman manajemen, tambahkan tombol "+ Tambah Menu Baru" di bawah
  if (halamanSaatIni === "manajemen") {
    const btnTambah = document.createElement("div");
    btnTambah.className = "add-item-card";
    btnTambah.style.marginBottom = "12px";
    btnTambah.style.justifyContent = "center";
    btnTambah.style.border = "2px dashed #00b87c";
    btnTambah.style.backgroundColor = "#f4fcf7";
    btnTambah.style.cursor = "pointer";
    btnTambah.innerHTML = `<div style="font-weight:bold; color:#00b87c;">+ Tambah Menu Baru</div>`;
    btnTambah.onclick = () => window.bukaModalTambah();
    areaProduk.appendChild(btnTambah);
  }
}

// FUNGSI 3: LOGIKA HAPUS BARANG (Hanya jalan di Manajemen)
window.hapusBarang = async function(id, nama) {
  if(confirm(`Yakin ingin menghapus menu "${nama}" dari sistem?`)) {
    try {
      await deleteDoc(doc(db, "produk", id));
      window.ambilDataDariFirebase();
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Gagal menghapus barang.");
    }
  }
}

// FUNGSI 4: LOGIKA KERANJANG (Hanya jalan di Penjualan)
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

// FUNGSI 5: SIDEBAR MENU
window.bukaMenu = function() {
  document.getElementById("sidebar-menu").classList.add("open");
  document.getElementById("overlay-menu").classList.add("open");
}
window.tutupMenu = function() {
  document.getElementById("sidebar-menu").classList.remove("open");
  document.getElementById("overlay-menu").classList.remove("open");
}

// FUNGSI 6: MODAL & SIMPAN KE FIREBASE (Hanya jalan di Manajemen)
window.bukaModalTambah = function() {
  const modal = document.getElementById("modal-tambah");
  if(modal) {
    modal.classList.add("show");
    document.getElementById("input-nama").focus();
  }
}
window.tutupModalTambah = function() {
  const modal = document.getElementById("modal-tambah");
  if(modal) {
    modal.classList.remove("show");
    document.getElementById("input-nama").value = "";
    document.getElementById("input-harga").value = "";
  }
}

window.simpanBarangBaru = async function() {
  const inputNama = document.getElementById("input-nama").value.trim();
  const inputHarga = document.getElementById("input-harga").value;

  if(!inputNama || !inputHarga) {
    alert("Harap isi Nama dan Harga barang!");
    return;
  }

  const btnSimpan = document.querySelector(".btn-modal-simpan");
  btnSimpan.innerText = "Menyimpan...";
  btnSimpan.disabled = true;

  try {
    await addDoc(collection(db, "produk"), {
      nama: inputNama,
      harga: Number(inputHarga)
    });
    tutupModalTambah();
    window.ambilDataDariFirebase();
  } catch (error) {
    console.error("Gagal menyimpan:", error);
    alert("Gagal menyimpan barang ke Firebase.");
  } finally {
    btnSimpan.innerText = "Simpan";
    btnSimpan.disabled = false;
  }
}
