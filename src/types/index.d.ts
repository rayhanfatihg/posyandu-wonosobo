export type SiteConfig = {
  name: string
  author: string
  description: string
  keywords: Array<string>
  url: {
    base: string
    author: string
  }
  links: {
    github: string
  }
  ogImage: string
}

export type Warga = {
  id: string
  nama: string
  nik: string
  tanggalLahir: Date
  umur: number
  dusun?: string
  layananLansia: LayananLansia[]
  LayananIbuAnak: LayananIbuAnak[]
  createdAt: Date
  updatedAt: Date
}

export type LayananLansia = {
  id: string
  wargaId: string
  warga?: Warga // Optional karena ini adalah relasi
  nama: string
  nik: string
  ttl: string
  beratBadan?: number // Optional
  tinggiBadan?: number // Optional
  tensiDarah?: string // Optional
  lingkarPerut?: number // Optional
  kolesterol?: number // Optional
  gulaDarah?: number // Optional
  asamUrat?: number // Optional
  keterangan?: string // Optional
  createdAt: Date
  updatedAt: Date
}

export type LayananIbuAnak = {
  id: string
  wargaId: string
  warga?: Warga // Optional karena ini adalah relasi
  jenisKelamin: JenisKelamin
  namaIbu: string
  namaAyah: string
  namaAnak: string
  tinggiBadanAnak?: number // Optional
  beratBadanAnak?: number // Optional
  umurAnak?: number // Optional
  lingkarLenganAnak?: number // Optional
  lingkarKepalaAnak?: number // Optional
  tinggiBadanIbu?: number // Optional
  beratBadanIbu?: number // Optional
  lingkarLenganIbu?: number // Optional
  lingkarPinggangIbu?: number // Optional
  alatKontrasepsi?: string // Optional
  createdAt: Date
  updatedAt: Date
}

export enum JenisKelamin {
  LAKI_LAKI = "LAKI_LAKI",
  PEREMPUAN = "PEREMPUAN",
}

export type Blog = {
  id: string
  createdAt: Date
  title: string
  image_url: string
  is_premium: boolean
  is_published: boolean
  blog_content: BlogContent[]
}

export type BlogContent = {
  blog_id: string
  blog?: Blog // Optional karena ini adalah relasi
  content: string
  createdAt: Date
}

export type JadwalPosyandu = {
  id: string
  namaAcara: string
  tanggal: Date
  jam: string
  createdAt: Date
  updatedAt: Date
}
