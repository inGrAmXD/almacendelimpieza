// Navegación móvil
class MobileNavigation {
  constructor() {
    this.navToggle = document.querySelector('.navbar-toggle');
    this.navMenu = document.querySelector('.navbar-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.body = document.body;
    
    this.init();
  }
  
  init() {
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => this.toggleMenu());
      
      // Cerrar menú al hacer click en un enlace
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });
      
      // Cerrar menú con Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeMenu();
      });
    }
  }
  
  toggleMenu() {
    const isOpen = this.navMenu.classList.contains('active');
    
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    this.navMenu.classList.add('active');
    this.navToggle.classList.add('active');
    this.navToggle.setAttribute('aria-expanded', 'true');
    this.body.style.overflow = 'hidden';
  }
  
  closeMenu() {
    this.navMenu.classList.remove('active');
    this.navToggle.classList.remove('active');
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.body.style.overflow = '';
  }
}

// Header scroll effect
class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.header');
    this.scrollThreshold = 100;
    
    this.init();
  }
  
  init() {
    if (this.header) {
      window.addEventListener('scroll', () => this.handleScroll());
    }
  }
  
  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > this.scrollThreshold) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
  }
}

// Smooth scroll para enlaces internos
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }
  
  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  }
  
  handleClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    if (href === '#') return;
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Actualizar URL sin scroll
      history.pushState(null, null, href);
    }
  }
}

// Navegación activa
class ActiveNavigation {
  constructor() {
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }
  
  init() {
    if (this.sections.length && this.navLinks.length) {
      window.addEventListener('scroll', () => this.updateActiveLink());
      this.updateActiveLink(); // Inicial
    }
  }
  
