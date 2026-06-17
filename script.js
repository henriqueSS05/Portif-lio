/* ==========================================
   CONFIGURAÇÕES GERAIS
========================================== */

/**
 * CONFIG — valores centralizados para fácil manutenção.
 * Altere FULL_NAME e CONTACT_WHATSAPP conforme seu portfólio.
 */
const CONFIG = Object.freeze({
  /* ── Identidade ─────────────────────────────────────────────── */
  FULL_NAME:               "HENRIQUE SOARES",   // exibido no efeito de digitação

  /* ── Tema ────────────────────────────────────────────────────── */
  DEFAULT_THEME:           "dark",    // "dark" | "light"
  STORAGE_KEY_THEME:       "portfolio-theme",
  STORAGE_KEY_LANG:        "portfolio-lang",

  /* ── Header ──────────────────────────────────────────────────── */
  SCROLL_THRESHOLD:        50,        // px para adicionar classe "scrolled" no header
  SCROLL_TOP_THRESHOLD:    300,       // px para exibir botão "voltar ao topo"

  /* ── Typing ──────────────────────────────────────────────────── */
  TYPING_PAUSE_FULL_MS:    2800,      // pausa após digitação completa
  TYPING_PAUSE_EMPTY_MS:   600,       // pausa após apagar tudo
  TYPING_GLITCH_DELAY_MS:  400,       // delay até glitch após completar
  GLITCH_INTERVAL_MS:      8000,      // intervalo do glitch periódico
  GLITCH_CHARS:            "!<>-_\\/[]{}—=+*^?#░▒▓",

  /* ── Carrossel ────────────────────────────────────────────────── */
  CAROUSEL_SWIPE_THRESHOLD:     60,   // px mínimos para swipe
  CAROUSEL_RESIZE_DEBOUNCE_MS:  200,

  /* ── Formulário ──────────────────────────────────────────────── */
  // Altere para o número do WhatsApp que receberá as mensagens (formato: 5511999999999)
  CONTACT_WHATSAPP:        "5500000000000",
});


/* ==========================================
   SELETORES GLOBAIS
========================================== */

/**
 * DOM — todos os seletores centralizados.
 * Seletores inexistentes retornam null sem causar erros.
 */
const DOM = Object.freeze({
  /* Header */
  header:           document.getElementById("header"),
  scrollTopBtn:     document.getElementById("scrollTop"),

  /* Menu Mobile */
  mobileMenuBtn:    document.getElementById("mobileMenuBtn"),
  mobileMenu:       document.getElementById("mobileMenu"),

  /* Tema */
  themeToggle:      document.getElementById("themeToggle"),
  themeIcon:        document.getElementById("themeIcon"),

  /* Idioma */
  langBtn:          document.getElementById("langBtn"),
  langDropdown:     document.getElementById("langDropdown"),
  currentLang:      document.getElementById("currentLang"),

  /* Hero */
  typingName:       document.getElementById("typingName"),
  typingCursor:     document.getElementById("typingCursor"),
  cyberFrame:       document.getElementById("cyberFrame"),

  /* Carrossel de projetos */
  projectStage:     document.getElementById("projectsStage"),
  projectPrev:      document.getElementById("projectPrev"),
  projectNext:      document.getElementById("projectNext"),
  carouselDots:     document.getElementById("carouselDots"),

  /* Modal de projeto */
  projectModal:     document.getElementById("projectModal"),
  pmodalClose:      document.getElementById("pmodalClose"),
  pmodalCat:        document.getElementById("pmodalCat"),
  pmodalTitle:      document.getElementById("pmodalTitle"),
  pmodalTags:       document.getElementById("pmodalTags"),
  pmodalMedia:      document.getElementById("pmodalMedia"),
  pmodalDesc:       document.getElementById("pmodalDesc"),
  pmodalDetails:    document.getElementById("pmodalDetails"),
  pmodalDeploy:     document.getElementById("pmodalDeploy"),
  pmodalGithub:     document.getElementById("pmodalGithub"),

  /* Formulário de contato */
  budgetForm:       document.getElementById("budgetForm"),

  /* Cursor personalizado */
  cursorDot:        document.getElementById("cursorDot"),
  cursorOutline:    document.getElementById("cursorOutline"),

  /* Partículas de fundo */
  particlesBg:      document.getElementById("particlesBg"),

  /* Seção de contato (parallax de fundo) */
  contactSection:   document.querySelector(".contact-section"),
});


