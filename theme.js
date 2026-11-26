// /* theme.js - Universal Light / Dark / System Theme Controller */
// (function () {
//   const STORAGE_KEY = 'craftvora_theme';
//   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

//   function getStoredTheme() {
//     return localStorage.getItem(STORAGE_KEY) || 'system';
//   }

//   function resolveTheme(preference) {
//     if (preference === 'system') {
//       return mediaQuery.matches ? 'dark' : 'light';
//     }
//     return preference;
//   }

//   function applyTheme(preference) {
//     const resolved = resolveTheme(preference);
//     document.documentElement.setAttribute('data-theme', resolved);
//     document.documentElement.setAttribute('data-theme-pref', preference);
//     localStorage.setItem(STORAGE_KEY, preference);

//     // Update any theme toggle buttons on the page
//     document.querySelectorAll('[data-theme-option]').forEach((btn) => {
//       const isActive = btn.getAttribute('data-theme-option') === preference;
//       btn.classList.toggle('active', isActive);
//       btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
//     });

//     window.dispatchEvent(
//       new CustomEvent('themechange', { detail: { preference, resolved } })
//     );
//   }

//   // Apply immediately before first paint
//   applyTheme(getStoredTheme());

//   // Listen for OS system theme changes
//   mediaQuery.addEventListener('change', () => {
//     if (getStoredTheme() === 'system') {
//       applyTheme('system');
//     }
//   });

//   // Expose global API
//   window.ThemeManager = {
//     getPreference: getStoredTheme,
//     getResolved: () => resolveTheme(getStoredTheme()),
//     setTheme: applyTheme,
//     cycleTheme: function () {
//       const order = ['light', 'dark', 'system'];
//       const next = order[(order.indexOf(getStoredTheme()) + 1) % order.length];
//       applyTheme(next);
//     }
//   };

//   document.addEventListener('DOMContentLoaded', () => {
//     applyTheme(getStoredTheme());
//     document.querySelectorAll('[data-theme-option]').forEach((btn) => {
//       btn.addEventListener('click', () => {
//         applyTheme(btn.getAttribute('data-theme-option'));
//       });
//     });
//   });
// })();













/* theme.js - Universal Light / iOS Dark / System Auto Theme & Navbar Submenu Controller */
(function () {
  const STORAGE_KEY = 'craftvora_theme';
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'system';
  }

  function resolveTheme(preference) {
    if (preference === 'system') {
      return mediaQuery.matches ? 'dark' : 'light';
    }
    return preference;
  }

  function updateThemeUI(preference, resolved) {
    document.querySelectorAll('[data-theme-option]').forEach((el) => {
      const isActive = el.getAttribute('data-theme-option') === preference;
      el.classList.toggle('active', isActive);
      el.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    const navIcon = document.getElementById('navThemeCurrentIcon');
    if (navIcon) {
      if (preference === 'system') {
        navIcon.className = 'ri-contrast-2-line';
      } else if (resolved === 'dark') {
        navIcon.className = 'ph-bold ph-moon-stars';
      } else {
        navIcon.className = 'ph-bold ph-sun';
      }
    }
  }

  function applyTheme(preference) {
    const resolved = resolveTheme(preference);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.setAttribute('data-theme-pref', preference);
    localStorage.setItem(STORAGE_KEY, preference);
    updateThemeUI(preference, resolved);

    window.dispatchEvent(
      new CustomEvent('themechange', { detail: { preference, resolved } })
    );
  }

  // Apply immediately before first paint to eliminate flicker
  applyTheme(getStoredTheme());

  mediaQuery.addEventListener('change', () => {
    if (getStoredTheme() === 'system') {
      applyTheme('system');
    }
  });

  window.ThemeManager = {
    getPreference: getStoredTheme,
    getResolved: () => resolveTheme(getStoredTheme()),
    setTheme: applyTheme
  };

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getStoredTheme());

    // Bind all theme buttons (navbar dropdown + settings page cards)
    document.querySelectorAll('[data-theme-option]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        applyTheme(btn.getAttribute('data-theme-option'));
        const menu = document.getElementById('themeDropdownMenu');
        if (menu) menu.classList.remove('open');
      });
    });

    // Navbar Theme Icon Submenu Dropdown
    const trigger = document.getElementById('themeDropdownTrigger');
    const menu = document.getElementById('themeDropdownMenu');
    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== trigger) {
          menu.classList.remove('open');
        }
      });
    }
  });
})();