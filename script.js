// /* script.js - Universal Skin Storage, Studio Settings Engine, Import/Export & Modals */
// (function () {
//   const LIBRARY_KEY = 'craftvora_skins_v2';
//   const ACTIVE_SKIN_KEY = 'craftvora_active_skin_id';
//   const SETTINGS_KEY = 'craftvora_studio_settings_v1';

//   const DEFAULT_SETTINGS = {
//     defaultModel: 'classic',
//     showGridByDefault: true,
//     showUvGuidesByDefault: true,
//     walkAnimByDefault: true,
//     autoSaveEditor: true,
//     reducedMotion: false,
//     exportPrefix: 'craftvora',
//     pixelShadeIntensity: 18
//   };

//   function getSettings() {
//     try {
//       const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
//       return { ...DEFAULT_SETTINGS, ...saved };
//     } catch (e) {
//       return { ...DEFAULT_SETTINGS };
//     }
//   }

//   function updateSettings(partial) {
//     const next = { ...getSettings(), ...partial };
//     localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
//     applyGlobalSettings(next);
//     return next;
//   }

//   function resetSettings() {
//     localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
//     applyGlobalSettings(DEFAULT_SETTINGS);
//     return { ...DEFAULT_SETTINGS };
//   }

//   function applyGlobalSettings(settings = getSettings()) {
//     document.body.classList.toggle('no-anim', !!settings.reducedMotion);
//   }

//   // Generate starter 64x64 Minecraft skin texture
//   function createStarterSkinDataURL(variant = 'emerald') {
//     const canvas = document.createElement('canvas');
//     canvas.width = 64;
//     canvas.height = 64;
//     const ctx = canvas.getContext('2d');
//     ctx.imageSmoothingEnabled = false;

//     const palettes = {
//       steve: {
//         hair: '#3b2718',
//         skin: '#f0b892',
//         eye: '#3b2fa3',
//         shirt: '#14a3a8',
//         pants: '#34449c',
//         shoes: '#595959'
//       },
//       emerald: {
//         hair: '#153224',
//         skin: '#f3c5a2',
//         eye: '#1b6b36',
//         shirt: '#30d158',
//         pants: '#1c1c1e',
//         shoes: '#0a0a0c'
//       },
//       knight: {
//         hair: '#525b66',
//         skin: '#eab38f',
//         eye: '#ff9f0a',
//         shirt: '#8d99ae',
//         pants: '#4a5568',
//         shoes: '#2d3748'
//       }
//     };

//     const p = palettes[variant] || palettes.emerald;
//     const fill = (x, y, w, h, color) => {
//       ctx.fillStyle = color;
//       ctx.fillRect(x, y, w, h);
//     };

//     // Head (8x8x8 at 0,0)
//     fill(8, 0, 8, 8, p.hair);
//     fill(16, 0, 8, 8, p.skin);
//     fill(0, 8, 8, 8, p.hair);
//     fill(8, 8, 8, 8, p.skin);
//     fill(16, 8, 8, 8, p.hair);
//     fill(24, 8, 8, 8, p.hair);
//     fill(8, 8, 8, 2, p.hair);
//     fill(9, 12, 1, 1, '#ffffff');
//     fill(10, 12, 1, 1, p.eye);
//     fill(13, 12, 1, 1, p.eye);
//     fill(14, 12, 1, 1, '#ffffff');
//     fill(11, 14, 2, 1, '#b87654');

//     // Torso (8x12x4 at 16,16)
//     fill(20, 16, 8, 4, p.shirt);
//     fill(28, 16, 8, 4, p.shirt);
//     fill(16, 20, 4, 12, p.shirt);
//     fill(20, 20, 8, 12, p.shirt);
//     fill(28, 20, 4, 12, p.shirt);
//     fill(32, 20, 8, 12, p.shirt);

//     // Right Arm (4x12x4 at 40,16)
//     fill(44, 16, 4, 4, p.shirt);
//     fill(48, 16, 4, 4, p.skin);
//     fill(40, 20, 16, 4, p.shirt);
//     fill(40, 24, 16, 8, p.skin);

//     // Left Arm (4x12x4 at 32,48)
//     fill(36, 48, 4, 4, p.shirt);
//     fill(40, 48, 4, 4, p.skin);
//     fill(32, 52, 16, 4, p.shirt);
//     fill(32, 56, 16, 8, p.skin);

//     // Right Leg (4x12x4 at 0,16)
//     fill(4, 16, 4, 4, p.pants);
//     fill(8, 16, 4, 4, p.shoes);
//     fill(0, 20, 16, 10, p.pants);
//     fill(0, 30, 16, 2, p.shoes);