  updateActiveLink() {
    const scrollPosition = window.pageYOffset + 150;
    
    let currentSection = '';
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}

// Formulario de contacto
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.init();
  }
  
  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Estado de carga
    submitButton.textContent = 'Redirigiendo a WhatsApp...';
    submitButton.disabled = true;
    
    // Extraer datos del formulario
    const nombre = formData.get('name') || '';
    const empresa = formData.get('company') || '';
    const email = formData.get('email') || '';
    const telefono = formData.get('phone') || '';
    const tipoNegocio = formData.get('business_type') || '';
    const mensaje = formData.get('message') || '';
    
    // Crear mensaje para WhatsApp
    let whatsappMessage = `¡Hola! Soy ${nombre}`;
    if (empresa) whatsappMessage += ` de ${empresa}`;
    whatsappMessage += `.\n\n`;
    
    if (tipoNegocio && tipoNegocio !== 'Seleccioná tu rubro') {
      whatsappMessage += `Tipo de negocio: ${tipoNegocio}\n`;
    }
    if (email) whatsappMessage += `Email: ${email}\n`;
    if (telefono) whatsappMessage += `Teléfono: ${telefono}\n`;
    
    whatsappMessage += `\nConsulta: ${mensaje || 'Quiero consultar sobre productos de limpieza profesional para mi negocio.'}`;
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/5491178434444?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      this.showMessage('¡Te redirigimos a WhatsApp para completar tu consulta!', 'success');
      this.form.reset();
      
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1000);
  }
  
  showMessage(message, type) {
    // Remover mensaje anterior si existe
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Crear nuevo mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message--${type}`;
    messageDiv.textContent = message;
    
    // Estilos inline para el mensaje
    Object.assign(messageDiv.style, {
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '16px',
      fontWeight: '500',
      backgroundColor: type === 'success' ? '#dcfce7' : '#fef2f2',
      color: type === 'success' ? '#166534' : '#dc2626',
      border: `1px solid ${type === 'success' ? '#bbf7d0' : '#fecaca'}`
    });
    
    // Insertar mensaje al inicio del formulario
    this.form.insertBefore(messageDiv, this.form.firstChild);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
}

// Animaciones de entrada
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.service-card, .value-item, .sector-card, .gallery-item');
    this.init();
  }
  
  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );
      
      this.elements.forEach(el => this.observer.observe(el));
    }
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Lazy loading para imágenes
class LazyLoading {
  constructor() {
    // Excluir imágenes del carousel del lazy loading
    this.images = document.querySelectorAll('img[loading="lazy"]:not(.carousel-slide img)');
    this.init();
  }
  
  init() {
    if ('loading' in HTMLImageElement.prototype) {
      // El navegador soporta lazy loading nativo
      return;
    }
    
    // Fallback para navegadores que no soportan lazy loading
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleImageIntersection(entries),
        { threshold: 0.1 }
      );
      
      this.images.forEach(img => this.observer.observe(img));
    } else {
      // Fallback: cargar todas las imágenes
      this.images.forEach(img => this.loadImage(img));
    }
  }
  
  handleImageIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }
  
  loadImage(img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
    // No tocar imágenes que ya tienen src definido
  }
}

// Utilidades
class Utils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Carousel de galería
class DepotCarousel {
  constructor() {
    this.carousel = document.querySelector('.depot-carousel');
    this.track = document.querySelector('.carousel-track');
    this.slides = document.querySelectorAll('.carousel-slide');
    this.prevBtn = document.querySelector('.carousel-prev');
    this.nextBtn = document.querySelector('.carousel-next');
    this.indicators = document.querySelectorAll('.indicator');
    
    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    
    this.init();
  }
  
  init() {
    if (!this.carousel || this.slideCount === 0) return;
    
    // Event listeners para navegación
    this.prevBtn?.addEventListener('click', () => this.prevSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());
    
    // Event listeners para indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
    
    // Auto-slide cada 5 segundos
    this.startAutoSlide();
    
    // Pausar auto-slide al hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
    this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());
    
    // Touch/swipe support
    this.addTouchSupport();
    
    this.updateCarousel();
  }
  
  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slideCount - 1 : this.currentSlide - 1;
    this.updateCarousel();
  }
  
  nextSlide() {
    this.currentSlide = this.currentSlide === this.slideCount - 1 ? 0 : this.currentSlide + 1;
    this.updateCarousel();
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.updateCarousel();
  }
  
  updateCarousel() {
    // Mover el track
    const translateX = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    // Actualizar indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
    
    // Actualizar botones de navegación
    this.prevBtn.disabled = false;
    this.nextBtn.disabled = false;
  }
  
  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  
  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
  
  addTouchSupport() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.stopAutoSlide();
    });
    
    this.track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });
    
    this.track.addEventListener('touchend', () => {
      if (!isDragging) return;
      
      const diffX = startX - currentX;
      const threshold = 50;
      
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
      
      isDragging = false;
      this.startAutoSlide();
    });
  }
}

// Video Epic Section con fotos flotantes
class EpicVideoSection {
  constructor() {
    this.section = document.querySelector('.video-epic-section');
    this.videoContainer = document.querySelector('.video-main-container');
    this.video = document.querySelector('.main-video');
    this.overlay = document.querySelector('.video-epic-overlay');
    this.floatingPhotos = document.querySelectorAll('.floating-photo');
    
    this.isHovered = false;
    this.photoAnimationInterval = null;
    
    this.init();
  }
  
  init() {
    if (!this.video || !this.section) return;
    
    // Configurar el video para autoplay
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.loop = true;
    
    // Intentar reproducir inmediatamente cuando el video esté listo
    this.video.addEventListener('loadeddata', () => {
      this.video.play().catch(e => console.log('Autoplay inicial bloqueado:', e));
    });
    
    // Intentar también cuando el metadata esté cargado
    this.video.addEventListener('loadedmetadata', () => {
      setTimeout(() => {
        this.video.play().catch(e => console.log('Autoplay metadata bloqueado:', e));
      }, 100);
    });
    
    // Reproducir en la primera interacción del usuario
    const playOnFirstInteraction = () => {
      this.video.play().catch(e => console.log('Play en interacción falló:', e));
      document.removeEventListener('click', playOnFirstInteraction);
      document.removeEventListener('touchstart', playOnFirstInteraction);
    };
    
    document.addEventListener('click', playOnFirstInteraction);
    document.addEventListener('touchstart', playOnFirstInteraction);
    
    // Eventos de hover épicos
    this.section.addEventListener('mouseenter', () => this.handleMouseEnter());
    this.section.addEventListener('mouseleave', () => this.handleMouseLeave());
    
    // Click en el video
    this.video.addEventListener('click', () => this.handleVideoClick());
    
    // Intersection Observer para autoplay
    this.setupIntersectionObserver();
    
    // Configuración inicial de fotos flotantes
    this.setupFloatingPhotos();
    
    // Auto-mostrar overlay en móvil
    if (this.isMobile()) {
      // Ya no necesitamos overlay
    }
    
    // Intentar reproducir el video inmediatamente
    this.startEpicExperience();
  }
  
  handleMouseEnter() {
    this.isHovered = true;
  }
  
  handleMouseLeave() {
    this.isHovered = false;
    this.pauseEpicExperience();
  }
  
  handleVideoClick() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }
  
  setupFloatingPhotos() {
    this.floatingPhotos.forEach((photo, index) => {
      setTimeout(() => {
        photo.style.opacity = '1';
        photo.style.transform = 'scale(1)';
      }, index * 800);
    });
  }
  
  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.startEpicExperience();
          } else {
            this.pauseEpicExperience();
          }
        });
      }, {
        threshold: 0.5
      });
      
      observer.observe(this.section);
    }
  }
  
  startEpicExperience() {
    // Intentar reproducir el video inmediatamente
    if (this.video && this.video.paused) {
      this.video.play().catch(error => {
        console.log('Autoplay bloqueado por el navegador:', error);
        // Si autoplay falla, al menos asegurarse de que el video esté listo
        this.video.load();
      });
    }
    
    // Activar las fotos flotantes
    this.setupFloatingPhotos();
  }
  
  pauseEpicExperience() {
    this.video.pause();
  }
  
  isMobile() {
    return window.innerWidth <= 768;
  }
}

// Animaciones mejoradas para la galería
class GalleryAnimations {
  constructor() {
    this.gridItems = document.querySelectorAll('.grid-item');
    this.init();
  }
  
  init() {
    // Animación escalonada para el grid
    this.setupGridAnimations();
  }
  
  setupGridAnimations() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Delay escalonado
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      this.gridItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
      });
    }
  }
}

// 🚀 Botón WhatsApp Flotante Sticky
class WhatsAppFloatButton {
  constructor() {
    this.floatButton = document.querySelector('.whatsapp-float');
    this.button = this.floatButton?.querySelector('.whatsapp-float-btn');
    
    this.init();
  }
  
  init() {
    if (!this.floatButton || !this.button) return;
    
    // Efecto de click mejorado
    this.button.addEventListener('click', (e) => this.handleClick(e));
    
    // Efecto de hover para desktop
    this.button.addEventListener('mouseenter', () => this.handleHover());
    this.button.addEventListener('mouseleave', () => this.handleHoverEnd());
    
    // Efecto de focus para accesibilidad
    this.button.addEventListener('focus', () => this.handleFocus());
    this.button.addEventListener('blur', () => this.handleFocusEnd());
    
    // Agregar indicador de "nuevo mensaje" en desktop
    this.addNewMessageIndicator();
  }
  
  handleClick(e) {
    // Efecto de click mejorado
    this.button.style.transform = 'scale(0.9)';
    
    // Agregar efecto de ripple
    this.createRippleEffect(e);
    
    // Remover indicador de notificación
    this.removeNotificationIndicator();
    
    setTimeout(() => {
      this.button.style.transform = '';
    }, 150);
    
    // Tracking del click (opcional)
    this.trackClick();
  }
  
  handleHover() {
    // Efecto adicional en hover para desktop
    if (window.innerWidth > 768) {
      this.button.style.transform = 'scale(1.05)';
    }
  }
  
  handleHoverEnd() {
    this.button.style.transform = '';
  }
  
  handleFocus() {
    this.button.style.outline = '2px solid #25D366';
    this.button.style.outlineOffset = '2px';
  }
  
  handleFocusEnd() {
    this.button.style.outline = '';
    this.button.style.outlineOffset = '';
  }
  
  createRippleEffect(e) {
    const ripple = document.createElement('span');
    const rect = this.button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    this.button.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 600);
  }
  
  addNewMessageIndicator() {
    // Solo en desktop, agregar indicador sutil
    if (window.innerWidth > 768) {
      const indicator = document.createElement('div');
      indicator.className = 'whatsapp-new-message';
      indicator.innerHTML = '<span>💬</span>';
      indicator.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ef4444;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        animation: bounce 2s infinite;
        z-index: 1;
      `;
      
      this.button.appendChild(indicator);
      
      // Remover después de 5 segundos
      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.remove();
        }
      }, 5000);
    }
  }
  
  trackClick() {
    // Aquí podrías agregar analytics si lo deseas
    console.log('WhatsApp button clicked');
  }
  
  removeNotificationIndicator() {
    // Remover el indicador de notificación usando clase CSS
    const floatContainer = this.floatButton;
    if (floatContainer) {
      floatContainer.classList.add('notification-hidden');
      
      // Remover la clase después de un tiempo para que vuelva a aparecer
      setTimeout(() => {
        floatContainer.classList.remove('notification-hidden');
      }, 30000); // 30 segundos
    }
  }
}