/* ==========================================
   MENU MOBILE
========================================== */

/** Fecha o menu mobile e restaura atributos de acessibilidade. */
function closeMobileMenu() {
  const { mobileMenu: menu, mobileMenuBtn: btn } = DOM;
  if (!menu || !btn) return;
  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");
  btn.classList.remove("open");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "Abrir menu de navegação");
}

function initMobileMenu() {
  const { mobileMenuBtn: btn, mobileMenu: menu } = DOM;
  if (!btn || !menu) return;

  /* Alterna abertura / fechamento */
  btn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      menu.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      btn.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Fechar menu de navegação");
    }
  });

  /* Fecha ao pressionar Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      closeMobileMenu();
      btn.focus();
    }
  });

  /* Fecha ao clicar fora do menu */
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* Fecha ao clicar em qualquer link do menu mobile */
  menu.querySelectorAll(".mobile-link, .mobile-cta").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}


/* ==========================================
   NAVEGAÇÃO SUAVE
========================================== */

function initSmoothScroll() {
  const { header, scrollTopBtn } = DOM;

  /* Botão "voltar ao topo" */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Todos os links âncora (#secao) */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 72;
      const targetTop    = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: targetTop, behavior: "smooth" });

      /* Fecha menu mobile se estiver aberto */
      closeMobileMenu();
    });
  });
}


/* ==========================================
   HEADER SCROLL
========================================== */

function initHeader() {
  const { header, scrollTopBtn } = DOM;

  /* Sincroniza estado do header e botão de voltar ao topo */
  function syncHeaderState() {
    const scrolled = window.scrollY > CONFIG.SCROLL_THRESHOLD;
    const showBtn  = window.scrollY > CONFIG.SCROLL_TOP_THRESHOLD;
    if (header)       header.classList.toggle("scrolled", scrolled);
    if (scrollTopBtn) scrollTopBtn.classList.toggle("visible", showBtn);
  }

  window.addEventListener("scroll", syncHeaderState, { passive: true });
  syncHeaderState();

  /* Links de nav ativos via IntersectionObserver */
  const sections = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add("active");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach((section) => observer.observe(section));
}


/* ==========================================
   BOTÃO VOLTAR AO TOPO
   (controlado em conjunto com initHeader)
========================================== */
// A visibilidade do botão #scrollTop é gerenciada por syncHeaderState() em initHeader().
// O clique é registrado em initSmoothScroll().


/* ==========================================
   ANIMAÇÕES AO SCROLL
========================================== */

/**
 * Revela elementos marcados com [data-reveal] ao entrarem no viewport.
 * Respeita prefers-reduced-motion.
 */
function initReveal() {
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (!revealEls.length) return;

  /* Se o usuário prefere menos movimento, revela tudo imediatamente */
  if (Utils.prefersReducedMotion()) {
    revealEls.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el) => observer.observe(el));
}


/* ==========================================
   FORMULÁRIO DE CONTATO
========================================== */

/**
 * Valida e envia o formulário de contato via WhatsApp.
 * O número de destino é definido em CONFIG.CONTACT_WHATSAPP.
 */
