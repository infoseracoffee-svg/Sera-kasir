// script.js - VERSI SIMULASI (TANPA FIREBASE)

// 1. Data Simulasi (Dummy Data) - Nanti ini yang akan diganti ke Firebase
let produkList = [
  { id: 1, nama: "Kopi Hitam", harga: 15000 },
  { id: 2, nama: "Cappuccino", harga: 22000 },
  { id: 3, nama: "Matcha Latte", harga: 25000 },
  { id: 4, nama: "Kentang Goreng", harga: 18000 }
];

// Array untuk menampung barang yang diklik
let keranjang = [];

// Berjalan otomatis saat halaman penjualan dibuka
document.addEventListener("DOMContentLoaded", () => {
  tampilkanProdukUI();
});

// 2. Fungsi untuk menampilkan data ke layar HTML
function tampilkanProdukUI() {
  const areaProduk = document.getElementById("area-produk");
  areaProduk.innerHTML = ""; // Bersihkan layar

  // Ulangi pembuatan kotak HTML untuk setiap barang di produkList
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
    
    // Jika kotak diklik, masukkan barang ke keranjang
    div.onclick = () => tambahKeKeranjang(produk);
    areaProduk.appendChild(div);
  });
}

// 3. Logika Menambah ke Keranjang
function tambahKeKeranjang(produk) {
  keranjang.push(produk); // Masukkan barang
  updateKeranjangUI();    // Perbarui tulisan di layar
}

// 4. Memperbarui Tulisan Jumlah Barang & Total Harga di Bawah
function updateKeranjangUI() {
  const elemenJumlah = document.getElementById("jumlah-barang");
  const elemenTotal = document.getElementById("total-harga");
  
  let totalHarga = 0;
  // Hitung total semua harga di keranjang
  keranjang.forEach(item => {
    totalHarga += item.harga;
  });

  // Ganti teks di layar
  elemenJumlah.innerHTML = `${keranjang.length} <span style="font-size: 14px; font-weight: normal;">Barang</span>`;
  
  if(keranjang.length > 0) {
    elemenTotal.innerHTML = `Rp ${totalHarga.toLocaleString("id-ID")}`;
  } else {
    elemenTotal.innerHTML = "";
  }
}