// 🚀 Carrusel Simple que SÍ FUNCIONA
class CompaniesCarousel {
  constructor() {
    this.carousel = document.querySelector('.companies-carousel');
    this.track = document.querySelector('.carousel-track');
    
    this.init();
  }
  
  init() {
    if (this.carousel && this.track) {
      // SIMPLE - solo hover para pausar
      this.carousel.addEventListener('mouseenter', () => {
        this.track.style.animationPlayState = 'paused';
      });
      
      this.carousel.addEventListener('mouseleave', () => {
        this.track.style.animationPlayState = 'running';
      });
      
      console.log('Carrusel inicializado - debería estar girando');
    }
  }
}

// 🎬 GALERÍA UNIFICADA ÉPICA
class UnifiedDepotGallery {
  constructor() {
    this.container = document.querySelector('.unified-depot-showcase');
    this.video = document.querySelector('.depot-video');
    this.photoShowcases = document.querySelectorAll('.photo-showcase');
    this.thumbnails = document.querySelectorAll('.thumb-btn');
    this.prevBtn = document.querySelector('.gallery-prev');
    this.nextBtn = document.querySelector('.gallery-next');
    
    this.currentIndex = 0;
    this.totalPhotos = this.photoShowcases.length;
    this.autoSlideInterval = null;
    
    this.init();
  }
  
