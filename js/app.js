const mainContent = document.getElementById("main-content");
const kunciPenyimpanan = "plantcare-monstera";

let permintaanTerakhir = 0;

// Menampilkan informasi atau pesan kesalahan.
function tampilkanPesan(teks, error = false) {
  const pesan = document.createElement("p");

  pesan.className = error ? "pesan pesan-error" : "pesan";
  pesan.textContent = teks;

  mainContent.replaceChildren(pesan);
}

// Mengisi form edit dengan data yang pernah disimpan.
function isiFormEdit() {
  const form = document.getElementById("form-edit");

  if (!form) return;

  try {
    const data = JSON.parse(
      localStorage.getItem(kunciPenyimpanan)
    );

    if (
      data &&
      typeof data.lokasi === "string" &&
      typeof data.catatan === "string"
    ) {
      form.elements.lokasi.value = data.lokasi;
      form.elements.catatan.value = data.catatan;
    }
  } catch (error) {
    document.getElementById("pesan-edit").textContent =
      "Data tersimpan tidak dapat dibaca. Menampilkan data awal.";
  }
}

// Memuat halaman tanpa reload seluruh website.
async function loadPage(url) {
  const nomorPermintaan = ++permintaanTerakhir;

  tampilkanPesan("Memuat halaman...");

  document.querySelectorAll("nav .nav-link-ajax")
    .forEach(function(link) {
      const aktif = link.getAttribute("href") === url;

      link.classList.toggle("active", aktif);

      if (aktif) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

  try {
    const response = await fetch(url, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const html = await response.text();

    // Abaikan respons lama jika menu lain sudah dipilih.
    if (nomorPermintaan !== permintaanTerakhir) return;

    if (html.trim() === "") {
      tampilkanPesan(
        "File " + url +
        " masih kosong. Isi terlebih dahulu di VS Code."
      );
      return;
    }

    mainContent.innerHTML = html;

    // Isi data setelah form selesai dimuat.
    isiFormEdit();

  } catch (error) {
    if (nomorPermintaan !== permintaanTerakhir) return;

    tampilkanPesan(
      "Gagal memuat " + url +
      ". Periksa nama file dan buka website melalui localhost.",
      true
    );
  }
}

// Menghubungkan menu dengan navigasi AJAX.
document.querySelectorAll(".nav-link-ajax")
  .forEach(function(link) {
    link.addEventListener("click", function(event) {
      event.preventDefault();

      loadPage(link.getAttribute("href"));
    });
  });

// Menghitung simulasi kebutuhan air dan pupuk.
function hitungKebutuhan(form) {
  const jenis = form.elements.jenis.value;
  const diameter = Number(form.elements.diameter.value);

  const hasil = document.getElementById("hasil-kalkulator");
  const hasilAir = document.getElementById("hasil-air");
  const hasilPupuk = document.getElementById("hasil-pupuk");

  // Angka contoh tugas untuk pot berdiameter 20 cm.
  // Bukan takaran perawatan tanaman yang baku.
  const dataTanaman = {
    "monstera": {
      air: 300,
      pupuk: 2
    },
    "kaktus": {
      air: 100,
      pupuk: 0.5
    },
    "sirih-gading": {
      air: 200,
      pupuk: 1
    }
  };

  const tanaman = dataTanaman[jenis];

  if (
    !tanaman ||
    !Number.isInteger(diameter) ||
    diameter < 5 ||
    diameter > 60
  ) {
    hasil.hidden = true;

    alert(
      "Pilih tanaman dan isi diameter dengan angka bulat 5–60 cm."
    );
    return;
  }

  const faktorUkuran = (diameter / 20) ** 2;
  const air = Math.round(tanaman.air * faktorUkuran);
  const pupuk = tanaman.pupuk * faktorUkuran;

  hasilAir.textContent =
    "Air: " + air.toLocaleString("id-ID") +
    " ml per penyiraman (simulasi).";

  hasilPupuk.textContent =
    "Pupuk: " +
    pupuk.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) +
    " gram per pemupukan (simulasi).";

  hasil.hidden = false;

  hasil.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

// Memvalidasi dan menyimpan perubahan data tanaman.
function simpanTanaman(form) {
  const lokasi = form.elements.lokasi.value.trim();
  const catatan = form.elements.catatan.value.trim();
  const pesan = document.getElementById("pesan-edit");

  pesan.style.color = "#a12828";

  if (lokasi.length < 3 || lokasi.length > 100) {
    pesan.textContent =
      "Lokasi wajib diisi antara 3–100 karakter.";

    form.elements.lokasi.focus();
    return;
  }

  if (catatan.length < 5 || catatan.length > 500) {
    pesan.textContent =
      "Catatan perawatan wajib diisi antara 5–500 karakter.";

    form.elements.catatan.focus();
    return;
  }

  const data = {
    id: "T001",
    nama: "Monstera",
    lokasi: lokasi,
    catatan: catatan
  };

  try {
    localStorage.setItem(
      kunciPenyimpanan,
      JSON.stringify(data)
    );

    form.elements.lokasi.value = lokasi;
    form.elements.catatan.value = catatan;

    pesan.style.color = "#28613f";
    pesan.textContent =
      "Perubahan berhasil disimpan di browser!";

  } catch (error) {
    pesan.textContent =
      "Gagal menyimpan. Penyimpanan browser tidak tersedia.";
  }
}

// Menangani form yang dimuat melalui AJAX.
document.addEventListener("submit", function(event) {
  const form = event.target;

  if (form.id === "form-kalkulator") {
    event.preventDefault();
    hitungKebutuhan(form);
  }

  if (form.id === "form-edit") {
    event.preventDefault();
    simpanTanaman(form);
  }
});

// Tampilkan katalog saat website pertama kali dibuka.
loadPage("views/katalog.html");