//     // Left Leg (4x12x4 at 16,48)
//     fill(20, 48, 4, 4, p.pants);
//     fill(24, 48, 4, 4, p.shoes);
//     fill(16, 52, 16, 10, p.pants);
//     fill(16, 62, 16, 2, p.shoes);

//     return canvas.toDataURL('image/png');
//   }

//   function createBlankSkinDataURL() {
//     const c = document.createElement('canvas');
//     c.width = 64;
//     c.height = 64;
//     return c.toDataURL('image/png');
//   }

//   function ensureInitialized() {
//     let skins = [];
//     try {
//       skins = JSON.parse(localStorage.getItem(LIBRARY_KEY) || '[]');
//     } catch (e) {
//       skins = [];
//     }
//     if (!Array.isArray(skins) || skins.length === 0) {
//       const now = Date.now();
//       skins = [
//         {
//           id: 'skin_emerald_warden',
//           name: 'Emerald Warden',
//           model: 'classic',
//           tags: ['Featured', 'Studio'],
//           updatedAt: now - 3600 * 1000 * 2,
//           dataUrl: createStarterSkinDataURL('emerald')
//         },
//         {
//           id: 'skin_classic_explorer',
//           name: 'Classic Explorer',
//           model: 'classic',
//           tags: ['Starter'],
//           updatedAt: now - 3600 * 1000 * 24,
//           dataUrl: createStarterSkinDataURL('steve')
//         },
//         {
//           id: 'skin_iron_vanguard',
//           name: 'Iron Vanguard',
//           model: 'slim',
//           tags: ['Armor', 'PvP'],
//           updatedAt: now - 3600 * 1000 * 52,
//           dataUrl: createStarterSkinDataURL('knight')
//         }
//       ];
//       localStorage.setItem(LIBRARY_KEY, JSON.stringify(skins));
//     }
//     return skins;
//   }

//   function getSkins() {
//     return ensureInitialized();
//   }

//   function saveSkins(list) {
//     localStorage.setItem(LIBRARY_KEY, JSON.stringify(list));
//   }

//   function getSkinById(id) {
//     return getSkins().find((s) => s.id === id) || null;
//   }

//   function upsertSkin(skinObj) {
//     const skins = getSkins();
//     const idx = skinObj.id ? skins.findIndex((s) => s.id === skinObj.id) : -1;
//     const record = {
//       id: idx >= 0 ? skinObj.id : 'skin_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
//       name: (skinObj.name || 'Untitled Skin').trim(),
//       model: skinObj.model === 'slim' ? 'slim' : 'classic',
//       tags: Array.isArray(skinObj.tags) ? skinObj.tags : ['Custom'],
//       updatedAt: Date.now(),
//       dataUrl: skinObj.dataUrl || createStarterSkinDataURL('emerald')
//     };
//     if (idx >= 0) {
//       skins[idx] = { ...skins[idx], ...record };
//     } else {
//       skins.unshift(record);
//     }
//     saveSkins(skins);
//     return record;
//   }

//   // Dedicated helper: ALWAYS creates a brand-new unique skin record & activates it
//   function createNewSkin({ name, model, base } = {}) {
//     const settings = getSettings();
//     const chosenModel = model || settings.defaultModel || 'classic';
//     const count = getSkins().length + 1;
//     const finalName = (name && name.trim()) || `New Skin #${count}`;

//     let dataUrl;
//     if (base === 'blank') {
//       dataUrl = createBlankSkinDataURL();
//     } else if (base === 'steve' || base === 'knight' || base === 'emerald') {
//       dataUrl = createStarterSkinDataURL(base);
//     } else {
//       dataUrl = createBlankSkinDataURL();
//     }

//     const created = upsertSkin({
//       id: null, // Force brand-new ID so previous skin is never overwritten
//       name: finalName,
//       model: chosenModel,
//       tags: ['New'],
//       dataUrl
//     });

//     setActiveSkinId(created.id);
//     return created;
//   }

//   function deleteSkin(id) {
//     const skins = getSkins().filter((s) => s.id !== id);
//     saveSkins(skins);
//     if (localStorage.getItem(ACTIVE_SKIN_KEY) === id && skins[0]) {
//       setActiveSkinId(skins[0].id);
//     }
//   }

//   function setActiveSkinId(id) {
//     localStorage.setItem(ACTIVE_SKIN_KEY, id);
//   }

//   function getActiveSkin() {
//     const id = localStorage.getItem(ACTIVE_SKIN_KEY);
//     const skins = getSkins();
//     return skins.find((s) => s.id === id) || skins[0];
//   }

//   // Render character preview onto target <canvas>
//   function renderSkinCharacterPreview(canvas, dataUrl, model = 'classic') {
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const img = new Image();
//     img.onload = function () {
//       const w = canvas.width;
//       const h = canvas.height;
//       ctx.clearRect(0, 0, w, h);
//       ctx.imageSmoothingEnabled = false;

