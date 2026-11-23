import hitam from "../../Kaos Kaki_Hitam.webp";
import abuAbu from "../../Kaos Kaki_AbuAbu.webp";

// Info Stock Awal dari Product - Hitam dan AbuAbu
export const products = [
  {
    id: 1,
    name: "Hitam",
    title: "Kaos Kaki Hitam",
    price: 45000,
    image: hitam,
    swatch: "#2b2f38",
    description: "Aman untuk kerja & formal.",
    stock: { S: 10, M: 8, L: 5, XL: 3 },
  },
  {
    id: 2,
    name: "Abu-abu",
    title: "Kaos Kaki Abu-abu",
    price: 55000,
    image: abuAbu,
    swatch: "#9ba1a9",
    description: "Santai, cocok semua sneakers.",
    stock: { S: 20, M: 15, L: 10, XL: 5 },
  },
];

export const sizes = ["S", "M", "L", "XL"];

export const features = [
  { id: 1, icon: "🧶", title: "Katun Combed", text: "Serat halus, lembut di kulit dan tidak mudah berbulu." },
  { id: 2, icon: "💨", title: "Sirkulasi Udara", text: "Pori rajut menjaga kaki tetap kering seharian." },
  { id: 3, icon: "🧵", title: "Jahitan Rapat", text: "Ujung jari rata, nyaman dipakai dalam sepatu." },
];

export const reviews = [
  { id: 1, quote: "Adem dan tebalnya pas. Sudah beli tiga kali.", author: "Dina", rating: 5 },
  { id: 2, quote: "Warna abu-abunya tidak pudar setelah dicuci.", author: "Raka", rating: 5 },
  { id: 3, quote: "Ukuran XL pas untuk kaki besar. Mantap.", author: "Bagas", rating: 4 },
];

export const FREE_SHIPPING_MIN = 150000;
