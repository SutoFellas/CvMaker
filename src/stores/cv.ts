import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
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
    name: 'Süleyman Gürbüz',
    title: 'Yazılım Mühendisi',
    picture: '', // Fotoğraf URL'n varsa buraya ekleyebilirsin
  })
  
  const contact = ref({
    linkedin: 'https://linkedin.com/in/suleymangurbuz',
    email: 'sutofellas@sutofellas.com',
    phone: '+90 532 222 22 22',
    website: 'https://sutofellas.space',
    portfolio: 'https://sutofellas.space/projects'
  })
  
  const skills = ref([
    'Full Stack Developer',
    'JavaScript / TypeScript',
    'Vue 3 / React',
    'Node.js & Express.js',
    'WebSocket & Real-time Uygulamalar',
    'Firebase & MongoDB',
    'Mobil Geliştirme (React Native)',
    'UI/UX Tasarımı',
    
   
   
  ])
  
  const experiences = ref<Experience[]>([
    {
      title: 'Yazılım Mühendisi',
      company: 'Noa Yazılım',
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      description: [
        'HTML, CSS ve JavaScript kullanarak müşteri arayüzleri tasarladı ve geliştirdi.',
        
        'Kullanıcı deneyimini iyileştirmek için mobil uyumlu ve erişilebilir tasarımlar geliştirdi.'
      ],
    },
    {
      title: 'Freelance Full Stack Developer',
      company: 'Kendi Projem',
      startDate: '2023-01-01',
      endDate: '2025-06-01',
      description: [
        'Üniversite otobüs takip sistemi geliştirildi; sürücü mobil uygulaması (React Native), gerçek zamanlı harita arayüzü (Vue + Leaflet) ve Node.js backend kullanıldı.',
        'Firebase Realtime Database ve WebSocket ile canlı konum takibi sağlandı.',
        'Tamamen mobil/tablet/masaüstü uyumlu arayüz tasarlandı ve sunumlar için teknik dokümantasyon hazırlandı.'
      ],
    },
  ])
  
  const educations = ref<Education[]>([
    {
      degree: 'Yazılım Mühendisliği Lisans',
      school: 'Girne Üniversitesi',
      year: '2025',
      details: [
        'Bitirme Projesi: Gerçek Zamanlı Üniversite Otobüs Takip Sistemi',
        'Leaflet, Google API ve Firebase kullanımı üzerine araştırmalar'
      ],
    },
    
  ])
  
  const certificates = ref<Certificate[]>([
  
    {
      name: 'Web Geliştirme Uzmanlığı',
      organization: 'Google Developers Türkiye',
      year: '2023',
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