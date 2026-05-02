"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// --- KOMPONEN BACKGROUND PARTIKEL ---
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Menyesuaikan ukuran kanvas dengan ukuran layar
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Pengaturan Partikel
    const particlesArray: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];
    const particleCount = 70; // Jumlah titik
    const connectionDistance = 150; // Jarak maksimal agar garis terbentuk

    // Membuat partikel acak
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    let animationFrameId: number;

    // Fungsi Animasi
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        let p = particlesArray[i];

        // Memindahkan partikel
        p.x += p.vx;
        p.y += p.vy;

        // Memantulkan partikel jika menyentuh ujung layar
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Menggambar titik (dot) - Primary Accent (#FAB95B | RGB: 250, 185, 91)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(250, 185, 91, 0.6)";
        ctx.fill();

        // Menggambar garis penghubung antar titik
        for (let j = i + 1; j < particlesArray.length; j++) {
          let p2 = particlesArray[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Garis memudar jika jarak makin jauh
            let opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(250, 185, 91, ${opacity * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#1A3263]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
      {/* Efek gelap (vignette) memutar agar konten utama tetap mudah dibaca */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#1A3263_90%)] pointer-events-none"></div>
    </div>
  );
};

// === DATA PORTOFOLIO ===
const biodata = {
  instagram: "https://instagram.com/rd.jee/",
  tiktok: "https://tiktok.com/@rd.jeee",
  github: "https://github.com/rdjeee",
  linkedin: "https://linkedin.com/in/javier-julian-95a6223b4",
};

const contactCards = [
  {
    id: "email",
    label: "Email",
    value: "raid.23julian@gmail.com",
    href: "mailto:raid.23julian@gmail.com",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "location",
    label: "Based in",
    value: "Subang, Indonesia",
    href: "https://maps.google.com/?q=Subang,Indonesia",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

const experiences = [
  {
    id: 1,
    year: "2023 - 2024",
    role: "Mahasiswa Teknologi Rekayasa Perangkat Lunak",
    organization: "Pendidikan Tinggi",
    description:
      "Memperdalam keahlian arsitektur perangkat lunak modern dan integrasi sistem cerdas. Melakukan riset komprehensif pada proyek inovatif, termasuk pengembangan model deteksi hama AI berbasis Flask (Smart Pakcoy Dashboard) dan rekayasa Smart Plug IoT dengan sistem keamanan kode sesi berbasis waktu.",
  },
  {
    id: 2,
    year: "2024",
    role: "Full-Stack Developer",
    organization: "Berkolaborasi dengan Petani Caringin",
    description:
      "Mendesain dan mengembangkan platform digital untuk memfasilitasi pemasaran dan manajemen produksi tembakau, menghubungkan petani dengan pembeli secara efisien. Proyek ini mencakup pengembangan aplikasi web dengan Laravel, database MySQL, serta meningkatkan efisiensi operasional dan memperluas akses pasar bagi petani tembakau di daerah Caringin.",
  },
  {
    id: 3,
    year: "2025",
    role: "Full-Stack Developer",
    organization: "BPBD Kab. Subang",
    description:
      "Menginisiasi dan membangun SIGANAS MADU secara end-to-end. Sistem ini mengintegrasikan arsitektur database relasional yang tangguh dengan antarmuka dinamis untuk mempercepat alur informasi, pelaporan warga, dan respons darurat bencana di tingkat daerah secara terpadu.",
  },
  {
    id: 4,
    year: "2026 - Saat Ini",
    role: "Backend Developer & IoT Integrator",
    organization: "Berkolaborasi dengan Awdy Farm",
    description:
      "Merancang dan mengembangkan Visual Intelligence System for IoT & Optimized Nutrition (V.I.S.I.O.N) sebagai solusi Agrotech komprehensif. Mengimplementasikan mikrokontroler ESP32, ESP32-CAM dan AI dalam pengambilan keputusan (Python) untuk otomatisasi manajemen pemberian pakan dan memantau ekosistem tambak secara real-time, sehingga meningkatkan efisiensi operasional dan keberlanjutan produksi perikanan.",
  },
];

const workflows = [
  {
    step: "01",
    title: "Perancangan UI/UX",
    description:
      "Memvisualisasikan antarmuka dan alur interaksi pengguna menggunakan Figma untuk memastikan pengalaman yang intuitif.",
  },
  {
    step: "02",
    title: "Pengembangan Sistem",
    description:
      "Membangun aplikasi mobile dengan Flutter, antarmuka web dinamis, serta backend cerdas berbasis Laravel atau Flask Python.",
  },
  {
    step: "03",
    title: "Integrasi & Arsitektur Data",
    description:
      "Merancang struktur SQL Database yang efisien serta mengintegrasikan sistem dengan perangkat keras seperti Arduino dan ESP32-CAM.",
  },
];

const techSkills: Record<string, { name: string; src: string }[]> = {
  Semua: [
    { name: "Python", src: "/logos/python.svg" },
    { name: "Laravel", src: "/logos/laravel.svg" },
    { name: "JavaScript", src: "/logos/javascript.svg" },
    { name: "Arduino IDE", src: "/logos/arduino.svg" },
    { name: "Supabase", src: "/logos/supabase.svg" },
    { name: "HTML/CSS", src: "/logos/html.svg" },
    { name: "Tailwind CSS", src: "/logos/tailwind.svg" },
    { name: "Flutter", src: "/logos/flutter.svg" },
    { name: "MySQL", src: "/logos/mysql.svg" },
  ],
  "Web Development": [
    { name: "Laravel", src: "/logos/laravel.svg" },
    { name: "Tailwind CSS", src: "/logos/tailwind.svg" },
    { name: "HTML/CSS", src: "/logos/html.svg" },
  ],
  "Backend & Database": [
    { name: "Python", src: "/logos/python.svg" },
    { name: "Supabase", src: "/logos/supabase.svg" },
    { name: "MySQL", src: "/logos/mysql.svg" },
  ],
  "Mobile & App": [
    { name: "Flutter", src: "/logos/flutter.svg" },
    { name: "JavaScript", src: "/logos/javascript.svg" },
  ],
  "IoT & Hardware": [{ name: "Arduino IDE", src: "/logos/arduino.svg" }],
};

const projects = [
  {
    id: 0,
    title: "Pemasaran dan Pengelolaan Tembakau",
    description:
      "Platform digital untuk memfasilitasi pemasaran dan manajemen produksi tembakau, menghubungkan petani dengan pembeli secara efis",
    techStack: ["Laravel", "MySQL"],
    link: "#",
  },
  {
    id: 1,
    title: "SIGANAS MADU",
    description:
      "Platform digital terpadu untuk optimalisasi manajemen tanggap bencana daerah, memfasilitasi pelaporan real-time dan respons cepat berbasis partisipasi masyarakat.",
    techStack: ["Laravel", "MySQL", "React Native"],
    link: "#",
  },
  {
    id: 2,
    title: "V.I.S.I.O.N",
    description:
      "Sistem agrotech cerdas berbasis Computer Vision dan IoT untuk otomatisasi manajemen pakan dan pemantauan ekosistem tambak secara presisi.",
    techStack: ["Flutter", "Python", "IoT", "Supabase"],
    link: "#",
  },
];

const certificates = [
  {
    id: 1,
    title: "Sertifikasii Sistem Pengelolaan Tembakau Caringin",
    issuer: "Tembakau Caringin",
    date: "November 2024",
    image: "/certificates/sertifikatpengelolaanCaringin.svg",
    credentialUrl: "/dokumen/sertifikatpengelolaanCaringin.pdf",
  },
  {
    id: 2,
    title: "Sertifikasi Sistem Pemasaran Tembakau Caringin",
    issuer: "Tembakau Caringin",
    date: "November 2024",
    image: "/certificates/sertifikatpemasaranCaringin.svg",
    credentialUrl: "/dokumen/sertifikatpemasaranCaringin.pdf",
  },
  {
    id: 3,
    title: "Sertifikasi Junior Web Programmer",
    issuer: "BNSP / LSP TIK",
    date: "November 2025",
    image: "/certificates/sertifikatBNSP.svg",
    credentialUrl: "/dokumen/sertifikatBNSP.pdf",
  },
  {
    id: 4,
    title: "Sertifikasi Website SIGANASMADU",
    issuer: "BPBD Kab. Subang",
    date: "November 2025",
    image: "/certificates/AplikasiWebsite.svg",
    credentialUrl: "/dokumen/sertifikatWebsiteSIGANASMADU.pdf",
  },
  {
    id: 5,
    title: "Sertifikasi Aplikasi Mobile SIGANASMADU",
    issuer: "BPBD Kab. Subang",
    date: "November 2025",
    image: "/certificates/AplikasiMobile.svg",
    credentialUrl: "/dokumen/sertifikatMobileSIGANASMADU.pdf",
  },
];

export default function Home() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [activeTab, setActiveTab] = useState("Semua");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen text-[#E8E2DB] font-sans pb-0 selection:bg-[#FAB95B] selection:text-[#1A3263] overflow-hidden">
      {/* --- MEMANGGIL ANIMASI LATAR BELAKANG --- */}
      <ParticleBackground />

      {/* 1. Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center relative gap-8 md:flex-row md:text-left md:max-w-5xl md:mx-auto pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-48 h-48 md:w-70 md:h-70 rounded-full bg-gradient-to-tr from-[#FAB95B] to-[#547792] p-1 flex-shrink-0"
        >
          <div className="w-full h-full rounded-full bg-[#1A3263] border-4 border-[#1A3263] flex items-center justify-center overflow-hidden relative shadow-[0_0_30px_rgba(250,185,91,0.3)]">
            <Image
              src="/pp.jpeg"
              alt="Raid Javier Julian"
              width={254}
              height={254}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center md:items-start">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#E8E2DB]"
          >
            Halo, Saya{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAB95B] to-[#E8E2DB]">
              Raid Javier Julian
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-[#E8E2DB]/80 max-w-2xl leading-relaxed text-justify drop-shadow-md"
          >
            Software Engineer yang berfokus pada pengembangan sistem cerdas,
            mulai dari aplikasi web dinamis hingga integrasi Internet of Things
            (IoT) dan Artificial Intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8"
          >
            <a
              href="#contact"
              className="px-5 py-2.5 bg-[#FAB95B] hover:bg-[#E8E2DB] text-[#1A3263] font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(250,185,91,0.4)] hover:shadow-[0_0_25px_rgba(250,185,91,0.6)] backdrop-blur-sm"
            >
              Hubungi Saya
            </a>

            <a
              href={biodata.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-[#547792]/20 border border-[#547792]/40 text-[#E8E2DB]/80 rounded-lg transition-all duration-300 hover:border-[#F75599] hover:text-[#F75599] hover:bg-[#547792]/30 hover:shadow-[0_0_15px_rgba(247,85,153,0.5)]"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href={biodata.tiktok}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-[#547792]/20 border border-[#547792]/40 text-[#E8E2DB]/80 rounded-lg transition-all duration-300 hover:border-white hover:text-white hover:bg-[#547792]/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            >
              <span className="sr-only">TikTok</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
              </svg>
            </a>

            <a
              href={biodata.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-[#547792]/20 border border-[#547792]/40 text-[#E8E2DB]/80 rounded-lg transition-all duration-300 hover:border-white hover:text-white hover:bg-[#547792]/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            >
              <span className="sr-only">GitHub</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href={biodata.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-[#547792]/20 border border-[#547792]/40 text-[#E8E2DB]/80 rounded-lg transition-all duration-300 hover:border-blue-500 hover:text-blue-500 hover:bg-[#547792]/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Tentang Saya & Garis Waktu Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-[#547792]/30 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-[#E8E2DB] drop-shadow-md">
              Tentang Saya
            </h2>
            <p className="text-[#E8E2DB]/90 text-lg leading-relaxed mb-6 text-justify drop-shadow-md">
              Berbasis di Subang, Jawa Barat, saya memiliki ketertarikan
              mendalam dalam memecahkan masalah dunia nyata melalui teknologi.
              Fokus utama saya mencakup pengembangan web <em>full-stack</em>,
              aplikasi <em>mobile</em>, hingga integrasi perangkat keras (IoT)
              yang dilengkapi dengan kecerdasan buatan.
            </p>
            <p className="text-[#E8E2DB]/90 text-lg leading-relaxed drop-shadow-md text-justify">
              Bagi saya, perangkat lunak bukan hanya sekadar barisan kode,
              melainkan jembatan untuk menciptakan sistem yang efisien dan
              bermanfaat bagi masyarakat luas.
            </p>
          </motion.div>

          {/* --- AREA SCROLL DITAMBAHKAN DI SINI --- */}
          <div className="relative ml-4 md:ml-0 max-h-[500px] overflow-y-auto overflow-x-hidden pr-4 custom-scrollbar">
            <div className="border-l border-[#547792]/40 space-y-10 pb-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative pl-8"
                >
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#1A3263] border-2 border-[#FAB95B] shadow-[0_0_10px_rgba(250,185,91,0.8)]"></div>
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                    <h3 className="text-lg font-bold text-[#E8E2DB] drop-shadow-md">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-bold text-[#FAB95B] tracking-wider mt-1 md:mt-0 drop-shadow-md">
                      {exp.year}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-[#FAB95B]/90 mb-3 drop-shadow-md">
                    {exp.organization}
                  </h4>
                  <p className="text-[#E8E2DB]/90 text-sm leading-relaxed bg-[#547792]/10 backdrop-blur-md p-4 rounded-xl border border-[#547792]/30 shadow-lg">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Alur Kerja Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-[#547792]/30 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center text-[#E8E2DB] drop-shadow-md"
        >
          Alur Kerja Pengembangan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {workflows.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#547792]/10 backdrop-blur-md p-6 rounded-xl border border-[#547792]/30 relative z-10 hover:border-[#FAB95B]/60 hover:bg-[#547792]/20 hover:shadow-[0_0_20px_rgba(250,185,91,0.2)] transition-all group cursor-pointer shadow-lg"
            >
              <div className="text-5xl font-black text-[#E8E2DB] opacity-50 absolute top-4 right-4 -z-10 select-none">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-[#FAB95B] mb-3 drop-shadow-md group-hover:text-[#E8E2DB] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#E8E2DB]/90 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Keahlian Utama Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-[#547792]/30 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4 text-center text-[#E8E2DB] drop-shadow-md"
        >
          Alat & Teknologi
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#E8E2DB]/90 text-center mb-8 max-w-2xl mx-auto drop-shadow-md"
        >
          Beberapa teknologi utama yang sering saya gunakan untuk mengembangkan
          sistem cerdas dan antarmuka dinamis.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(techSkills).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                activeTab === category
                  ? "bg-[#FAB95B]/20 text-[#FAB95B] border border-[#FAB95B]/80 shadow-[0_0_15px_rgba(250,185,91,0.5)]"
                  : "bg-[#547792]/10 border border-[#547792]/30 text-[#E8E2DB]/70 hover:border-[#FAB95B]/50 hover:text-[#E8E2DB]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {techSkills[activeTab].map((skill, index) => (
            <motion.div
              key={skill.name + activeTab}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex flex-col items-center justify-center p-6 md:p-8 bg-[#547792]/10 backdrop-blur-md border border-[#547792]/30 rounded-2xl transition-all duration-300 group cursor-default hover:border-[#FAB95B]/80 hover:bg-[#547792]/20 hover:shadow-[0_0_25px_rgba(250,185,91,0.5)] shadow-lg"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 mb-4 flex items-center justify-center relative transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                <div className="absolute inset-0 bg-[#FAB95B]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src={skill.src}
                  alt={`Logo ${skill.name}`}
                  width={64}
                  height={64}
                  className="object-contain relative z-10 drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(250,185,91,0.5)] transition-all duration-300"
                />
              </div>
              <span className="text-sm md:text-base font-semibold text-[#E8E2DB] group-hover:text-[#FAB95B] transition-all duration-300">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Proyek Terkini Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-[#547792]/30 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center text-[#E8E2DB] drop-shadow-md"
        >
          Proyek Terkini
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              href={project.link}
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col bg-[#547792]/10 backdrop-blur-md border border-[#547792]/30 rounded-xl p-6 hover:border-[#FAB95B]/60 hover:bg-[#547792]/20 hover:shadow-[0_0_20px_rgba(250,185,91,0.2)] transition-all group cursor-pointer shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[#FAB95B] transition-colors drop-shadow-md">
                {project.title}
              </h3>
              <p className="text-[#E8E2DB]/90 text-sm mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#1A3263]/80 border border-[#547792]/50 text-[10px] uppercase tracking-wider rounded-full text-[#E8E2DB]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* 6. Sertifikasi & Penghargaan Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-[#547792]/30 relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4 text-center text-[#E8E2DB] drop-shadow-md"
        >
          Sertifikasi & Penghargaan
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#E8E2DB]/90 text-center mb-12 max-w-2xl mx-auto drop-shadow-md"
        >
          Validasi profesional dan pencapaian berkelanjutan dalam pengembangan
          perangkat lunak dan sistem cerdas.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-[#547792]/10 backdrop-blur-md border border-[#547792]/30 rounded-2xl overflow-hidden hover:border-[#FAB95B]/60 hover:bg-[#547792]/20 hover:shadow-[0_0_25px_rgba(250,185,91,0.25)] transition-all duration-300 flex flex-col shadow-lg"
            >
              <div className="relative w-full aspect-[4/3] bg-[#1A3263] overflow-hidden border-b border-[#547792]/30">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-[#1A3263]/20 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold tracking-wider text-[#FAB95B] uppercase drop-shadow-sm group-hover:text-[#E8E2DB] transition-colors">
                    {cert.issuer}
                  </span>
                  <span className="text-xs text-[#E8E2DB]/80 font-medium">
                    {cert.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#E8E2DB] mb-4 line-clamp-2 drop-shadow-md">
                  {cert.title}
                </h3>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[#E8E2DB] hover:text-[#FAB95B] transition-colors w-max"
                >
                  Lihat Kredensial
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. Form Kontak Section */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-6 py-24 border-t border-[#547792]/30 relative z-10"
      >
        <div className="text-center md:text-left mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-[#E8E2DB] drop-shadow-md"
          >
            Ayo kita <span className="text-[#FAB95B]">Bekerja Sama</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#E8E2DB]/90 text-lg max-w-2xl drop-shadow-md"
          >
            Punya ide proyek? Saya ingin mendengarnya. Mari kita bahas bagaimana
            kita bisa mewujudkan ide-ide Anda.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col gap-6">
            {contactCards.map((contact, index) => (
              <motion.a
                key={contact.id}
                href={contact.href}
                target={contact.href.startsWith("mailto:") ? "_self" : "_blank"}
                rel={contact.href.startsWith("mailto:") ? "" : "noreferrer"}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center gap-5 p-5 bg-[#547792]/10 backdrop-blur-md border border-[#547792]/30 rounded-2xl group cursor-pointer shadow-lg hover:bg-[#547792]/20 transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-2xl bg-[#1A3263]/80 border border-[#547792]/50 text-[#FAB95B] shadow-[0_0_10px_rgba(250,185,91,0.2)] group-hover:shadow-[0_0_20px_rgba(250,185,91,0.6)] group-hover:border-[#FAB95B]/60 group-hover:text-[#FAB95B] transition-all duration-300">
                  {contact.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[#E8E2DB]/80 text-sm font-medium mb-0.5">
                    {contact.label}
                  </span>
                  <span className="text-[#E8E2DB] font-bold text-base md:text-lg group-hover:text-[#FAB95B] transition-colors">
                    {contact.value}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 bg-[#547792]/10 backdrop-blur-md border border-[#547792]/30 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl"
          >
            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-20 h-20 mb-6 rounded-full bg-[#FAB95B]/20 flex items-center justify-center border border-[#FAB95B]/50 shadow-[0_0_30px_rgba(250,185,91,0.4)]">
                  <svg
                    className="w-10 h-10 text-[#FAB95B]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#E8E2DB] mb-2 drop-shadow-md">
                  Pesan Berhasil Terkirim!
                </h3>
                <p className="text-[#E8E2DB]/90 mb-8 max-w-md">
                  Terima kasih telah menghubungi saya. Saya akan meninjau pesan
                  Anda dan segera membalasnya.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="px-6 py-2.5 bg-[#547792]/20 hover:bg-[#547792]/40 text-[#E8E2DB] font-medium rounded-xl transition-colors border border-[#FAB95B]/50 hover:border-[#FAB95B]"
                >
                  Kirim Pesan Lain
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/xzdydrba"
                method="POST"
                className="flex flex-col gap-6"
                suppressHydrationWarning
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-[#E8E2DB] text-sm font-medium drop-shadow-sm"
                    >
                      Nama <span className="text-[#FAB95B]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Javier Julian"
                      required
                      className="w-full bg-[#1A3263]/80 border border-[#547792]/40 rounded-xl px-5 py-3.5 text-[#E8E2DB] focus:outline-none focus:border-[#FAB95B] focus:ring-1 focus:ring-[#FAB95B] transition-all placeholder:text-[#E8E2DB]/40 disabled:opacity-50"
                      disabled={formStatus === "submitting"}
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-[#E8E2DB] text-sm font-medium drop-shadow-sm"
                    >
                      Email <span className="text-[#FAB95B]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="javier@gmail.com"
                      required
                      className="w-full bg-[#1A3263]/80 border border-[#547792]/40 rounded-xl px-5 py-3.5 text-[#E8E2DB] focus:outline-none focus:border-[#FAB95B] focus:ring-1 focus:ring-[#FAB95B] transition-all placeholder:text-[#E8E2DB]/40 disabled:opacity-50"
                      disabled={formStatus === "submitting"}
                      suppressHydrationWarning
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-[#E8E2DB] text-sm font-medium drop-shadow-sm"
                  >
                    Topik
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Kolaborasi, Pertanyaan, dll."
                    className="w-full bg-[#1A3263]/80 border border-[#547792]/40 rounded-xl px-5 py-3.5 text-[#E8E2DB] focus:outline-none focus:border-[#FAB95B] focus:ring-1 focus:ring-[#FAB95B] transition-all placeholder:text-[#E8E2DB]/40 disabled:opacity-50"
                    disabled={formStatus === "submitting"}
                    suppressHydrationWarning
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-[#E8E2DB] text-sm font-medium drop-shadow-sm"
                  >
                    Pesan <span className="text-[#FAB95B]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Berikan detail tentang ide atau pertanyaan Anda."
                    required
                    className="w-full bg-[#1A3263]/80 border border-[#547792]/40 rounded-xl px-5 py-4 text-[#E8E2DB] focus:outline-none focus:border-[#FAB95B] focus:ring-1 focus:ring-[#FAB95B] transition-all placeholder:text-[#E8E2DB]/40 resize-none disabled:opacity-50"
                    disabled={formStatus === "submitting"}
                    suppressHydrationWarning
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="mt-2 w-full md:w-auto self-start px-8 py-3.5 bg-[#FAB95B] hover:bg-[#E8E2DB] text-[#1A3263] font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(250,185,91,0.4)] hover:shadow-[0_0_25px_rgba(250,185,91,0.7)] disabled:bg-[#FAB95B]/30 disabled:text-[#E8E2DB]/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  suppressHydrationWarning
                >
                  {formStatus === "submitting" ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Pesan"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* 8. Footer Section */}
      <footer className="border-t border-[#547792]/20 bg-[#1A3263]/80 backdrop-blur-md pt-10 pb-8 mt-10 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#E8E2DB]/60 text-sm flex items-center gap-1">
            <span>© {new Date().getFullYear()}</span>
            <span className="font-semibold text-[#E8E2DB]">
              Raid Javier Julian
            </span>
            <span>. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-[#E8E2DB]/60">
            <a href="#" className="hover:text-[#FAB95B] transition-colors">
              Beranda
            </a>
            <a
              href="#contact"
              className="hover:text-[#FAB95B] transition-colors"
            >
              Kontak
            </a>
            <a
              href={biodata.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FAB95B] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