function initBudgetForm() {
  const { budgetForm: form } = DOM;
  if (!form) return;

  /**
   * Exibe uma mensagem de erro inline em um campo.
   * @param {string} fieldId  — id do input
   * @param {string} errorId  — id do elemento de erro
   * @param {string} message  — texto do erro
   */
  function showFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add("invalid");
    if (error) error.textContent = message;
  }

  /**
   * Remove a mensagem de erro inline de um campo.
   * @param {string} fieldId — id do input
   * @param {string} errorId — id do elemento de erro
   */
  function clearFieldError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.remove("invalid");
    if (error) error.textContent = "";
  }

  /* Mapa de campos obrigatórios → ids de erro */
  const errorMap = {
    inputName:    "errorName",
    inputPhone:   "errorPhone",
    inputMessage: "errorMessage",
  };

  /* Limpa erros em tempo real enquanto o usuário digita */
  Object.keys(errorMap).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", () => clearFieldError(id, errorMap[id]));
  });

  /* Submissão do formulário */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome     = document.getElementById("inputName")?.value.trim()    || "";
    const empresa  = document.getElementById("inputCompany")?.value.trim() || "";
    const telefone = document.getElementById("inputPhone")?.value.trim()   || "";
    const projeto  = document.getElementById("inputMessage")?.value.trim() || "";

    let isValid = true;

    if (!nome || nome.length < 2) {
      showFieldError("inputName", "errorName", "Por favor, informe seu nome completo.");
      isValid = false;
    } else {
      clearFieldError("inputName", "errorName");
    }

    if (!telefone || telefone.replace(/\D/g, "").length < 10) {
      showFieldError("inputPhone", "errorPhone", "Informe um WhatsApp válido com DDD.");
      isValid = false;
    } else {
      clearFieldError("inputPhone", "errorPhone");
    }

    if (!projeto || projeto.length < 10) {
      showFieldError("inputMessage", "errorMessage", "Descreva seu projeto em pelo menos 10 caracteres.");
      isValid = false;
    } else {
      clearFieldError("inputMessage", "errorMessage");
    }

    if (!isValid) return;

    /* Monta mensagem formatada */
    const mensagem = [
      "━━━━━━━━━━━━━━━━━━━",
      "     MENSAGEM DO PORTFÓLIO",
      "━━━━━━━━━━━━━━━━━━━",
      "",
      `Nome:    ${nome}`,
      `Empresa: ${empresa || "Não informado"}`,
      `Contato: ${telefone}`,
      "",
      "━━━━━━━━━━━━━━━━━━━",
      "",
      "DESCRIÇÃO / MENSAGEM",
      "",
      `"${projeto}"`,
      "",
      "━━━━━━━━━━━━━━━━━━━",
      "",
      "Olá! Vim pelo seu portfólio e gostaria de conversar.",
    ].join("\n");

    window.open(
      `https://wa.me/${CONFIG.CONTACT_WHATSAPP}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
      "noopener,noreferrer"
    );

    form.reset();
  });
}


/* ==========================================
   UTILITÁRIOS
========================================== */

const Utils = {

  /**
   * Injeta uma tag <style> única no <head>.
   * Evita duplicatas em re-inicializações.
   * @param {string} key — identificador único
   * @param {string} css — conteúdo CSS
   */
  injectStyle(key, css) {
    const styleId = `injected-style-${key}`;
    if (document.getElementById(styleId)) return;
    const style       = document.createElement("style");
    style.id          = styleId;
    style.textContent = css;
    document.head.appendChild(style);
  },

  /**
   * Módulo aritmético sempre positivo — útil para carrossel circular.
   * @param {number} n — índice atual
   * @param {number} m — total de itens
   * @returns {number}
   */
  mod(n, m) {
    return ((n % m) + m) % m;
  },

  /**
   * Debounce genérico.
   * @param {Function} fn — função a ser debounced
   * @param {number}   ms — delay em milissegundos
   * @returns {Function}
   */
  debounce(fn, ms) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  },

  /** Retorna true se o dispositivo suporta hover real (não touch-only). */
  hasHover() {
    return window.matchMedia("(hover: hover)").matches;
  },

  /** Retorna true se o usuário preferir movimento reduzido. */
  prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },
};


/* ==========================================
   EVENT LISTENERS
========================================== */

/**
 * Listeners globais que não pertencem a nenhum módulo específico.
 */
function initGlobalListeners() {
  const { langBtn, langDropdown } = DOM;

  /* Fecha dropdown de idioma com Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && langDropdown && langDropdown.classList.contains("open")) {
      langDropdown.classList.remove("open");
      if (langBtn) langBtn.setAttribute("aria-expanded", "false");
    }
  });

  /* Fecha dropdown de idioma ao clicar fora */
  document.addEventListener("click", (e) => {
    if (!langDropdown) return;
    const wrap = langDropdown.closest(".lang-wrap");
    if (wrap && !wrap.contains(e.target)) {
      langDropdown.classList.remove("open");
      if (langBtn) langBtn.setAttribute("aria-expanded", "false");
    }
  });
}


/* ==========================================
   INICIALIZAÇÃO
========================================== */

/* ── Módulos que NÃO dependem do DOM completo ───────────────────── */
initTheme();   // evita FOUC de tema

/* ── Módulos que dependem do DOM completo ───────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initParticles();
  initHeader();
  initSmoothScroll();
  initMobileMenu();
  initI18n();
  initTyping();
  initCyberFrame();
  initReveal();
  initProjectCarousel();
  initProjectModal();
  initBudgetForm();
  initRippleEffect();
  initContactParallax();
  initGlobalListeners();

  /* Marca o documento como carregado (habilita transições CSS) */
  document.body.classList.add("loaded");
});


/* ==========================================
   TEMA CLARO / ESCURO
========================================== */

function initTheme() {
  const { themeToggle, themeIcon } = DOM;

  /* Recupera tema salvo ou usa o padrão */
  const saved = localStorage.getItem(CONFIG.STORAGE_KEY_THEME) || CONFIG.DEFAULT_THEME;
  applyTheme(saved);

  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || CONFIG.DEFAULT_THEME;
    const next    = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(CONFIG.STORAGE_KEY_THEME, next);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (!themeIcon) return;
    themeIcon.className = theme === "dark"
      ? "ri-moon-clear-line"
      : "ri-sun-line";
  }
}


/* ==========================================
   CURSOR PERSONALIZADO
========================================== */

function initCursor() {
  const { cursorDot, cursorOutline } = DOM;
  if (!cursorDot || !cursorOutline) return;
  if (!Utils.hasHover()) return;

  let outlineX = 0;
  let outlineY = 0;
  let mouseX   = 0;
  let mouseY   = 0;
  let rafId    = null;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    /* Ponto central segue o mouse diretamente */
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

    if (!rafId) {
      rafId = requestAnimationFrame(animateOutline);
    }
  }, { passive: true });

  /* Anel externo segue com suavidade (lerp) */
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    rafId = requestAnimationFrame(animateOutline);
  }

  /* Estados de hover em elementos interativos */
  const interactiveSelectors = "a, button, [role='button'], input, textarea, select, label, .project-card, .social-item";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursorDot.classList.add("cursor-hover");
      cursorOutline.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursorDot.classList.remove("cursor-hover");
      cursorOutline.classList.remove("cursor-hover");
    }
  });

  /* Oculta cursor ao sair da janela */
  document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity     = "0";
    cursorOutline.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursorDot.style.opacity     = "";
    cursorOutline.style.opacity = "";
  });
}


/* ==========================================
   PARTÍCULAS DE FUNDO
========================================== */

function initParticles() {
  const { particlesBg } = DOM;
  if (!particlesBg) return;

  Utils.injectStyle("particle-float", `
    @keyframes particle-float {
      0%,  100% { transform: translate(0, 0);        opacity: .5; }
      33%        { transform: translate(20px, -30px); opacity: 1;  }
      66%        { transform: translate(-15px, 20px); opacity: .6; }
    }
  `);

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 35; i++) {
    const particle = document.createElement("div");
    const size     = 2 + Math.random() * 4;
    const opacity  = 0.05 + Math.random() * 0.15;
    const duration = 6 + Math.random() * 8;
    const delay    = Math.random() * -8;

    particle.style.cssText = `
      position: absolute; border-radius: 50%;
      background: rgba(139, 92, 246, ${opacity});
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
      animation: particle-float ${duration}s ease-in-out infinite ${delay}s;
    `;
    fragment.appendChild(particle);
  }

  particlesBg.appendChild(fragment);
}


/* ==========================================
   SELETOR DE IDIOMA
========================================== */

/**
 * initI18n — Gerencia o dropdown de seleção de idioma.
 * Como o HTML não possui atributos data-i18n, esta função apenas:
 * - Abre / fecha o dropdown.
 * - Atualiza o rótulo do botão (PT / EN / ES).
 * - Persiste a escolha no localStorage.
 * Para adicionar traduções completas, inclua atributos data-i18n nos
 * elementos do HTML e expanda o objeto TRANSLATIONS abaixo.
 */
function initI18n() {
  const { langBtn, langDropdown, currentLang } = DOM;
  if (!langBtn || !langDropdown) return;

  /* Restaura idioma salvo */
  const savedLang = localStorage.getItem(CONFIG.STORAGE_KEY_LANG) || "pt";
  setLanguageLabel(savedLang);
  markActiveLang(savedLang);

  /* Abre / fecha dropdown */
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = langDropdown.classList.toggle("open");
    langBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  /* Seleciona idioma */
  langDropdown.querySelectorAll(".lang-option").forEach((option) => {
    option.addEventListener("click", () => {
      const lang = option.dataset.language;
      if (!lang) return;
      setLanguageLabel(lang);
      markActiveLang(lang);
      localStorage.setItem(CONFIG.STORAGE_KEY_LANG, lang);
      langDropdown.classList.remove("open");
      langBtn.setAttribute("aria-expanded", "false");
    });
  });

  /** Atualiza o rótulo visível do botão (ex: "PT"). */
  function setLanguageLabel(lang) {
    if (!currentLang) return;
    const labels = { pt: "PT", en: "EN", es: "ES" };
    currentLang.textContent = labels[lang] || lang.toUpperCase();
  }

  /** Marca o item ativo no dropdown e atualiza aria-selected. */
  function markActiveLang(lang) {
    langDropdown.querySelectorAll(".lang-option").forEach((option) => {
      const isActive = option.dataset.language === lang;
      option.classList.toggle("active", isActive);
      option.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }
}


/* ==========================================
   EFEITO TYPING + GLITCH (hero)
========================================== */

function initTyping() {
  const { typingName } = DOM;
  if (!typingName) return;

  const { FULL_NAME, GLITCH_CHARS } = CONFIG;
  let charIndex    = 0;
  let isDeleting   = false;
  let glitchQueued = false;

  /** Embaralha o texto com caracteres aleatórios e revela progressivamente. */
  function glitchText() {
    let iteration = 0;
    const intervalId = setInterval(() => {
      typingName.textContent = FULL_NAME.split("").map((char, i) => {
        if (i < iteration) return FULL_NAME[i];
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }).join("");

      iteration += 0.5;

      if (iteration >= FULL_NAME.length) {
        clearInterval(intervalId);
        typingName.textContent = FULL_NAME;
      }
    }, 30);
  }

  /** Loop principal de digitação / apagamento. */
  function type() {
    typingName.textContent = FULL_NAME.substring(0, charIndex);

    if (!isDeleting) {
      charIndex++;

      if (charIndex > FULL_NAME.length) {
        /* Dispara glitch com delay após completar a digitação */
        if (!glitchQueued) {
          glitchQueued = true;
          setTimeout(() => { glitchText(); glitchQueued = false; }, CONFIG.TYPING_GLITCH_DELAY_MS);
        }
        /* Pausa antes de apagar */
        setTimeout(() => { isDeleting = true; type(); }, CONFIG.TYPING_PAUSE_FULL_MS);
        return;
      }

      /* Velocidade de digitação variável para realismo */
      setTimeout(type, 80 + Math.random() * 40);

    } else {
      charIndex--;

      if (charIndex < 0) {
        isDeleting = false;
        charIndex  = 0;
        setTimeout(type, CONFIG.TYPING_PAUSE_EMPTY_MS);
        return;
      }

      /* Apagamento mais rápido que a digitação */
      setTimeout(type, 30);
    }
  }

  /* Inicia com pequeno delay */
  setTimeout(type, 800);

  /* Glitch periódico independente do ciclo de digitação */
  setInterval(glitchText, CONFIG.GLITCH_INTERVAL_MS);
}


/* ==========================================
   PARALLAX 3D — CYBERFRAME
========================================== */

/**
 * Aplica rotação 3D suave na moldura de perfil ao mover o mouse.
 * Apenas em dispositivos com hover real.
 */
function initCyberFrame() {
  const { cyberFrame } = DOM;
  if (!cyberFrame) return;
  if (!Utils.hasHover()) return;

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    cyberFrame.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  }, { passive: true });
}


/* ==========================================
   CARROSSEL DE PROJETOS
========================================== */

/**
 * Exibe 3 cards no desktop (esquerdo, central, direito).
 * Exibe 1 card no mobile (< 900 px).
 * Suporta: setas, dots, swipe touch e resize.
 */
function initProjectCarousel() {
  const {
    projectStage: stage,
    projectPrev:  prevBtn,
    projectNext:  nextBtn,
    carouselDots: dotsWrap,
  } = DOM;

  if (!stage) return;

  const cards = Array.from(stage.querySelectorAll(".project-card"));
  if (!cards.length) return;

  const GAP = 24;
  let centerIndex = 0;

  /** Retorna quantos cards são visíveis simultaneamente. */
  function getVisibleCount() {
    return window.innerWidth <= 900 ? 1 : 3;
  }

  /** Calcula a largura de cada card com base no espaço disponível. */
  function calcCardWidth(visibleCount) {
    return (stage.offsetWidth - GAP * (visibleCount - 1)) / visibleCount;
  }

  /** Cria os dots de navegação. */
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "c-dot";
      dot.dataset.index = i;
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Ir para projeto ${i + 1}`);
      dot.addEventListener("click", () => { centerIndex = i; render(); });
      dotsWrap.appendChild(dot);
    });
  }

  /** Sincroniza o estado visual dos dots com o índice atual. */
  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll(".c-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === centerIndex);
      dot.setAttribute("aria-selected", i === centerIndex ? "true" : "false");
      dot.setAttribute("aria-current",  i === centerIndex ? "true" : "false");
    });
  }

  /**
   * Posiciona e configura visualmente um card.
   * @param {HTMLElement} card      — elemento do card
   * @param {number}      leftPx   — posição left em px
   * @param {number}      widthPx  — largura em px
   * @param {string}      className — "pc-left" | "pc-center" | "pc-right"
   */
  function placeCard(card, leftPx, widthPx, className) {
    card.style.left          = leftPx + "px";
    card.style.width         = widthPx + "px";
    card.style.opacity       = className === "pc-center" ? "1" : "0.75";
    card.style.pointerEvents = "auto";
    card.classList.add(className);
  }

  /** Re-renderiza o carrossel completo. */
  function render() {
    const visible = getVisibleCount();
    const cardW   = calcCardWidth(visible);

    /* Reseta todos os cards */
    cards.forEach((card) => {
      card.classList.remove("pc-left", "pc-center", "pc-right");
      card.style.transform     = "";
      card.style.opacity       = "0";
      card.style.pointerEvents = "none";
      card.style.width         = cardW + "px";
    });

    if (visible === 1) {
      /* Mobile: apenas o card central */
      const center = cards[Utils.mod(centerIndex, cards.length)];
      center.style.left          = "0px";
      center.style.opacity       = "1";
      center.style.pointerEvents = "auto";
      center.classList.add("pc-center");
      stage.style.minHeight      = center.offsetHeight + "px";
    } else {
      /* Desktop: esquerdo + central + direito */
      const idxLeft   = Utils.mod(centerIndex - 1, cards.length);
      const idxCenter = Utils.mod(centerIndex,     cards.length);
      const idxRight  = Utils.mod(centerIndex + 1, cards.length);

      placeCard(cards[idxLeft],   0,                  cardW, "pc-left");
      placeCard(cards[idxCenter], cardW + GAP,         cardW, "pc-center");
      placeCard(cards[idxRight],  (cardW + GAP) * 2,  cardW, "pc-right");

      requestAnimationFrame(() => {
        stage.style.minHeight = (cards[idxCenter].offsetHeight + 16) + "px";
      });
    }

    updateDots();
  }

  /* Setas de navegação */
  if (prevBtn) prevBtn.addEventListener("click", () => {
    centerIndex = Utils.mod(centerIndex - 1, cards.length);
    render();
  });
  if (nextBtn) nextBtn.addEventListener("click", () => {
    centerIndex = Utils.mod(centerIndex + 1, cards.length);
    render();
  });

  /* Suporte a swipe touch */
  let touchStartX = 0;
  stage.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  stage.addEventListener("touchend", (e) => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (delta >  CONFIG.CAROUSEL_SWIPE_THRESHOLD) { centerIndex = Utils.mod(centerIndex + 1, cards.length); render(); }
    if (delta < -CONFIG.CAROUSEL_SWIPE_THRESHOLD) { centerIndex = Utils.mod(centerIndex - 1, cards.length); render(); }
  });

  /* Re-renderiza ao redimensionar janela */
  window.addEventListener("resize", Utils.debounce(render, CONFIG.CAROUSEL_RESIZE_DEBOUNCE_MS), { passive: true });

  /* Inicializa */
  buildDots();
  requestAnimationFrame(() => requestAnimationFrame(render));
}


