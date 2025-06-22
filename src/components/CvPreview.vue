<script setup lang="ts">
import { useCvStore } from '@/stores/cv';
import type { PropType } from 'vue';
import type { Experience, Education, Certificate } from '@/stores/cv';

const props = defineProps({
  profile: Object as PropType<{ name: string; title: string; picture: string; }>,
  contact: Object as PropType<{ linkedin: string; email: string; phone: string; website: string; }>,
  skills: Array as PropType<string[]>,
  experiences: Array as PropType<Experience[]>,
  educations: Array as PropType<Education[]>,
  certificates: Array as PropType<Certificate[]>,
});

const store = useCvStore();

const cvProfile = props.profile || store.profile;
const cvContact = props.contact || store.contact;
const cvSkills = props.skills || store.skills;
const cvExperiences = props.experiences || store.experiences;
const cvEducations = props.educations || store.educations;
const cvCertificates = props.certificates || store.certificates;
</script>

<template>
  <div class="cv-container" id="cv-preview">
    <aside class="sidebar">
      <div class="profile-picture">
        <img v-if="cvProfile.picture" :src="cvProfile.picture" alt="Profile Picture">
        <div v-else class="placeholder-image"></div>
      </div>
      <div class="name-section">
        <h1>{{ cvProfile.name }}</h1>
        <p>{{ cvProfile.title }}</p>
      </div>

      <div class="contact-section">
        <ul>
          <li v-if="cvContact.linkedin && cvContact.linkedin.trim()">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>{{ cvContact.linkedin }}</span>
          </li>
          <li v-if="cvContact.email && cvContact.email.trim()">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"/>
            </svg>
            <span>{{ cvContact.email }}</span>
          </li>
          <li v-if="cvContact.phone && cvContact.phone.trim()">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span>{{ cvContact.phone }}</span>
          </li>
          <li v-if="cvContact.website && cvContact.website.trim()">
            <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span>{{ cvContact.website }}</span>
          </li>
        </ul>
      </div>

      <div class="skills-section" v-if="cvSkills && cvSkills.filter(skill => skill.trim()).length > 0">
        <h3>İLGİLİ BECERİLER</h3>
        <ul>
          <li v-for="(skill, index) in cvSkills" :key="index">
            {{ skill }}
          </li>
        </ul>
      </div>
    </aside>
    <main class="main-content">
      <section class="cv-section" v-if="cvExperiences && cvExperiences.filter(exp => exp.title.trim() || exp.company.trim() || exp.dates.trim() || exp.description.some(d => d.trim())).length > 0">
        <h2 class="section-title">İŞ DENEYİMİ</h2>
        <div v-for="(exp, index) in cvExperiences" :key="index" class="entry">
          <div class="entry-header">
            <h3 class="entry-title">{{ exp.title }}</h3>
            <div class="entry-subtitle">{{ exp.company }}</div>
          </div>
          <div class="entry-meta">{{ exp.dates }}</div>
          <ul class="entry-description">
            <li v-for="(desc, descIndex) in exp.description" :key="descIndex">{{ desc }}</li>
          </ul>
        </div>
      </section>

      <section class="cv-section" v-if="cvEducations && cvEducations.filter(edu => edu.degree.trim() || edu.school.trim() || edu.year.trim() || edu.details.some(d => d.trim())).length > 0">
        <h2 class="section-title">EĞİTİM GEÇMİŞİ</h2>
        <div v-for="(edu, index) in cvEducations" :key="index" class="entry">
          <div class="entry-header">
            <h3 class="entry-title">{{ edu.degree }}</h3>
            <div class="entry-subtitle">{{ edu.school }}</div>
          </div>
          <div class="entry-meta">{{ edu.year }}</div>
          <ul class="entry-description">
            <li v-for="(detail, detailIndex) in edu.details" :key="detailIndex">{{ detail }}</li>
          </ul>
        </div>
      </section>

      <section class="cv-section" v-if="cvCertificates && cvCertificates.filter(c => c.name.trim() || c.organization.trim() || c.year.trim()).length > 0">
        <h2 class="section-title">SERTİFİKALAR</h2>
        <template v-for="(cert, index) in cvCertificates" :key="index">
          <div class="entry" v-if="cert.name.trim() || cert.organization.trim() || cert.year.trim()">
            <div class="entry-header">
              <h3 class="entry-title">{{ cert.name }}</h3>
              <div class="entry-subtitle">{{ cert.organization }}</div>
            </div>
            <div class="entry-meta">{{ cert.year }}</div>
          </div>
        </template>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Base styles for on-screen display */
.cv-container {
  display: flex;
  width: 210mm;
  height: 297mm;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  transition: all 0.3s ease-in-out;
  margin: 0 auto;
  overflow: hidden;
  page-break-after: always;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

* {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.sidebar {
  width: 35%;
  background-color: #003d5b;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.main-content {
  width: 65%;
  padding: 2rem;
  color: #333;
  overflow-y: auto;
}

.profile-picture {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid white;
  margin-bottom: 2rem;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background-color: #bdc3c7;
}

.name-section {
  text-align: center;
  width: 100%;
  margin-bottom: 2rem;
}

.name-section h1 {
  margin: 0;
  font-size: 2.2rem;
  font-weight: bold;
  line-height: 1.2;
}

.name-section p {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.3;
}

.contact-section {
  width: 100%;
  text-align: left;
}

.contact-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-section li {
  margin-bottom: 0.85rem;
  overflow-wrap: break-word;
  display: flex;
  align-items: center;
  line-height: 1.5;
}

.contact-section li span {
  flex: 1;
  min-width: 0;
}

.skills-section {
  width: 100%;
  text-align: left;
  margin-top: 2rem;
}

.skills-section h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid white;
  padding-bottom: 0.5rem;
}

.skills-section ul {
  list-style: '• ';
  padding-left: 1rem;
  margin: 0;
}

.skills-section li {
  margin-bottom: 0.85rem;
  line-height: 1.5;
}

.cv-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
}

.entry {
  margin-bottom: 1.5rem;
}

.entry-header {
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

.entry-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0.5rem 0 0;
  line-height: 1.3;
}

.entry-subtitle {
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.3;
}

.entry-meta {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.entry-description {
  margin: 0;
  padding-left: 1.5rem;
  list-style-position: outside;
}

.entry-description li {
  margin-bottom: 0.7rem;
  line-height: 1.6;
}

.contact-icon {
  width: 18px;
  height: 18px;
  margin-right: 0.75rem;
  flex-shrink: 0;
}
</style> 