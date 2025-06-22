<script setup lang="ts">
import { ref } from 'vue';
import CvForm from '@/components/CvForm.vue';
import CvPreview from '@/components/CvPreview.vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import { useCvStore } from '@/stores/cv';

const store = useCvStore();
const qrCodeDataUrl = ref('');

async function generatePdf() {
  const cvElement = document.getElementById('cv-preview');
  if (cvElement) {
    const styleId = 'pdf-print-styles';
    // Create a new <style> element to inject our print-specific CSS
    const style = document.createElement('style');
    style.id = styleId;
    
    // This CSS rule targets the container and ALL elements within it (*).
    // This ensures our spacing rules are applied uniformly to all text,
    // including headers, paragraphs, and bold text, overriding other styles.
    style.innerHTML = `
      #cv-preview, #cv-preview * {
        font-family: Arial, Helvetica, sans-serif !important;
        letter-spacing: 0.5pt !important;
        word-spacing: 1pt !important;
      }
    `;

    // Add the temporary styles to the document's head
    document.head.appendChild(style);

    try {
      // Now, html2canvas will render the component using our temporary styles
      const canvas = await html2canvas(cvElement, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('cv.pdf');

    } finally {
      // IMPORTANT: Remove the temporary style element after we're done
      // to restore the original on-screen appearance.
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    }
  }
}

async function generateQrCode() {
  const cvData = {
    profile: store.profile,
    contact: store.contact,
    skills: store.skills,
    experiences: store.experiences,
    educations: store.educations,
    certificates: store.certificates,
  };
  const jsonString = JSON.stringify(cvData);
  const base64String = btoa(unescape(encodeURIComponent(jsonString)));
  const url = `${window.location.origin}/cv/${base64String}`;
  
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(url);
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <div class="home-container">
    <div class="form-section">
      <CvForm />
      <div class="actions">
        <button @click="generatePdf">PDF İndir</button>
        <button @click="generateQrCode">QR Kod Oluştur</button>
      </div>
      <div v-if="qrCodeDataUrl" class="qr-code-container">
        <h4>CV'nizin Paylaşılabilir QR Kodu</h4>
        <p>Bu QR kodu okutarak CV'nize web üzerinden erişebilirsiniz.</p>
        <img :src="qrCodeDataUrl" alt="CV QR Code">
      </div>
    </div>
    <div class="preview-section">
      <CvPreview />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  align-items: flex-start;
  justify-content: center;
  background-color: #e9ecef;
  min-height: 100vh;
  min-width: 1200px; /* Force side-by-side layout */
  overflow-x: auto;
}

.form-section {
  flex: 0 1 600px; /* Let it grow but not shrink past 600px */
}

.actions {
  margin-top: 2rem;
  text-align: center;
}

.actions button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  background-color: #27ae60;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.actions button:hover {
  background-color: #229954;
}

.qr-code-container {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
}

.qr-code-container img {
  max-width: 200px;
  margin-top: 1rem;
}

.preview-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align to top */
  position: sticky;
  top: 2rem;
  transform: scale(0.8);
  transform-origin: top;
  transition: transform 0.3s ease-in-out;
}

@media (max-width: 1200px) {
  .preview-section {
    transform: scale(0.7);
  }
}

@media (max-width: 1024px) {
  .home-container {
    flex-direction: column;
    align-items: center;
  }
  .preview-section {
    transform: scale(1);
    margin-top: 2rem;
  }
  .form-section {
    width: 100%;
    max-width: 800px;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }
  .preview-section {
    transform: scale(0.9);
    transform-origin: top;
  }
}
</style>