/* ==========================================
   MODAL DINÂMICO DE PROJETOS
========================================== */

/**
 * Modal de duas colunas: mídia (esq.) + texto/botões (dir.).
 * Acessibilidade: focus trap, Escape, bloqueio de scroll.
 * Mídia: suporte a vídeo local, YouTube embed e imagem fallback.
 */
function initProjectModal() {
  const {
    projectModal: backdrop,
    pmodalClose:  closeBtn,
    pmodalCat,
    pmodalTitle,
    pmodalTags,
    pmodalMedia,
    pmodalDesc,
    pmodalDetails,
    pmodalDeploy,
    pmodalGithub,
  } = DOM;

  if (!backdrop) return;

  /* Elemento focado antes de abrir o modal (restaurar ao fechar) */
  let lastFocusedElement = null;

  /**
   * Injeta o conteúdo de mídia na coluna esquerda do modal.
   * Prioridade: vídeo MP4 / YouTube → imagem do card → placeholder.
   */
  function buildMediaContent(card, video, title) {
    pmodalMedia.innerHTML = "";

    if (video && video !== "#") {
      /* YouTube */
      if (video.includes("youtube.com") || video.includes("youtu.be")) {
        const embedUrl = video
          .replace("watch?v=", "embed/")
          .replace("youtu.be/", "www.youtube.com/embed/");
        const iframe = document.createElement("iframe");
        iframe.src           = `${embedUrl}?autoplay=1&mute=1&loop=1&rel=0`;
        iframe.allow         = "autoplay; fullscreen";
        iframe.title         = title;
        iframe.style.cssText = "width:100%;height:100%;border:none;display:block;";
        pmodalMedia.appendChild(iframe);
        return;
      }

      /* Vídeo local */
      const vid = document.createElement("video");
      vid.src          = video;
      vid.autoplay     = true;
      vid.muted        = true;
      vid.loop         = true;
      vid.controls     = true;
      vid.playsInline  = true;
      vid.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
      pmodalMedia.appendChild(vid);
      return;
    }

    /* Fallback: imagem de capa do card */
    const cardImg = card.querySelector(".project-img-wrap img");
    if (cardImg && cardImg.src) {
      const img = document.createElement("img");
      img.src           = cardImg.src;
      img.alt           = title;
      img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
      pmodalMedia.appendChild(img);
      return;
    }

    /* Placeholder genérico */
    pmodalMedia.innerHTML = `
      <div class="pmodal-media-placeholder">
        <i class="ri-video-line" aria-hidden="true"></i>
        <span>Prévia em breve</span>
      </div>`;
  }

  /** Abre o modal com os dados do card selecionado. */
  function openModal(card) {
    const title   = card.dataset.title   || "Projeto";
    const cat     = card.dataset.cat     || "";
    const desc    = card.dataset.desc    || "";
    const tags    = card.dataset.tags    || "";
    const video   = card.dataset.video   || "";
    const deploy  = card.dataset.deploy  || "";
    const github  = card.dataset.github  || "";
    const details = card.dataset.details || "";

    /* Preenche cabeçalho */
    if (pmodalCat)   pmodalCat.textContent   = cat;
    if (pmodalTitle) pmodalTitle.textContent = title;
    if (pmodalDesc)  pmodalDesc.textContent  = desc;

    /* Tags de tecnologia */
    if (pmodalTags) {
      pmodalTags.innerHTML = tags.split(",")
        .filter(Boolean)
        .map((t) => `<span>${t.trim()}</span>`)
        .join("");
    }

    /* Detalhes técnicos */
    if (pmodalDetails) {
      pmodalDetails.textContent   = details;
      pmodalDetails.style.display = details ? "block" : "none";
    }

    /* Mídia */
    buildMediaContent(card, video, title);

    /* Botão Deploy: exibe apenas se houver link real */
    if (pmodalDeploy) {
      const hasDeploy            = deploy && deploy !== "#";
      pmodalDeploy.href          = hasDeploy ? deploy : "#";
      pmodalDeploy.style.display = hasDeploy ? "" : "none";
    }

    /* Botão GitHub: exibe apenas se houver link real */
    if (pmodalGithub) {
      const hasGithub            = github && github !== "#";
      pmodalGithub.href          = hasGithub ? github : "#";
      pmodalGithub.style.display = hasGithub ? "" : "none";
    }

    /* Acessibilidade */
    lastFocusedElement = document.activeElement;
    backdrop.removeAttribute("hidden");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.setAttribute("role", "dialog");
    requestAnimationFrame(() => backdrop.classList.add("pmodal-open"));

    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  /** Fecha o modal e restaura o estado da página. */
  function closeModal() {
    backdrop.classList.remove("pmodal-open");
    setTimeout(() => {
      backdrop.setAttribute("hidden", "");
      if (pmodalMedia) pmodalMedia.innerHTML = "";
      if (pmodalTags)  pmodalTags.innerHTML  = "";
      document.body.style.overflow = "";
      if (lastFocusedElement) lastFocusedElement.focus();
    }, 350);
  }

  /* Event delegation: clique em qualquer botão "Ver Projeto" */
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".btn-open-modal");
    if (!trigger) return;
    const card = trigger.closest(".project-card");
    if (card) openModal(card);
  });

  /* Fechar pelo botão X */
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  /* Fechar ao clicar no backdrop */
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  /* Fechar com Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !backdrop.hasAttribute("hidden")) closeModal();
  });
}


/* ==========================================
   RIPPLE EFFECT NOS BOTÕES
========================================== */

