// script.js - VERSI SIMULASI (TANPA FIREBASE)

// 1. Data Simulasi
let produkList = [
  { id: 1, nama: "Kopi Hitam", harga: 15000 },
  { id: 2, nama: "Cappuccino", harga: 22000 },
  { id: 3, nama: "Matcha Latte", harga: 25000 },
  { id: 4, nama: "Kentang Goreng", harga: 18000 }
];

let keranjang = [];

// Berjalan otomatis saat halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
  tampilkanProdukUI();
});

// 2. Fungsi untuk menampilkan data ke layar
function tampilkanProdukUI() {
  const areaProduk = document.getElementById("area-produk");
  if(!areaProduk) return; // Mencegah error jika dijalankan di halaman login
  
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
        <div style="color: #00b87c; font-size: 14px; margin-top:2px;">Rp ${produk.harga.toLocaleString("id-ID")}</div>
      </div>
    `;
    
    div.onclick = () => tambahKeKeranjang(produk);
    areaProduk.appendChild(div);
  });
}

// 3. Logika Menambah ke Keranjang
function tambahKeKeranjang(produk) {
  keranjang.push(produk); 
  updateKeranjangUI();    
}

// 4. Memperbarui Tulisan Jumlah Barang & Total
function updateKeranjangUI() {
  const elemenJumlah = document.getElementById("jumlah-barang");
  const elemenTotal = document.getElementById("total-harga");
  if(!elemenJumlah || !elemenTotal) return;
  
  let totalHarga = 0;
  keranjang.forEach(item => {
    totalHarga += item.harga;
  });

  elemenJumlah.innerHTML = `${keranjang.length} <span style="font-size: 14px; font-weight: normal;">Barang</span>`;
  
  if(keranjang.length > 0) {
    elemenTotal.innerHTML = `Rp ${totalHarga.toLocaleString("id-ID")}`;
  } else {
    elemenTotal.innerHTML = "";
  }
}

// 5. Logika Buka/Tutup Sidebar Menu
function bukaMenu() {
  const sidebar = document.getElementById("sidebar-menu");
  const overlay = document.getElementById("overlay-menu");
  if(sidebar && overlay) {
    sidebar.classList.add("open");
    overlay.classList.add("open");
  }
}

function tutupMenu() {
  const sidebar = document.getElementById("sidebar-menu");
  const overlay = document.getElementById("overlay-menu");
  if(sidebar && overlay) {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  }
}
