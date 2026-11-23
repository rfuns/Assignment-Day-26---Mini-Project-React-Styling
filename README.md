# Sock Store (React)

Halaman utama toko kaos kaki yang dibangun dengan React dan Vite. Titik masuknya adalah `index.html`.

## Menjalankan

```bash
npm install
npm run dev      # buka http://localhost:5173/
npm run build    # build produksi ke folder dist
```

## Struktur

```
index.html                Halaman utama, memuat src/main.jsx
vite.config.js            Konfigurasi Vite dengan plugin React
src/
  main.jsx                Merender <App /> ke #root
  App.jsx                 Menyimpan state, merangkai semua komponen
  styles.js               Token desain dan style bersama
  data/products.js        Data produk, stok, fitur, ulasan
  components/
    Header.jsx
    Section.jsx
    ProductGallery.jsx
    ProductInfo.jsx
    FeatureList.jsx       Berisi FeatureCard
    ReviewList.jsx        Berisi ReviewCard
    ProductList.jsx       Mengirim data ke ProductCard
    ProductCard.jsx
    CartPanel.jsx
    CursorDot.jsx
```

## 1. Styling

Semua style memakai inline style object, tanpa file CSS. Nilai bersama ada di `src/styles.js`:

| Token | Isi |
| --- | --- |
| `colors` | Krem (`bg`), putih (`surface`), oranye (`orange`), abu (`muted`), garis (`line`) |
| `space` | Skala jarak 4, 8, 16, 24, 40, 56 px |
| `typography` | Gaya teks: judul halaman, judul section, judul kartu, label, isi, harga |
| `container` | Lebar maksimum 1100 px, dipakai header, section, dan keranjang |
| `card` | Gaya kartu: latar putih, sudut membulat, bayangan |

Judul dibedakan dari teks isi lewat ukuran dan ketebalan:

| Jenis | Ukuran | Ketebalan |
| --- | --- | --- |
| Judul halaman | 40 px | 800 |
| Judul section | 30 px | 700 |
| Judul kartu | 20 px | 700 |
| Teks isi | 15 px | 400, warna abu |

Setiap bagian dibungkus komponen `Section`, sehingga lebar dan jarak vertikalnya sama. Grid memakai `repeat(auto-fit, minmax(...))` agar menyesuaikan lebar layar.

## 2. Komponen

| Komponen | Fungsi |
| --- | --- |
| `Header` | Logo, menu navigasi, tombol Gelap/Terang, badge jumlah barang di keranjang |
| `Section` | Pembungkus bagian halaman dengan judul dan jarak seragam |
| `ProductGallery` | Panggung produk beranimasi dan thumbnail untuk ganti warna |
| `ProductInfo` | Pilihan warna, ukuran, jumlah, subtotal, tombol tambah, progres gratis ongkir |
| `FeatureList` / `FeatureCard` | Daftar keunggulan produk |
| `ReviewList` / `ReviewCard` | Daftar ulasan pelanggan |
| `ProductList` / `ProductCard` | Rekomendasi warna; klik kartu untuk memilih warnanya |
| `CursorDot` | Titik kursor kustom yang mengikuti mouse |
| `CartPanel` | Isi keranjang, total barang, total harga |
| `App` | Menyimpan state (warna, ukuran, jumlah, keranjang) dan merangkai semua komponen |

## 3. Props

Data mengalir dari `App` ke komponen anak lewat props:

```jsx
// App.jsx
<ProductList products={products} onPick={handlePick} />

// ProductList.jsx
<ProductCard
  name={product.name}
  price={product.price}
  image={product.image}
  description={product.description}
  onPick={() => onPick(product.id)}
/>

// ProductCard.jsx menampilkan nilai props
<h3>{name}</h3>
<p>{rupiah(price)}</p>
```

Props lain:

| Komponen | Props |
| --- | --- |
| `Header` | `brand`, `links`, `cartCount`, `theme`, `onToggleTheme` |
| `ProductGallery` | `products`, `selectedId`, `onSelect` |
| `ProductInfo` | `title`, `product`, `products`, `sizes`, `selectedSize`, `quantity`, `remaining`, `subtotal`, `message`, `shippingText`, `shippingPercent`, `onColor`, `onSize`, `onQuantity`, `onAdd`, `getRemaining` |
| `FeatureList` | `items`; tiap `FeatureCard` menerima `icon`, `title`, `text` |
| `ReviewList` | `reviews`; tiap `ReviewCard` menerima `quote`, `author`, `rating` |
| `CartPanel` | `items`, `totalItems`, `totalPrice` |
| `Section` | `id`, `title`, `children` |

## Data

`src/data/products.js` berisi dua produk dan stok awal per ukuran. Harga Hitam Rp45.000, Abu-abu Rp55.000.

| Warna | S | M | L | XL |
| --- | --- | --- | --- | --- |
| Hitam | 10 | 8 | 5 | 3 |
| Abu-abu | 20 | 15 | 10 | 5 |

## Mode Gelap dan Mode Terang

Tombol di header (`🌙 Gelap` / `☀️ Terang`) mengganti tema.

- Dua palet warna ada di `themes` pada `src/styles.js`. `App` memasangnya sebagai CSS variable (`--sock-bg`, `--sock-text`, dst.) di elemen akar lewat `themeVars()`.
- Komponen memakai `colors.bg`, `colors.text`, dan seterusnya. Nilainya berupa `var(--sock-...)`, jadi semua komponen ikut berganti tema tanpa diubah.
- Pilihan tema disimpan di `localStorage` (`sockTheme`). Kalau belum ada pilihan, tema mengikuti pengaturan sistem (`prefers-color-scheme`).
- Untuk mengubah warna tema, edit nilai di `themes.terang` atau `themes.gelap`.

## Perilaku

- Memilih warna lewat swatch, thumbnail, atau kartu rekomendasi mengganti produk yang tampil.
- Tombol tambah aktif setelah ukuran dipilih dan stok masih ada. Ukuran yang stoknya habis dinonaktifkan.
- Jumlah dibatasi antara 1 dan stok tersedia. Stok tersedia berkurang sesuai isi keranjang.
- Gratis ongkir dari belanja Rp150.000; bilah progres mengikuti total harga keranjang.

## Animasi panggung produk

Ada di `ProductGallery.jsx` dan `CursorDot.jsx`:

- Gambar melayang pelan saat mouse tidak di atas panggung.
- Saat mouse bergerak, gambar miring 3D dan cahaya di belakangnya mengikuti kursor.
- Kaca pembesar (zoom 2,6x) muncul di atas gambar.
- Ganti warna memakai transisi fade.
- Titik kursor oranye mengikuti mouse dan membesar di atas tombol dan tautan.
- Jika sistem memilih reduced motion, animasi melayang dan transisi ganti gambar dimatikan.

## Yang tidak ada di versi ini

Wishlist, mode Katalog/Studio, dan animasi muncul saat scroll dari versi HTML/JS lama tidak dibawa ke versi React.