/**
 * Cria uma onda animada ao clicar em botões primários e de projeto.
 */
function initRippleEffect() {
  Utils.injectStyle("ripple-anim", `
    @keyframes ripple-anim { to { transform: scale(2.5); opacity: 0; } }
  `);

  document.querySelectorAll(".btn-primary, .btn-secondary, .btn-project").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const size   = Math.max(this.clientWidth, this.clientHeight);
      const rect   = this.getBoundingClientRect();
      const ripple = document.createElement("span");

      ripple.style.cssText = `
        position: absolute; pointer-events: none; border-radius: 50%;
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
        background: rgba(255, 255, 255, .2);
        transform: scale(0);
        animation: ripple-anim .6s ease-out forwards;
      `;

      if (window.getComputedStyle(this).position === "static") {
        this.style.position = "relative";
      }
      this.style.overflow = "hidden";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}


/* ==========================================
   PARALLAX NA SEÇÃO DE CONTATO
========================================== */

/**
 * Desloca suavemente o background-position conforme o scroll.
 * Apenas em dispositivos com hover real e sem prefers-reduced-motion.
 */
function initContactParallax() {
  const section = DOM.contactSection;
  if (!section) return;
  if (!Utils.hasHover()) return;
  if (Utils.prefersReducedMotion()) return;

  let rafScheduled = false;

  function applyParallax() {
    const rect     = section.getBoundingClientRect();
    const viewH    = window.innerHeight;
    const progress = (viewH - rect.top) / (viewH + rect.height);
    const clamped  = Math.max(0, Math.min(1, progress));
    const offsetY  = (clamped - 0.5) * 60; /* ± 30 px */

    section.style.backgroundPositionY = `calc(50% + ${offsetY}px)`;
    rafScheduled = false;
  }

  window.addEventListener("scroll", () => {
    if (!rafScheduled) {
      rafScheduled = true;
      requestAnimationFrame(applyParallax);
    }
  }, { passive: true });

  /* Estado inicial */
  applyParallax();
}