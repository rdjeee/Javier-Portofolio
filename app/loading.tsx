export default function Loading() {
  return (
    <main className="relative min-h-screen bg-[#1A3263] px-6 pt-10 overflow-hidden">
      {/* Skeleton Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] gap-8 md:flex-row md:max-w-5xl md:mx-auto">
        {/* Lingkaran Profil */}
        <div className="w-48 h-48 md:w-[254px] md:h-[254px] rounded-full bg-[#547792]/30 animate-pulse flex-shrink-0"></div>

        <div className="flex flex-col items-center md:items-start w-full max-w-lg mt-6 md:mt-0">
          {/* Judul Utama */}
          <div className="h-12 md:h-16 w-3/4 bg-[#547792]/30 animate-pulse rounded-2xl mb-6"></div>

          {/* Paragraf Deskripsi */}
          <div className="w-full space-y-3 mb-8">
            <div className="h-4 w-full bg-[#547792]/30 animate-pulse rounded-md"></div>
            <div className="h-4 w-5/6 bg-[#547792]/30 animate-pulse rounded-md"></div>
            <div className="h-4 w-4/6 bg-[#547792]/30 animate-pulse rounded-md"></div>
          </div>

          {/* Tombol Kontak dan Sosmed */}
          <div className="flex flex-wrap gap-4">
            <div className="h-12 w-36 bg-[#547792]/30 animate-pulse rounded-lg"></div>
            <div className="h-12 w-12 bg-[#547792]/30 animate-pulse rounded-lg"></div>
            <div className="h-12 w-12 bg-[#547792]/30 animate-pulse rounded-lg"></div>
            <div className="h-12 w-12 bg-[#547792]/30 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
