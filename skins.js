/* ==========================================================================
   skins.js — Easy Built-In Skins Registry (Image Files + Code Presets)
   Include this file BEFORE script.js in your HTML pages:
     <script src="skins.js"></script>
     <script src="script.js"></script>
   ========================================================================== */
(function () {
  /**
   * ADD YOUR BUILT-IN SKINS HERE!
   * You have 2 easy types:
   *
   * 1) type: 'image'  -> Point `src` to any local PNG file (e.g. 'assets/skins/my-skin.png')
   *                      or a Base64 data URL. The site automatically converts it to 64x64!
   *
   * 2) type: 'preset' -> Pure code skin! Just pick 6 hex colors (or add `extraPixels` for details).
   */
  const BUILT_IN_SKINS = [
    // --- TYPE 2: CODE PRESET SKINS (Zero external files needed) ---
    // {
    //   id: 'builtin_emerald_warden',
    //   type: 'preset',
    //   name: 'Emerald Warden',
    //   model: 'classic', // 'classic' (4px arms) or 'slim' (3px arms)
    //   tags: ['Built-in', 'Studio'],
    //   colors: {
    //     hair: '#153224',
    //     skin: '#f3c5a2',
    //     eye: '#1b6b36',
    //     shirt: '#30d158',
    //     pants: '#1c1c1e',
    //     shoes: '#0a0a0c'
    //   }
    // },
    // {
    //   id: 'builtin_classic_explorer',
    //   type: 'preset',
    //   name: 'Classic Explorer',
    //   model: 'classic',
    //   tags: ['Built-in', 'Starter'],
    //   colors: {
    //     hair: '#3b2718',
    //     skin: '#f0b892',
    //     eye: '#3b2fa3',
    //     shirt: '#14a3a8',
    //     pants: '#34449c',
    //     shoes: '#595959'
    //   }
    // },
    // {
    //   id: 'builtin_iron_vanguard',
    //   type: 'preset',
    //   name: 'Iron Vanguard',
    //   model: 'slim',
    //   tags: ['Built-in', 'Armor'],
    //   colors: {
    //     hair: '#525b66',
    //     skin: '#eab38f',
    //     eye: '#ff9f0a',
    //     shirt: '#8d99ae',
    //     pants: '#4a5568',
    //     shoes: '#2d3748'
    //   }
    // },
        ,{
      id: 'builtin_my_custom_png',
      type: 'image',
      name: 'Egyptian King',
      model: 'slim',
      tags: ['Built-in'],
      src: 'images/egyptianking.png' // Put your .png file path or data:image/png;base64,... here
    },
        ,{
      id: 'builtin_steve',
      type: 'image',
      name: 'Steve',
      model: 'classic',
      tags: ['Built-in'],
      src: 'skins/steve.png' // Put your .png file path or data:image/png;base64,... here
    },
        ,{
      id: 'builtin_herobrine',
      type: 'image',
      name: 'Herobrine',
      model: 'classic',
      tags: ['Built-in'],
      src: 'skins/herobrine.png' // Put your .png file path or data:image/png;base64,... here
    },
    // {
    //   id: 'builtin_crimson_samurai',
    //   type: 'preset',
    //   name: 'Crimson Samurai',
    //   model: 'slim',
    //   tags: ['Built-in', 'PvP'],
    //   colors: {
    //     hair: '#1a1a1d',
    //     skin: '#f2c19d',
    //     eye: '#ff375f',
    //     shirt: '#c92a3e',
    //     pants: '#2b2d42',
    //     shoes: '#111113'
    //   },
    //   // Optional: paint custom pixels (x, y, width, height, color) on Base or Hat/Jacket overlay!
    //   extraPixels: [
    //     { x: 40, y: 10, w: 8, h: 1, color: '#ffd60a' }, // Gold headband on Hat overlay
    //     { x: 23, y: 20, w: 2, h: 12, color: '#ffd60a' } // Gold belt/trim on Torso
    //   ]
    // }

    // --- TYPE 1: IMAGE FILE SKINS (Uncomment & point `src` to your PNG file!) ---
    /*
    ,{
      id: 'builtin_my_custom_png',
      type: 'image',
      name: 'Shadow Ninja',
      model: 'slim',
      tags: ['Built-in', 'Custom PNG'],
      src: 'assets/skins/shadow-ninja.png' // Put your .png file path or data:image/png;base64,... here
    }
    */
  ];

  // Builds a 64x64 DataURL from a Type 2 'preset' config
  function buildPresetDataURL(skinConfig) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const p = Object.assign(
      {
        hair: '#3b2718',
        skin: '#f0b892',
        eye: '#3b2fa3',
        shirt: '#14a3a8',
        pants: '#34449c',
        shoes: '#595959'
      },
      skinConfig.colors || {}
    );

    const fill = (x, y, w, h, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    };

    // Head (8x8x8)
    fill(8, 0, 8, 8, p.hair);
    fill(16, 0, 8, 8, p.skin);
    fill(0, 8, 8, 8, p.hair);
    fill(8, 8, 8, 8, p.skin);
    fill(16, 8, 8, 8, p.hair);
    fill(24, 8, 8, 8, p.hair);
    fill(8, 8, 8, 2, p.hair);
    fill(9, 12, 1, 1, '#ffffff');
    fill(10, 12, 1, 1, p.eye);
    fill(13, 12, 1, 1, p.eye);
    fill(14, 12, 1, 1, '#ffffff');
    fill(11, 14, 2, 1, '#b87654');

    // Torso (8x12x4)
    fill(20, 16, 8, 4, p.shirt);
    fill(28, 16, 8, 4, p.shirt);
    fill(16, 20, 4, 12, p.shirt);
    fill(20, 20, 8, 12, p.shirt);
    fill(28, 20, 4, 12, p.shirt);
    fill(32, 20, 8, 12, p.shirt);

    // Right Arm (4x12x4)
    fill(44, 16, 4, 4, p.shirt);
    fill(48, 16, 4, 4, p.skin);
    fill(40, 20, 16, 4, p.shirt);
    fill(40, 24, 16, 8, p.skin);

    // Left Arm (4x12x4)
    fill(36, 48, 4, 4, p.shirt);
    fill(40, 48, 4, 4, p.skin);
    fill(32, 52, 16, 4, p.shirt);
    fill(32, 56, 16, 8, p.skin);

    // Right Leg (4x12x4)
    fill(4, 16, 4, 4, p.pants);
    fill(8, 16, 4, 4, p.shoes);
    fill(0, 20, 16, 10, p.pants);
    fill(0, 30, 16, 2, p.shoes);

    // Left Leg (4x12x4)
    fill(20, 48, 4, 4, p.pants);
    fill(24, 48, 4, 4, p.shoes);
    fill(16, 52, 16, 10, p.pants);
    fill(16, 62, 16, 2, p.shoes);

    // Apply any optional pixel details
    if (Array.isArray(skinConfig.extraPixels)) {
      skinConfig.extraPixels.forEach((px) => {
        fill(px.x, px.y, px.w || 1, px.h || 1, px.color);
      });
    }

    return canvas.toDataURL('image/png');
  }

  // Loads a Type 1 'image' path/URL and converts it into a clean 64x64 DataURL
  function convertImageToSkinDataURL(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        // Auto-upgrade legacy 64x32 Minecraft skins to 64x64
        if (img.width === 64 && img.height === 32) {
          ctx.drawImage(img, 0, 0, 64, 32);
          ctx.drawImage(img, 0, 16, 16, 16, 16, 48, 16, 16);
          ctx.drawImage(img, 40, 16, 16, 16, 32, 48, 16, 16);
        } else {
          ctx.drawImage(img, 0, 0, 64, 64);
        }
        resolve(c.toDataURL('image/png'));
      };
      img.onerror = () => reject(new Error(`Failed to load built-in skin image: ${src}`));
      img.src = src;
    });
  }

  // Resolves all BUILT_IN_SKINS into ready-to-save library objects
  async function loadAllBuiltInSkins() {
    const resolved = [];
    for (let i = 0; i < BUILT_IN_SKINS.length; i++) {
      const item = BUILT_IN_SKINS[i];
      try {
        const dataUrl =
          item.type === 'image'
            ? await convertImageToSkinDataURL(item.src)
            : buildPresetDataURL(item);

        resolved.push({
          id: item.id || `builtin_${i}`,
          name: item.name || `Built-in Skin #${i + 1}`,
          model: item.model === 'slim' ? 'slim' : 'classic',
          tags: Array.isArray(item.tags) ? item.tags : ['Built-in'],
          builtIn: true,
          updatedAt: Date.now() - i * 60000,
          dataUrl
        });
      } catch (err) {
        console.warn('[Craftvora BuiltInSkins]', err.message);
      }
    }
    return resolved;
  }

  // Expose simple global helper so you can also register skins dynamically anywhere
  window.BuiltInSkins = {
    list: BUILT_IN_SKINS,
    buildPresetDataURL,
    convertImageToSkinDataURL,
    loadAll: loadAllBuiltInSkins,
    register: function (skinConfig) {
      BUILT_IN_SKINS.push(skinConfig);
    }
  };
})();
