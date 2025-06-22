<script setup lang="ts">
import { ref } from 'vue';
import { useCvStore } from '@/stores/cv';

const openPanel = ref('personal');

function togglePanel(panelId: string) {
  openPanel.value = openPanel.value === panelId ? '' : panelId;
}

const store = useCvStore();

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        store.profile.picture = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
}

function addSkill() {
  store.skills.push('');
}

function removeSkill(index: number) {
  store.skills.splice(index, 1);
}

function addExperience() {
  store.experiences.push({
    title: '',
    company: '',
    dates: '',
    description: ['']
  });
}

function removeExperience(index: number) {
  store.experiences.splice(index, 1);
}

function addDescription(expIndex: number) {
  store.experiences[expIndex].description.push('');
}

function removeDescription(expIndex: number, descIndex: number) {
  store.experiences[expIndex].description.splice(descIndex, 1);
}

function addEducation() {
  store.educations.push({
    degree: '',
    school: '',
    year: '',
    details: ['']
  });
}

function removeEducation(index: number) {
  store.educations.splice(index, 1);
}

function addEducationDetail(eduIndex: number) {
  store.educations[eduIndex].details.push('');
}

function removeEducationDetail(eduIndex: number, detailIndex: number) {
  store.educations[eduIndex].details.splice(detailIndex, 1);
}

function addCertificate() {
  store.certificates.push({
    name: '',
    organization: '',
    year: ''
  });
}

function removeCertificate(index: number) {
  store.certificates.splice(index, 1);
}

function deleteContact(type: 'linkedin' | 'email' | 'phone' | 'website' | 'portfolio') {
  if (store.contact) {
    store.contact[type] = '';
  }
}
</script>

<template>
  <div class="form-container">
    <h2 class="form-title">CV Bilgileri</h2>

    <form @submit.prevent>
      <fieldset :class="{ 'is-open': openPanel === 'personal' }">
        <legend @click="togglePanel('personal')">
          <span>Kişisel Bilgiler</span>
          <span class="indicator"></span>
        </legend>
        <div class="panel-content">
          <div class="panel-content-inner">
            <div class="form-row">
              <label for="name">İsim Soyisim</label>
              <input type="text" id="name" v-model="store.profile.name">
            </div>
            <div class="form-row">
              <label for="title">Unvan</label>
              <input type="text" id="title" v-model="store.profile.title">
            </div>
            <div class="form-row">
              <label for="picture">Profil Fotoğrafı</label>
              <input type="file" id="picture" @change="onFileChange">
            </div>
          </div>
        </div>
      </fieldset>
      
      <fieldset :class="{ 'is-open': openPanel === 'contact' }">
        <legend @click="togglePanel('contact')">
          <span>İletişim Bilgileri</span>
          <span class="indicator"></span>
        </legend>
        <div class="panel-content">
          <div class="panel-content-inner">
            <div class="form-row">
              <label for="linkedin">LinkedIn</label>
              <div class="input-with-delete">
                <input type="text" id="linkedin" v-model="store.contact.linkedin">
                <button type="button" class="delete-btn" @click="deleteContact('linkedin')" title="LinkedIn'i sil">
                  <svg class="delete-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="form-row">
              <label for="email">E-posta</label>
              <div class="input-with-delete">
                <input type="text" id="email" v-model="store.contact.email">
                <button type="button" class="delete-btn" @click="deleteContact('email')" title="E-posta'yı sil">
                  <svg class="delete-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="form-row">
              <label for="phone">Telefon</label>
              <div class="input-with-delete">
                <input type="text" id="phone" v-model="store.contact.phone">
                <button type="button" class="delete-btn" @click="deleteContact('phone')" title="Telefonu sil">
                  <svg class="delete-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="form-row">
              <label for="website">Website</label>
              <div class="input-with-delete">
                <input type="text" id="website" v-model="store.contact.website">
                <button type="button" class="delete-btn" @click="deleteContact('website')" title="Website'i sil">
                  <svg class="delete-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset :class="{ 'is-open': openPanel === 'skills' }">
        <legend @click="togglePanel('skills')">
          <span>İlgili Beceriler</span>
          <span class="indicator"></span>
        </legend>
        <div class="panel-content">
          <div class="panel-content-inner">
            <div v-for="(skill, index) in store.skills" :key="index" class="skill-entry">
              <input type="text" v-model="store.skills[index]">
              <button type="button" @click="removeSkill(index)">Sil</button>
            </div>
            <button type="button" @click="addSkill">Beceri Ekle</button>
          </div>
        </div>
      </fieldset>

      <fieldset :class="{ 'is-open': openPanel === 'experience' }">
        <legend @click="togglePanel('experience')">
          <span>İş Deneyimi</span>
          <span class="indicator"></span>
        </legend>
        <div class="panel-content">
          <div class="panel-content-inner">
            <div v-for="(experience, expIndex) in store.experiences" :key="expIndex" class="experience-entry">
              <div class="form-row">
                <label :for="'exp-title-' + expIndex">Unvan</label>
                <input :id="'exp-title-' + expIndex" type="text" v-model="experience.title">
              </div>
              <div class="form-row">
                <label :for="'exp-company-' + expIndex">Şirket</label>
                <input :id="'exp-company-' + expIndex" type="text" v-model="experience.company">
              </div>
              <div class="form-row">
                <label :for="'exp-dates-' + expIndex">Tarihler</label>
                <input :id="'exp-dates-' + expIndex" type="text" v-model="experience.dates">
              </div>
              
              <label class="area-label">Açıklamalar</label>
              <div v-for="(desc, descIndex) in experience.description" :key="descIndex" class="description-entry">
                <textarea v-model="experience.description[descIndex]"></textarea>
                <button type="button" @click="removeDescription(expIndex, descIndex)">Sil</button>
              </div>
              <button type="button" @click="addDescription(expIndex)">Açıklama Ekle</button>

              <button type="button" @click="removeExperience(expIndex)" class="remove-experience">Deneyimi Sil</button>
            </div>
            <button type="button" @click="addExperience">Deneyim Ekle</button>
          </div>
        </div>
      </fieldset>

      <fieldset :class="{ 'is-open': openPanel === 'education' }">
        <legend @click="togglePanel('education')">
          <span>Eğitim Geçmişi</span>
          <span class="indicator"></span>
        </legend>
        <div class="panel-content">
          <div class="panel-content-inner">
            <div v-for="(education, eduIndex) in store.educations" :key="eduIndex" class="education-entry">
              <div class="form-row">
                <label>Derece</label>
                <input type="text" v-model="education.degree">
              </div>
              <div class="form-row">
                <label>Okul</label>
                <input type="text" v-model="education.school">
              </div>
              <div class="form-row">
                <label>Yıl</label>
                <input type="text" v-model="education.year">
              </div>

              <label class="area-label">Detaylar</label>
              <div v-for="(detail, detailIndex) in education.details" :key="detailIndex" class="detail-entry">
                <input type="text" v-model="education.details[detailIndex]">
                <button type="button" @click="removeEducationDetail(eduIndex, detailIndex)">Sil</button>
              </div>
              <button type="button" @click="addEducationDetail(eduIndex)">Detay Ekle</button>

              <button type="button" @click="removeEducation(eduIndex)" class="remove-entry">Eğitimi Sil</button>
            </div>
            <button type="button" @click="addEducation">Eğitim Ekle</button>
          </div>
        </div>
      </fieldset>

      <fieldset :class="{ 'is-open': openPanel === 'certificates' }">
        <legend @click="togglePanel('certificates')">
          <span>Sertifikalar</span>
          <span class="indicator"></span>
        </legend>
        <div class="panel-content">
          <div class="panel-content-inner">
            <div v-for="(certificate, certIndex) in store.certificates" :key="certIndex" class="certificate-entry">
              <div class="form-row">
                <label>Sertifika Adı</label>
                <input type="text" v-model="certificate.name">
              </div>
              <div class="form-row">
                <label>Kurum</label>
                <input type="text" v-model="certificate.organization">
              </div>
              <div class="form-row">
                <label>Yıl</label>
                <input type="text" v-model="certificate.year">
              </div>
              <button type="button" @click="removeCertificate(certIndex)" class="remove-entry">Sertifikayı Sil</button>
            </div>
            <button type="button" @click="addCertificate">Sertifika Ekle</button>
          </div>
        </div>
      </fieldset>

    </form>
  </div>
