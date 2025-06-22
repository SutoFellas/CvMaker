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
    const originalStyle = cvElement.getAttribute('style') || '';
    const styleId = 'pdf-print-styles';
    
    // Create a temporary style element to inject letter-spacing rules
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      #cv-preview, #cv-preview * {
        font-family: Arial, Helvetica, sans-serif !important;
        letter-spacing: 0.5pt !important;
        word-spacing: 1pt !important;
      }
    `;
    document.head.appendChild(style);
    
    // Temporarily set height to auto to capture the full content
    cvElement.style.height = 'auto';
    cvElement.style.overflow = 'visible';

    try {
      const canvas = await html2canvas(cvElement, {
        scale: 3,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        windowHeight: cvElement.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = imgWidth / pdfWidth;
      const totalPdfHeight = imgHeight / ratio;

      let heightLeft = totalPdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, totalPdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = -pageHeight + position;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, totalPdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('cv.pdf');

    } finally {
      // Restore original styles and remove the temporary stylesheet
      cvElement.setAttribute('style', originalStyle);
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