//       const scale = Math.max(2, Math.floor(Math.min(w / 22, h / 36)));
//       const armW = model === 'slim' ? 3 : 4;
//       const cx = Math.floor(w / 2);
//       const topY = Math.floor((h - 32 * scale) / 2);

//       ctx.fillStyle = 'rgba(20, 35, 28, 0.14)';
//       ctx.beginPath();
//       ctx.ellipse(cx, topY + 32 * scale, 7 * scale, 2 * scale, 0, 0, Math.PI * 2);
//       ctx.fill();

//       // Head + Hat
//       ctx.drawImage(img, 8, 8, 8, 8, cx - 4 * scale, topY, 8 * scale, 8 * scale);
//       ctx.drawImage(img, 40, 8, 8, 8, cx - 4 * scale, topY, 8 * scale, 8 * scale);

//       // Torso + Jacket
//       ctx.drawImage(img, 20, 20, 8, 12, cx - 4 * scale, topY + 8 * scale, 8 * scale, 12 * scale);
//       ctx.drawImage(img, 20, 36, 8, 12, cx - 4 * scale, topY + 8 * scale, 8 * scale, 12 * scale);

//       // Right Arm + Sleeve
//       ctx.drawImage(img, 44, 20, armW, 12, cx - (4 + armW) * scale, topY + 8 * scale, armW * scale, 12 * scale);
//       ctx.drawImage(img, 44, 36, armW, 12, cx - (4 + armW) * scale, topY + 8 * scale, armW * scale, 12 * scale);

//       // Left Arm + Sleeve
//       ctx.drawImage(img, 36, 52, armW, 12, cx + 4 * scale, topY + 8 * scale, armW * scale, 12 * scale);
//       ctx.drawImage(img, 52, 52, armW, 12, cx + 4 * scale, topY + 8 * scale, armW * scale, 12 * scale);

//       // Right Leg + Pants
//       ctx.drawImage(img, 4, 20, 4, 12, cx - 4 * scale, topY + 20 * scale, 4 * scale, 12 * scale);
//       ctx.drawImage(img, 4, 36, 4, 12, cx - 4 * scale, topY + 20 * scale, 4 * scale, 12 * scale);

//       // Left Leg + Pants
//       ctx.drawImage(img, 20, 52, 4, 12, cx, topY + 20 * scale, 4 * scale, 12 * scale);
//       ctx.drawImage(img, 4, 52, 4, 12, cx, topY + 20 * scale, 4 * scale, 12 * scale);
//     };
//     img.src = dataUrl;
//   }

//   function buildExportFileName(skinName, ext) {
//     const prefix = (getSettings().exportPrefix || '').trim();
//     const cleanBase = (skinName || 'minecraft-skin').toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
//     return prefix ? `${prefix}-${cleanBase}.${ext}` : `${cleanBase}.${ext}`;
//   }

//   function exportSkinPNG(skin) {
//     const link = document.createElement('a');
//     const filename = buildExportFileName(skin.name, 'png');
//     link.download = filename;
//     link.href = skin.dataUrl;
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     showToast(`Exported ${filename}`);
//   }

//   function exportSkinJSON(skin, callback) {
//     const img = new Image();
//     img.onload = function () {
//       const c = document.createElement('canvas');
//       c.width = 64;
//       c.height = 64;
//       const ctx = c.getContext('2d');
//       ctx.drawImage(img, 0, 0, 64, 64);
//       const imgData = ctx.getImageData(0, 0, 64, 64).data;

//       const pixels = [];
//       for (let y = 0; y < 64; y++) {
//         const row = [];
//         for (let x = 0; x < 64; x++) {
//           const i = (y * 64 + x) * 4;
//           const a = imgData[i + 3];
//           if (a === 0) {
//             row.push(null);
//           } else {
//             const hex =
//               '#' +
//               [imgData[i], imgData[i + 1], imgData[i + 2]]
//                 .map((v) => v.toString(16).padStart(2, '0'))
//                 .join('') +
//               (a < 255 ? a.toString(16).padStart(2, '0') : '');
//             row.push(hex);
//           }
//         }
//         pixels.push(row);
//       }

//       const payload = {
//         format: 'craftvora-minecraft-skin-v1',
//         name: skin.name,
//         model: skin.model || 'classic',
//         tags: skin.tags || [],
//         width: 64,
//         height: 64,
//         exportedAt: new Date().toISOString(),
//         dataUrl: skin.dataUrl,
//         pixels
//       };

//       const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       const filename = buildExportFileName(skin.name, 'json');
//       link.download = filename;
//       link.href = url;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       URL.revokeObjectURL(url);
//       showToast(`Exported ${filename}`);
//       if (callback) callback(payload);
//     };
//     img.src = skin.dataUrl;
//   }

