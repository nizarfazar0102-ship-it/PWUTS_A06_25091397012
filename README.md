# PWUTS_A06_25091397012

# PlantCare — Katalog Edukasi Tanaman

Proyek UTS Pemrograman Web.

## Identitas
- Nama: M. Nizar Fazari
- NIM: 25091397012
- Kelompok: A06
- Bagian: Anggota B
- Program Studi: D4 Manajemen Informatika
- Universitas: Universitas Negeri Surabaya

## Deskripsi
PlantCare merupakan website edukasi dan perawatan tanaman.
Bagian yang saya kerjakan mencakup katalog tanaman,
kalkulator simulasi kebutuhan air dan pupuk, serta edit data tanaman.

## Fitur
### 2.a — Halaman utama dan navigasi AJAX
- Tampilan responsif dengan navigasi dan footer.
- Konten dimuat menggunakan Fetch API tanpa memuat ulang seluruh halaman.
- Katalog berisi Monstera, Kaktus, dan Sirih Gading.

### 2.b — Kalkulator Air dan Pupuk
- Menghitung simulasi kebutuhan berdasarkan jenis tanaman dan diameter pot.
- Diameter pot berupa angka bulat antara 5–60 cm.
- Hasil menampilkan jumlah air dalam ml dan pupuk dalam gram.
- Angka perhitungan merupakan simulasi tugas, bukan takaran perawatan baku.

### 2.c — Edit Data Tanaman
- Form menampilkan data awal tanaman Monstera.
- Pengguna dapat mengubah lokasi dan catatan perawatan.
- Lokasi divalidasi sepanjang 3–100 karakter.
- Catatan perawatan divalidasi sepanjang 5–500 karakter.
- Perubahan disimpan menggunakan localStorage pada browser.

## Teknologi
- HTML
- CSS
- JavaScript murni
- Fetch API untuk AJAX
- localStorage untuk penyimpanan lokal

Tidak menggunakan framework atau library tambahan.

## Susunan File
- Index.html: halaman utama.
- css/style.css: pengaturan tampilan.
- js/app.js: navigasi AJAX, kalkulator, dan penyimpanan data.
- views/katalog.html: konten katalog tanaman.
- views/kalkulator.html: form kalkulator.
- views/edit.html: form edit tanaman.
- README.md: dokumentasi proyek.

## Cara Menjalankan
1. Unduh dan ekstrak proyek.
2. Letakkan folder PWUTS_A06_25091397012 di C:\xampp\htdocs.
3. Jalankan Apache melalui XAMPP.
4. Buka alamat berikut di browser:
   http://localhost/PWUTS_A06_25091397012/Index.html
5. Gunakan menu Katalog Tanaman, Kalkulator, dan Edit Tanaman.

Jalankan melalui localhost agar pemuatan konten AJAX berfungsi.

## Contoh Pengujian
1. Klik setiap menu dan periksa pergantian konten.
2. Pilih Monstera dengan diameter pot 20 cm.
   Hasil simulasi: air 300 ml dan pupuk 2 gram.
3. Coba menyimpan form edit dengan data kosong untuk melihat validasi.
4. Isi lokasi dan catatan yang valid, lalu simpan.
5. Muat ulang halaman dan buka menu Edit Tanaman untuk melihat data tersimpan.

## Batasan
Data edit tersimpan pada browser yang digunakan, belum menggunakan database.
