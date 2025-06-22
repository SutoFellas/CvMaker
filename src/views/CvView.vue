<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CvPreview from '@/components/CvPreview.vue';
import type { Experience, Education, Certificate } from '@/stores/cv';

interface CvData {
  profile: {
    name: string;
    title: string;
    picture: string;
  };
  contact: {
    linkedin: string;
    email: string;
    phone: string;
    website: string;
    portfolio: string;
  };
  skills: string[];
  experiences: Experience[];
  educations: Education[];
  certificates: Certificate[];
}

const props = defineProps<{
  data: string;
}>();

const cvData = ref<CvData | null>(null);

onMounted(() => {
  try {
    const jsonString = decodeURIComponent(escape(atob(props.data)));
    cvData.value = JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse CV data from URL:", error);
    // Handle error, maybe show a message to the user
  }
});
</script>

<template>
  <div class="cv-view-container">
    <CvPreview v-if="cvData" 
      :profile="cvData.profile"
      :contact="cvData.contact"
      :skills="cvData.skills"
      :experiences="cvData.experiences"
      :educations="cvData.educations"
      :certificates="cvData.certificates"
    />
    <div v-else>
      Yükleniyor veya geçersiz veri...
    </div>
  </div>
</template>

<style scoped>
.cv-view-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  background-color: #e9ecef;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .cv-view-container {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .cv-view-container {
    padding: 0;
  }
}
</style> 