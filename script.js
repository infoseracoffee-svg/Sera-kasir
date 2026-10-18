// Data simulasi (Dummy Data) untuk katalog produk
// Nanti data ini akan ditarik dari Firebase
let produkList = [
  { id: 1, nama: "Kopi Susu Aren", harga: 18000 },
  { id: 2, nama: "Americano Dingin", harga: 15000 },
  { id: 3, nama: "Roti Bakar Coklat", harga: 12000 }
];

// Array untuk menampung barang yang masuk ke keranjang
let keranjang = [];

// Fungsi ini otomatis berjalan saat halaman penjualan.html dibuka
document.addEventListener("DOMContentLoaded", () => {
  tampilkanProduk();
});

// Fungsi untuk mencetak daftar produk ke layar
function tampilkanProduk() {
  const areaProduk = document.getElementById("area-produk");
  areaProduk.innerHTML = ""; // Kosongkan layar terlebih dahulu

  // Looping (ulangi) pembuatan desain untuk setiap produk di database
  produkList.forEach(produk => {
    const div = document.createElement("div");
    div.className = "add-item-card"; 
    div.style.marginBottom = "12px"; // Jarak antar kartu
    
    div.innerHTML = `
      <div class="add-icon-box" style="background-color: #e6f4ea; color: #00b87c;">
        <svg class="icon" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      </div>
      <div class="add-item-text" style="flex: 1;">
        <div style="font-weight:bold; color:#333;">${produk.nama}</div>
        <div style="color: #00b87c; font-size: 14px; margin-top:2px;">Rp ${produk.harga.toLocaleString("id-ID")}</div>
      </div>
    `;
    
    // Saat kartu produk ditekan, jalankan fungsi tambahKeKeranjang
    div.onclick = () => tambahKeKeranjang(produk);
    areaProduk.appendChild(div);
  });

  // Tambahkan tombol "Tambah Barang Baru" di bagian paling bawah
  const btnTambah = document.createElement("div");
  btnTambah.className = "add-item-card";
  btnTambah.innerHTML = `
    <div class="add-icon-box">
      <svg class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </div>
    <div class="add-item-text">Tambah Master Barang</div>
  `;
  btnTambah.onclick = () => alert("Nanti ini membuka form untuk simpan barang baru ke Firebase.");
  areaProduk.appendChild(btnTambah);
}

// Fungsi untuk memasukkan barang ke keranjang
function tambahKeKeranjang(produk) {
  keranjang.push(produk);
  updateKeranjangUI();
}

// Fungsi untuk memperbarui angka dan total harga di tombol bawah
function updateKeranjangUI() {
  const elemenJumlah = document.getElementById("jumlah-barang");
  const elemenTotal = document.getElementById("total-harga");
  
  // Hitung total harga seluruh isi keranjang
  let totalHarga = 0;
  keranjang.forEach(item => totalHarga += item.harga);

  // Perbarui teks di layar
  elemenJumlah.innerHTML = `${keranjang.length} <span style="font-size: 14px; font-weight: normal;">Barang</span>`;
  
  // Tampilkan nominal rupiah di tombol "LANJUT"
  if(keranjang.length > 0) {
    elemenTotal.innerHTML = `Rp ${totalHarga.toLocaleString("id-ID")}`;
  } else {
    elemenTotal.innerHTML = "";
  }
}