  init() {
    if (!this.container || this.totalPhotos === 0) return;
    
    // Configurar video
    this.setupVideo();
    
    // Event listeners para controles
    this.prevBtn?.addEventListener('click', () => this.previousPhoto());
    this.nextBtn?.addEventListener('click', () => this.nextPhoto());
    
    // Event listeners para thumbnails
    this.thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => this.goToPhoto(index));
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousPhoto();
      if (e.key === 'ArrowRight') this.nextPhoto();
    });
    
    // Auto-slide
    this.startAutoSlide();
    
    // Pausar auto-slide en hover
    this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
    this.container.addEventListener('mouseleave', () => this.startAutoSlide());
    
    // Touch support para mobile
    this.addTouchSupport();
    
    // Inicializar primera foto
    this.updateGallery();
  }
  
  setupVideo() {
    if (!this.video) return;
    
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.loop = true;
    
    // Intentar autoplay
    this.video.addEventListener('loadeddata', () => {
      this.video.play().catch(e => console.log('Video autoplay:', e));
    });
    
    // Click en video para play/pause
    this.video.addEventListener('click', () => {
      if (this.video.paused) {
        this.video.play();
      } else {
        this.video.pause();
      }
    });
    
    // Intersection observer para video
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.video.play().catch(() => {});
            this.startAutoSlide();
          } else {
            this.video.pause();
            this.stopAutoSlide();
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(this.container);
    }
  }
  
  nextPhoto() {
    this.currentIndex = (this.currentIndex + 1) % this.totalPhotos;
    this.updateGallery();
  }
  
  previousPhoto() {
    this.currentIndex = this.currentIndex === 0 ? this.totalPhotos - 1 : this.currentIndex - 1;
    this.updateGallery();
  }
  
  goToPhoto(index) {
    this.currentIndex = index;
    this.updateGallery();
  }
  
  updateGallery() {
    // Actualizar fotos
    this.photoShowcases.forEach((photo, index) => {
      photo.classList.toggle('active', index === this.currentIndex);
    });
    
    // Actualizar thumbnails
    this.thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === this.currentIndex);
    });
  }
  
  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextPhoto();
    }, 4000); // 4 segundos
  }
  
  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
  
  addTouchSupport() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.stopAutoSlide();
    });
    
    this.container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });
    
    this.container.addEventListener('touchend', () => {
      if (!isDragging) return;
      
      const diffX = startX - currentX;
      const threshold = 50;
      
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          this.nextPhoto();
        } else {
          this.previousPhoto();
        }
      }
      
      isDragging = false;
      this.startAutoSlide();
    });
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // 🚀 Inicializar loading screen épico
  new EpicLoadingManager();
  
  // Inicializar todas las funcionalidades existentes
  new MobileNavigation();
  new HeaderScroll();
  new SmoothScroll();
  new ActiveNavigation();
  new ContactForm();
  new ScrollAnimations();
  new LazyLoading();
  
  // 🎬 Nueva galería unificada (reemplaza las viejas)
  new UnifiedDepotGallery();
  
  // 🚀 Botón WhatsApp flotante simple
  new WhatsAppFloatButton();
  
  // 🏢 Carrusel de logos de empresas
  new CompaniesCarousel();
});