//   function parseImportedFile(file) {
//     return new Promise((resolve, reject) => {
//       if (!file) return reject(new Error('No file selected.'));
//       const baseName = file.name.replace(/\.(png|json)$/i, '') || 'Imported Skin';

//       if (file.name.toLowerCase().endsWith('.json') || file.type === 'application/json') {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//           try {
//             const json = JSON.parse(e.target.result);
//             if (Array.isArray(json.pixels) && json.pixels.length === 64) {
//               const c = document.createElement('canvas');
//               c.width = 64;
//               c.height = 64;
//               const ctx = c.getContext('2d');
//               for (let y = 0; y < 64; y++) {
//                 for (let x = 0; x < 64; x++) {
//                   const col = json.pixels[y] && json.pixels[y][x];
//                   if (col) {
//                     ctx.fillStyle = col;
//                     ctx.fillRect(x, y, 1, 1);
//                   }
//                 }
//               }
//               return resolve({
//                 name: json.name || baseName,
//                 model: json.model === 'slim' ? 'slim' : 'classic',
//                 tags: json.tags || ['JSON Import'],
//                 dataUrl: c.toDataURL('image/png')
//               });
//             }
//             if (typeof json.dataUrl === 'string' && json.dataUrl.startsWith('data:image')) {
//               return resolve({
//                 name: json.name || baseName,
//                 model: json.model === 'slim' ? 'slim' : 'classic',
//                 tags: json.tags || ['JSON Import'],
//                 dataUrl: json.dataUrl
//               });
//             }
//             reject(new Error('Invalid skin JSON format.'));
//           } catch (err) {
//             reject(new Error('Could not parse JSON file.'));
//           }
//         };
//         reader.readAsText(file);
//       } else if (file.type.startsWith('image/')) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//           const img = new Image();
//           img.onload = function () {
//             const c = document.createElement('canvas');
//             c.width = 64;
//             c.height = 64;
//             const ctx = c.getContext('2d');
//             ctx.imageSmoothingEnabled = false;
//             if (img.width === 64 && img.height === 32) {
//               ctx.drawImage(img, 0, 0, 64, 32);
//               ctx.drawImage(img, 0, 16, 16, 16, 16, 48, 16, 16);
//               ctx.drawImage(img, 40, 16, 16, 16, 32, 48, 16, 16);
//             } else {
//               ctx.drawImage(img, 0, 0, 64, 64);
//             }
//             resolve({
//               name: baseName,
//               model: getSettings().defaultModel || 'classic',
//               tags: ['PNG Import'],
//               dataUrl: c.toDataURL('image/png')
//             });
//           };
//           img.onerror = () => reject(new Error('Invalid PNG image.'));
//           img.src = e.target.result;
//         };
//         reader.readAsDataURL(file);
//       } else {
//         reject(new Error('Unsupported file. Choose .PNG or .JSON.'));
//       }
//     });
//   }

//   function showToast(message) {
//     let container = document.querySelector('.toast-container');
//     if (!container) {
//       container = document.createElement('div');
//       container.className = 'toast-container';
//       document.body.appendChild(container);
//     }
//     const toast = document.createElement('div');
//     toast.className = 'toast';
//     toast.innerHTML = `<i class="ph-bold ph-check-circle"></i><span>${message}</span>`;
//     container.appendChild(toast);
//     setTimeout(() => {
//       toast.style.opacity = '0';
//       toast.style.transform = 'translateY(6px)';
//       toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
//       setTimeout(() => toast.remove(), 220);
//     }, 2600);
//   }

//   function initModals() {
//     document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
//       const sheet = backdrop.querySelector('.modal-sheet');
//       const dragZone = backdrop.querySelector('.sheet-drag-zone');

//       backdrop.addEventListener('click', (e) => {
//         if (e.target === backdrop) closeModal(backdrop.id);
//       });

//       backdrop.querySelectorAll('[data-close-modal]').forEach((btn) => {
//         btn.addEventListener('click', () => closeModal(backdrop.id));
//       });

//       if (sheet && dragZone) {
//         let startY = 0;
//         let currentY = 0;
//         let isDragging = false;

//         dragZone.addEventListener(
//           'touchstart',
//           (e) => {
//             if (window.innerWidth > 680) return;
//             startY = e.touches[0].clientY;
//             currentY = 0;
//             isDragging = true;
//             sheet.classList.add('dragging');
//           },
//           { passive: true }
//         );

//         dragZone.addEventListener(
//           'touchmove',
//           (e) => {
//             if (!isDragging) return;
//             const deltaY = e.touches[0].clientY - startY;
//             currentY = Math.max(0, deltaY);
//             sheet.style.transform = `translateY(${currentY}px)`;
//           },
//           { passive: true }
//         );

