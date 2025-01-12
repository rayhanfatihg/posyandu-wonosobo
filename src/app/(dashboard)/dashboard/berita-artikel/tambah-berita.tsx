import Footer from "@/components/footer"

export default function TambahBerita() {
  return (
    <main className="flex min-h-screen flex-col justify-start">
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="w-full max-w-md rounded-lg bg-white p-6 text-black shadow-md">
          {/* Tombol Kembali */}
          <button className="mb-4 rounded-lg bg-gray-200 px-4 py-2 text-black hover:bg-gray-300">
            &lt; Kembali
          </button>

          {/* Input Judul Berita */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Contoh : Pencegahan Stunting"
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Input Gambar */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold">Gambar</label>
            <div className="relative">
              <input
                type="file"
                className="w-full rounded-lg border px-4 py-2 file:mr-2 file:bg-gray-200 file:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                📂
              </span>
            </div>
          </div>

          {/* Input Tulis Berita */}
          <div className="mb-4">
            <textarea
              placeholder="Tulis Berita"
              className="h-32 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          {/* Tombol Upload */}
          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-4 py-3 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Upload
          </button>
        </div>
      </div>
    </main>
  )
}
