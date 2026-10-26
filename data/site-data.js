/* ==========================================================
   TPSK — site content in one place.
   Edit this file to update names, contacts, gallery photos
   and downloads. No other file needs to change.
   ========================================================== */
window.TPSK = {
  config: {
    name: "THEKKAN PORE SILAMBA KALAI",
    // TODO: confirm exact Tamil academy name spelling with the academy
    tamilName: "தெக்கன் போர் சிலம்பக் கலை",
    slogan: "PAYINDRU..! PAYITRUVI..!",
    tagline: "TIME TO FLY HIGH",
    association: "CHENGAI TAMILAN ALL SPORTS ASSOCIATION",
    heritage: "Preserving the traditional martial art of Tamil Nadu through training, discipline and community service.",
    logo: "assets/images/logo/tpsk-logo.jpg",
    // Optional: paste a form-service address (e.g. Formspree) here to receive enquiries by email instead of WhatsApp.
    // Leave "" to send enquiries to the branch on WhatsApp (works with no setup).
    formEndpoint: "",
    // Optional: a general academy WhatsApp number (digits only, with country code, e.g. "919XXXXXXXXX"). Leave "" to hide.
    whatsapp: ""
  },

  grandMasters: [
    { id: "madhar", name: "மதார் ராவுத்தர்", title: "Grand Master (LATE)", photo: "assets/images/grandmasters/madhar-rowther.jpg" },
    { id: "shahul", name: "J.சாகுல் ஹமீது", title: "Grand Master", photo: "assets/images/grandmasters/shahul-hameed.jpg" }
  ],

  masters: [
    { id: "thamim", name: "Thamim Ansari S", branch: "otteri", photo: "assets/images/masters/thamim-ansari.webp" },
    { id: "jaipoon", name: "Jaipoon Nisha S", branch: "otteri", photo: "assets/images/masters/jaipoon-nisha.webp" },
    { id: "rasool", name: "Rasool Mohideen M", branch: "karasangal", photo: "assets/images/masters/rasool-mohideen.webp" },
    { id: "lakshmanan", name: "Lakshmanan A", branch: "vanchuvanchery", photo: "assets/images/masters/lakshmanan.webp" }
  ],

  /* Branch contact details. The Otteri numbers are BRANCH contacts, not personal numbers.
     Phone numbers open WhatsApp when clicked, so they should be WhatsApp-enabled numbers. */
  branches: [
    {
      id: "otteri",
      name: "Otteri Extn Branch",
      location: "Otteri Extn, Chennai",
      phones: ["9677210757", "7299947188"],
      instagram: "thekkanporesilambam_otteri",
      training: ""           // add confirmed training info (timings, fees) here when available
    },
    {
      id: "karasangal",
      name: "Karasangal Branch",
      location: "",          // add verified location when supplied
      phones: ["9445903440"],
      instagram: "thekkanporesilambam_karasangal",
      training: ""
    },
    {
      id: "vanchuvanchery",
      name: "Vanchuvanchery Branch",
      location: "",
      phones: ["9094942226"],
      instagram: "tpsk_vanchuvanchery",
      training: ""
    }
  ],

  /* ----------------------------------------------------------
     GALLERY PHOTOS
     1. Put your photos in the folder  assets/images/gallery/
     2. Add each file name below, one per line, inside quotes, with a comma.
     3. To PIN (feature) a photo at the top: start its file name with  pin-
        Example: rename  opening.jpg  to  pin-opening.jpg  and list it as "pin-opening.jpg".
     Photos without  pin-  are shown in the gallery in a mixed order each time the page loads.
     ---------------------------------------------------------- */
  gallery: [
    // "pin-state-championship.jpg",
    // "pin-group-photo.jpg",
    // "class-01.jpg",
    // "class-02.jpg",
"class (1).jpg",
"class (2).jpg",
"class (3).jpg",
"class (4).jpg",
"class (5).jpg",
"class (6).jpg",
"class (7).jpg",
"class (8).jpg",
"class (9).jpg",
"class (10).jpg",
"class (11).jpg",
"class (12).jpg",
  ],

  /* ----------------------------------------------------------
     DOWNLOADS (rules and regulations, entry form, brochure, certificates...)
     1. Put the file in the folder  assets/downloads/
     2. Add one line below:  ["Title shown on the website", "file-name.pdf"],
     A Download button is shown only for files listed here.
     ---------------------------------------------------------- */
  downloads: [
    ["Rules and Regulations", "rules.pdf"],
    ["Entry Form", "entry.pdf"],
    ["Academy Brochure", "brochure.pdf"],
 ["summa", "poster.pdf"],
  ]
};