//         dragZone.addEventListener('touchend', () => {
//           if (!isDragging) return;
//           isDragging = false;
//           sheet.classList.remove('dragging');
//           if (currentY > 110) {
//             sheet.style.transform = '';
//             closeModal(backdrop.id);
//           } else {
//             sheet.style.transform = '';
//           }
//         });
//       }
//     });

//     document.addEventListener('keydown', (e) => {
//       if (e.key === 'Escape') {
//         document.querySelectorAll('.modal-backdrop.open').forEach((m) => closeModal(m.id));
//       }
//     });
//   }

//   function openModal(id) {
//     const el = document.getElementById(id);
//     if (!el) return;
//     const sheet = el.querySelector('.modal-sheet');
//     if (sheet) sheet.style.transform = '';
//     el.classList.add('open');
//     document.body.style.overflow = 'hidden';
//   }

//   function closeModal(id) {
//     const el = document.getElementById(id);
//     if (!el) return;
//     el.classList.remove('open');
//     document.body.style.overflow = '';
//   }

//   function timeAgo(timestamp) {
//     const diff = Math.max(1, Math.floor((Date.now() - timestamp) / 1000));
//     if (diff < 60) return 'Just now';
//     if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//     return `${Math.floor(diff / 86400)}d ago`;
//   }

//   window.SkinStudio = {
//     getSettings,
//     updateSettings,
//     resetSettings,
//     getSkins,
//     saveSkins,
//     getSkinById,
//     upsertSkin,
//     createNewSkin,
//     deleteSkin,
//     setActiveSkinId,
//     getActiveSkin,
//     createStarterSkinDataURL,
//     createBlankSkinDataURL,
//     renderSkinCharacterPreview,
//     exportSkinPNG,
//     exportSkinJSON,
//     parseImportedFile,
//     showToast,
//     openModal,
//     closeModal,
//     timeAgo
//   };

//   document.addEventListener('DOMContentLoaded', () => {
//     applyGlobalSettings();
//     ensureInitialized();
//     initModals();
//   });
// })();














