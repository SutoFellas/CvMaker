import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Experience {
  title: string;
  company: string;
  dates: string;
  description: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  details: string[];
}

export interface Certificate {
  name: string;
  organization: string;
  year: string;
}

export const useCvStore = defineStore('cv', () => {
  const profile = ref({
    name: 'KAAN GERDANLI',
    title: 'UÇUŞ GÖREVLİSİ',
    picture: '',
  })

  const contact = ref({
    linkedin: 'linkedin.com/in/isim',
    email: 'merhaba@harikasite.web.tr',
    phone: '+123-456-7890',
    website: 'www.harikasite.web.tr',
    portfolio: 'Portföyüm için buraya tıklayın'
  })

  const skills = ref([
    'Akıcı Fransızca',
    'Kaliteli Müşteri Hizmetleri',
    'İlk Yardım ve Acil Bakım',
  ])

  const experiences = ref<Experience[]>([
    {
      title: 'Uçuş Görevlisi',
      company: 'Willfred Havayolları',
      dates: 'Mart 2022 - Ağustos 2025 (3 yıl, 5 ay)',
      description: [
        '40\'tan fazla genç uçuş görevlisine danışmanlık yaparak ve onları yüksek kaliteli sağlık ve güvenlik standartlarında eğiterek genel hizmet kalitesini %30 artırdı',
        'Onlara olağanüstü müşteri odaklı hizmet sunarak ve konfor ve güvenliklerini sağlayarak %100 olumlu geri bildirim notu korundu',
        '2.000 saatten fazla uluslararası ve iç hat uçuşu gerçekleştirildi',
      ],
    },
  ])

  const educations = ref<Education[]>([
    {
      degree: 'Turizm Bilimi Lisans',
      school: 'Vadiköy Üniversitesi',
      year: 'Mezuniyet Yılı: 2020',
      details: ['Cum Laude Başkanı', 'En İyi Tez', 'Vadiköy Münazara Kulübü'],
    },
  ])

  const certificates = ref<Certificate[]>([
    {
      name: 'Uçuş Güvenliği Eğitimi',
      organization: 'Ulusal Havacılık Derneği',
      year: '2020',
    },
    {
      name: 'İlk Yardım Sertifikası Kurumu:',
      organization: 'Uluslararası Tıp Ajansı',
      year: '2020',
    },
  ])

  function updateName(name: string) {
    profile.value.name = name;
  }

  // We can add more actions later to update other fields

  return { 
    profile,
    contact,
    skills,
    experiences,
    educations,
    certificates,
    updateName
  }
}) 