// 🚀 Epic Loading Manager
class EpicLoadingManager {
  constructor() {
    this.loader = document.querySelector('.epic-loader');
    this.loaderText = document.querySelector('.loader-text');
    this.messages = [
      'Preparando tu experiencia...',
      'Cargando imágenes del depósito...',
      'Organizando productos...',
      '¡Ya casi estamos listos!',
      '¡Bienvenido!'
    ];
    this.currentMessage = 0;
    
    this.init();
  }
  
  init() {
    // Cambiar mensajes cada 800ms
    this.messageInterval = setInterval(() => {
      if (this.currentMessage < this.messages.length - 1) {
        this.currentMessage++;
        if (this.loaderText) {
          this.loaderText.textContent = this.messages[this.currentMessage];
        }
      }
    }, 800);
    
    // Remover loading screen después de que todo esté cargado
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hideLoader();
      }, 1500); // Dar tiempo para ver el último mensaje
    });
  }
  
  hideLoader() {
    clearInterval(this.messageInterval);
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    
    // Remover el loader del DOM después de la animación
    setTimeout(() => {
      if (this.loader && this.loader.parentNode) {
        this.loader.remove();
      }
    }, 1000);
  }
}

// Funcionalidades adicionales cuando la página esté completamente cargada
window.addEventListener('load', () => {
  // Precargar imágenes críticas si es necesario
  const criticalImages = document.querySelectorAll('.hero img, .logo img');
  criticalImages.forEach(img => {
    if (!img.complete) {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });
});

// Manejar errores globales
window.addEventListener('error', (e) => {
  console.error('Error capturado:', e.error);
});

// Exportar para uso en otros scripts si es necesario
window.SiteUtils = {
  Utils,
  MobileNavigation,
  ContactForm
}; 