/* script.js - Universal Skin Storage, Smart Built-In Sync (No Duplicates), Studio Settings & Modals */
(function () {
  const LIBRARY_KEY = 'craftvora_skins_v3';
  const ACTIVE_SKIN_KEY = 'craftvora_active_skin_id';
  const SETTINGS_KEY = 'craftvora_studio_settings_v1';

  const DEFAULT_SETTINGS = {
    defaultModel: 'classic',
    showGridByDefault: true,
    showUvGuidesByDefault: true,
    walkAnimByDefault: true,
    autoSaveEditor: true,
    reducedMotion: false,
    exportPrefix: 'craftvora',
    pixelShadeIntensity: 18
  };

  function getSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      return { ...DEFAULT_SETTINGS, ...saved };
    } catch (e) {
      return { ...DEFAULT_SETTINGS };
    }
  }

  function updateSettings(partial) {
    const next = { ...getSettings(), ...partial };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    applyGlobalSettings(next);
    return next;
  }

  function resetSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    applyGlobalSettings(DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS };
  }

  function applyGlobalSettings(settings = getSettings()) {
    document.body.classList.toggle('no-anim', !!settings.reducedMotion);
  }

  // Deterministic fingerprint of a skins.js entry so edits in skins.js update in-place
  function computeBuiltInHash(cfg) {
    return JSON.stringify({
      type: cfg.type || 'preset',
      name: cfg.name || '',
      model: cfg.model || 'classic',
      tags: cfg.tags || [],
      colors: cfg.colors || null,
      extraPixels: cfg.extraPixels || null,
      src: cfg.src || ''
    });
  }

  function createStarterSkinDataURL(variant = 'emerald') {
    if (window.BuiltInSkins) {
      const found = window.BuiltInSkins.list.find(
        (s) => s.id && s.id.includes(variant) && s.type === 'preset'
      );
      if (found) return window.BuiltInSkins.buildPresetDataURL(found);
      return window.BuiltInSkins.buildPresetDataURL({});
    }
    return createBlankSkinDataURL();
  }

  function createBlankSkinDataURL() {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    return c.toDataURL('image/png');
  }

  function getSkins() {
    let skins = [];
    try {
      skins = JSON.parse(localStorage.getItem(LIBRARY_KEY) || '[]');
    } catch (e) {
      skins = [];
    }

    // First-time seed with preset skins from skins.js
    if ((!Array.isArray(skins) || skins.length === 0) && window.BuiltInSkins) {
      const rawList = window.BuiltInSkins.list || [];
      skins = rawList
        .filter((item) => item.type !== 'image')
        .map((item, idx) => ({
          id: item.id || `builtin_${idx}`,
          name: item.name || `Built-in Skin #${idx + 1}`,
          model: item.model === 'slim' ? 'slim' : 'classic',
          tags: Array.isArray(item.tags) ? item.tags : ['Built-in'],
          builtIn: true,
          userModified: false,
          builtInHash: computeBuiltInHash(item),
          updatedAt: Date.now() - idx * 60000,
          dataUrl: window.BuiltInSkins.buildPresetDataURL(item)
        }));
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(skins));
    }
    return skins;
  }

  /**
   * Smart Built-In Sync:
   * - Adds new entries from skins.js
   * - Updates existing built-ins in-place when you edit skins.js (no duplicates!)
   * - Preserves manual edits made by the user in the UI/Editor
   * - Removes deleted built-ins that were never modified by the user
   */
  async function syncBuiltInSkins() {
    if (!window.BuiltInSkins) return getSkins();

    const rawConfigs = window.BuiltInSkins.list || [];
    const resolvedBuiltIns = await window.BuiltInSkins.loadAll();
    const current = getSkins();

    // Map config hashes by ID
    const configById = new Map();
    rawConfigs.forEach((cfg, idx) => {
      const id = cfg.id || `builtin_${idx}`;
      configById.set(id, cfg);
    });

    const validBuiltInIds = new Set(resolvedBuiltIns.map((b) => b.id));
    let changed = false;

    // 1. Remove stale unmodified built-in skins that were removed/renamed in skins.js
    const nextSkins = current.filter((skin) => {
      if (skin.builtIn && !validBuiltInIds.has(skin.id)) {
        if (skin.userModified) {
          // Keep user-edited version as a regular custom skin
          skin.builtIn = false;
          changed = true;
          return true;
        }
        changed = true;
        return false;
      }
      return true;
    });

    // 2. Insert new or update existing built-in skins in-place
    resolvedBuiltIns.forEach((bSkin) => {
      const rawCfg = configById.get(bSkin.id) || bSkin;
      const newHash = computeBuiltInHash(rawCfg);
      const existingIdx = nextSkins.findIndex((s) => s.id === bSkin.id);

      if (existingIdx === -1) {
        nextSkins.push({
          ...bSkin,
          builtIn: true,
          userModified: false,
          builtInHash: newHash
        });
        changed = true;
      } else {
        const existing = nextSkins[existingIdx];
        // Update if skins.js changed (hash mismatch) and user hasn't manually overridden it
        if (existing.builtInHash !== newHash && !existing.userModified) {
          nextSkins[existingIdx] = {
            ...existing,
            name: bSkin.name,
            model: bSkin.model,
            tags: bSkin.tags,
            dataUrl: bSkin.dataUrl,
            builtIn: true,
            builtInHash: newHash,
            updatedAt: Date.now()
          };
          changed = true;
        }
      }
    });

    if (changed) {
      saveSkins(nextSkins);
      window.dispatchEvent(new CustomEvent('skinsupdated'));
    }
    return nextSkins;
  }

  function saveSkins(list) {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(list));
  }

  function getSkinById(id) {
    return getSkins().find((s) => s.id === id) || null;
  }

  function upsertSkin(skinObj) {
    const skins = getSkins();
    const idx = skinObj.id ? skins.findIndex((s) => s.id === skinObj.id) : -1;
    const existing = idx >= 0 ? skins[idx] : null;

    const record = {
      id: existing ? existing.id : 'skin_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      name: (skinObj.name || 'Untitled Skin').trim(),
      model: skinObj.model === 'slim' ? 'slim' : 'classic',
      tags: Array.isArray(skinObj.tags) ? skinObj.tags : ['Custom'],
      builtIn: existing ? !!existing.builtIn : false,
      userModified: existing && existing.builtIn ? true : !!(existing && existing.userModified),
      builtInHash: existing ? existing.builtInHash : undefined,
      updatedAt: Date.now(),
      dataUrl: skinObj.dataUrl || createStarterSkinDataURL('emerald')
    };

    if (idx >= 0) {
      skins[idx] = { ...existing, ...record };
    } else {
      skins.unshift(record);
    }
    saveSkins(skins);
    return record;
  }

  function createNewSkin({ name, model, base } = {}) {
    const settings = getSettings();
    const chosenModel = model || settings.defaultModel || 'classic';
    const count = getSkins().length + 1;
    const finalName = (name && name.trim()) || `New Skin #${count}`;

    let dataUrl;
    if (base === 'blank' || !base) {
      dataUrl = createBlankSkinDataURL();
    } else {
      dataUrl = createStarterSkinDataURL(base);
    }

    const created = upsertSkin({
      id: null,
      name: finalName,
      model: chosenModel,
      tags: ['New'],
      dataUrl
    });

    setActiveSkinId(created.id);
    return created;
  }

  function deleteSkin(id) {
    const skins = getSkins().filter((s) => s.id !== id);
    saveSkins(skins);
    if (localStorage.getItem(ACTIVE_SKIN_KEY) === id && skins[0]) {
      setActiveSkinId(skins[0].id);
    }
  }

  function setActiveSkinId(id) {
    localStorage.setItem(ACTIVE_SKIN_KEY, id);
  }

  function getActiveSkin() {
    const id = localStorage.getItem(ACTIVE_SKIN_KEY);
    const skins = getSkins();
    return skins.find((s) => s.id === id) || skins[0];
  }

  function renderSkinCharacterPreview(canvas, dataUrl, model = 'classic') {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function () {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = false;

      const scale = Math.max(2, Math.floor(Math.min(w / 22, h / 36)));
      const armW = model === 'slim' ? 3 : 4;
      const cx = Math.floor(w / 2);
      const topY = Math.floor((h - 32 * scale) / 2);

      ctx.fillStyle = 'rgba(20, 35, 28, 0.14)';
      ctx.beginPath();
      ctx.ellipse(cx, topY + 32 * scale, 7 * scale, 2 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.drawImage(img, 8, 8, 8, 8, cx - 4 * scale, topY, 8 * scale, 8 * scale);
      ctx.drawImage(img, 40, 8, 8, 8, cx - 4 * scale, topY, 8 * scale, 8 * scale);

      ctx.drawImage(img, 20, 20, 8, 12, cx - 4 * scale, topY + 8 * scale, 8 * scale, 12 * scale);
      ctx.drawImage(img, 20, 36, 8, 12, cx - 4 * scale, topY + 8 * scale, 8 * scale, 12 * scale);

      ctx.drawImage(img, 44, 20, armW, 12, cx - (4 + armW) * scale, topY + 8 * scale, armW * scale, 12 * scale);
      ctx.drawImage(img, 44, 36, armW, 12, cx - (4 + armW) * scale, topY + 8 * scale, armW * scale, 12 * scale);

      ctx.drawImage(img, 36, 52, armW, 12, cx + 4 * scale, topY + 8 * scale, armW * scale, 12 * scale);
      ctx.drawImage(img, 52, 52, armW, 12, cx + 4 * scale, topY + 8 * scale, armW * scale, 12 * scale);

      ctx.drawImage(img, 4, 20, 4, 12, cx - 4 * scale, topY + 20 * scale, 4 * scale, 12 * scale);
      ctx.drawImage(img, 4, 36, 4, 12, cx - 4 * scale, topY + 20 * scale, 4 * scale, 12 * scale);

      ctx.drawImage(img, 20, 52, 4, 12, cx, topY + 20 * scale, 4 * scale, 12 * scale);
      ctx.drawImage(img, 4, 52, 4, 12, cx, topY + 20 * scale, 4 * scale, 12 * scale);
    };
    img.src = dataUrl;
  }

  function buildExportFileName(skinName, ext) {
    const prefix = (getSettings().exportPrefix || '').trim();
    const cleanBase = (skinName || 'minecraft-skin').toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
    return prefix ? `${prefix}-${cleanBase}.${ext}` : `${cleanBase}.${ext}`;
  }

  function exportSkinPNG(skin) {
    const link = document.createElement('a');
    const filename = buildExportFileName(skin.name, 'png');
    link.download = filename;
    link.href = skin.dataUrl;
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast(`Exported ${filename}`);
  }

  function exportSkinJSON(skin, callback) {
    const img = new Image();
    img.onload = function () {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, 64, 64);
      const imgData = ctx.getImageData(0, 0, 64, 64).data;

      const pixels = [];
      for (let y = 0; y < 64; y++) {
        const row = [];
        for (let x = 0; x < 64; x++) {
          const i = (y * 64 + x) * 4;
          const a = imgData[i + 3];
          if (a === 0) {
            row.push(null);
          } else {
            const hex =
              '#' +
              [imgData[i], imgData[i + 1], imgData[i + 2]]
                .map((v) => v.toString(16).padStart(2, '0'))
                .join('') +
              (a < 255 ? a.toString(16).padStart(2, '0') : '');
            row.push(hex);
          }
        }
        pixels.push(row);
      }

      const payload = {
        format: 'craftvora-minecraft-skin-v1',
        name: skin.name,
        model: skin.model || 'classic',
        tags: skin.tags || [],
        width: 64,
        height: 64,
        exportedAt: new Date().toISOString(),
        dataUrl: skin.dataUrl,
        pixels
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const filename = buildExportFileName(skin.name, 'json');
      link.download = filename;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      showToast(`Exported ${filename}`);
      if (callback) callback(payload);
    };
    img.src = skin.dataUrl;
  }

  function parseImportedFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error('No file selected.'));
      const baseName = file.name.replace(/\.(png|json)$/i, '') || 'Imported Skin';

      if (file.name.toLowerCase().endsWith('.json') || file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = function (e) {
          try {
            const json = JSON.parse(e.target.result);
            if (Array.isArray(json.pixels) && json.pixels.length === 64) {
              const c = document.createElement('canvas');
              c.width = 64;
              c.height = 64;
              const ctx = c.getContext('2d');
              for (let y = 0; y < 64; y++) {
                for (let x = 0; x < 64; x++) {
                  const col = json.pixels[y] && json.pixels[y][x];
                  if (col) {
                    ctx.fillStyle = col;
                    ctx.fillRect(x, y, 1, 1);
                  }
                }
              }
              return resolve({
                name: json.name || baseName,
                model: json.model === 'slim' ? 'slim' : 'classic',
                tags: json.tags || ['JSON Import'],
                dataUrl: c.toDataURL('image/png')
              });
            }
            if (typeof json.dataUrl === 'string' && json.dataUrl.startsWith('data:image')) {
              return resolve({
                name: json.name || baseName,
                model: json.model === 'slim' ? 'slim' : 'classic',
                tags: json.tags || ['JSON Import'],
                dataUrl: json.dataUrl
              });
            }
            reject(new Error('Invalid skin JSON format.'));
          } catch (err) {
            reject(new Error('Could not parse JSON file.'));
          }
        };
        reader.readAsText(file);
      } else if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            const c = document.createElement('canvas');
            c.width = 64;
            c.height = 64;
            const ctx = c.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            if (img.width === 64 && img.height === 32) {
              ctx.drawImage(img, 0, 0, 64, 32);
              ctx.drawImage(img, 0, 16, 16, 16, 16, 48, 16, 16);
              ctx.drawImage(img, 40, 16, 16, 16, 32, 48, 16, 16);
            } else {
              ctx.drawImage(img, 0, 0, 64, 64);
            }
            resolve({
              name: baseName,
              model: getSettings().defaultModel || 'classic',
              tags: ['PNG Import'],
              dataUrl: c.toDataURL('image/png')
            });
          };
          img.onerror = () => reject(new Error('Invalid PNG image.'));
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        reject(new Error('Unsupported file. Choose .PNG or .JSON.'));
      }
    });
  }

  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="ph-bold ph-check-circle"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';
      toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      setTimeout(() => toast.remove(), 220);
    }, 2600);
  }

  function initModals() {
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      const sheet = backdrop.querySelector('.modal-sheet');
      const dragZone = backdrop.querySelector('.sheet-drag-zone');

      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal(backdrop.id);
      });

      backdrop.querySelectorAll('[data-close-modal]').forEach((btn) => {
        btn.addEventListener('click', () => closeModal(backdrop.id));
      });

      if (sheet && dragZone) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        dragZone.addEventListener(
          'touchstart',
          (e) => {
            if (window.innerWidth > 680) return;
            startY = e.touches[0].clientY;
            currentY = 0;
            isDragging = true;
            sheet.classList.add('dragging');
          },
          { passive: true }
        );

        dragZone.addEventListener(
          'touchmove',
          (e) => {
            if (!isDragging) return;
            const deltaY = e.touches[0].clientY - startY;
            currentY = Math.max(0, deltaY);
            sheet.style.transform = `translateY(${currentY}px)`;
          },
          { passive: true }
        );

        dragZone.addEventListener('touchend', () => {
          if (!isDragging) return;
          isDragging = false;
          sheet.classList.remove('dragging');
          if (currentY > 110) {
            sheet.style.transform = '';
            closeModal(backdrop.id);
          } else {
            sheet.style.transform = '';
          }
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach((m) => closeModal(m.id));
      }
    });
  }

  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const sheet = el.querySelector('.modal-sheet');
    if (sheet) sheet.style.transform = '';
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    document.body.style.overflow = '';
  }

  function timeAgo(timestamp) {
    const diff = Math.max(1, Math.floor((Date.now() - timestamp) / 1000));
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  window.SkinStudio = {
    getSettings,
    updateSettings,
    resetSettings,
    getSkins,
    syncBuiltInSkins,
    saveSkins,
    getSkinById,
    upsertSkin,
    createNewSkin,
    deleteSkin,
    setActiveSkinId,
    getActiveSkin,
    createStarterSkinDataURL,
    createBlankSkinDataURL,
    renderSkinCharacterPreview,
    exportSkinPNG,
    exportSkinJSON,
    parseImportedFile,
    showToast,
    openModal,
    closeModal,
    timeAgo
  };

  document.addEventListener('DOMContentLoaded', () => {
    applyGlobalSettings();
    getSkins();
    syncBuiltInSkins();
    initModals();
  });
})();