</template>

<style scoped>
.form-container {
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  color: #333;
}

.form-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

fieldset {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

legend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

legend:hover {
  background-color: #f0f4f8;
}

.indicator {
  border: solid #2c3e50;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  transition: transform 0.3s;
}

.is-open .indicator {
  transform: rotate(-135deg);
}

.panel-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s ease-in-out;
  overflow: hidden;
}

.is-open .panel-content {
  grid-template-rows: 1fr;
}

.panel-content-inner {
  padding-top: 1rem;
  overflow: hidden;
}

label {
  font-weight: 500;
  color: #555;
  flex: 0 0 120px;
  text-align: left;
}

.area-label {
  flex-basis: auto;
  text-align: left;
  margin-bottom: -0.25rem;
  margin-top: 0.5rem;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.form-row:last-of-type {
  margin-bottom: 0;
}

.form-row input {
  flex-grow: 1;
}

input[type="text"],
textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus,
textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

input[type="file"] {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.5rem;
  background-color: #f9f9f9;
}

.skill-entry {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.skill-entry input {
  flex-grow: 1;
}

button {
  padding: 0.6rem 1.2rem;
  border: none;
  background-color: #3498db;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 500;
}

button:hover {
  background-color: #2980b9;
}

.skill-entry button,
.description-entry button,
.detail-entry button,
.remove-entry {
  background-color: #e74c3c;
  padding: 0.5rem 0.8rem;
}

.skill-entry button:hover,
.description-entry button:hover,
.detail-entry button:hover,
.remove-entry:hover {
  background-color: #c0392b;
}

.experience-entry,
.education-entry,
.certificate-entry {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #fdfdfd;
}

.description-entry {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
}

textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  min-height: 60px;
}

.remove-experience,
.remove-entry {
  background-color: #e74c3c;
  margin-top: 0.5rem;
  align-self: flex-start;
}

.input-with-delete {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-grow: 1;
}

.input-with-delete input {
  flex-grow: 1;
}

.delete-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #e74c3c;
  border-radius: 4px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  background-color: #fdf2f2;
}

.delete-icon {
  width: 16px;
  height: 16px;
}
</style> 