# Almacén de Limpieza - Landing Page

Landing page profesional para Almacén de Limpieza, distribuidora de productos de limpieza profesional para el sector gastronómico.

## 🚀 Características

- **Diseño moderno y responsivo** inspirado en mejores prácticas de UX/UI
- **Optimizado para SEO** con structured data y meta tags completos
- **Performance optimizada** con lazy loading y recursos optimizados
- **Accesible** siguiendo estándares WCAG
- **Formulario de contacto funcional** con Formspree
- **Contenido separado del layout** para fácil mantenimiento
- **Compatible con GitHub Pages y Cloudflare Pages**

## 📋 Estructura del Proyecto

```
/
├── _config.yml              # Configuración de Jekyll
├── _data/                   # Datos del sitio (YAML)
│   ├── site.yml            # Información de la empresa
│   └── services.yml        # Servicios y productos
├── _includes/              # Componentes reutilizables
│   ├── head.html           # Meta tags y SEO
│   ├── header.html         # Navegación
│   ├── footer.html         # Footer
│   └── scripts.html        # JavaScript
├── _layouts/               # Plantillas
│   └── default.html        # Layout principal
├── _sass/                  # Estilos SCSS
│   ├── _variables.scss     # Variables de diseño
│   ├── _base.scss          # Estilos base
│   ├── _header.scss        # Header y navegación
│   ├── _hero.scss          # Sección hero
│   ├── _sections.scss      # Secciones principales
│   └── _responsive.scss    # Responsive y footer
├── assets/                 # Recursos estáticos
│   ├── css/
│   │   └── main.scss       # Archivo principal de estilos
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   ├── images/             # Imágenes del sitio
│   └── documents/          # PDFs y documentos
├── index.html              # Página principal
├── Gemfile                 # Dependencias de Ruby
└── README.md               # Este archivo
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Ruby 2.7 o superior
- Bundler
- Git

### Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd almacen-limpieza
   ```

2. **Instalar dependencias**
   ```bash
   bundle install
   ```

3. **Ejecutar el servidor de desarrollo**
   ```bash
   bundle exec jekyll serve
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4000
   ```

### Despliegue en GitHub Pages

1. **Crear repositorio en GitHub**
2. **Subir el código**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
3. **Activar GitHub Pages**
   - Ir a Settings > Pages
   - Seleccionar "Deploy from a branch"
   - Elegir rama `main` y carpeta `/ (root)`

### Despliegue en Cloudflare Pages

1. **Conectar repositorio** en Cloudflare Pages
2. **Configurar build**:
   - Build command: `bundle exec jekyll build`
   - Build output directory: `_site`
   - Environment variables: `RUBY_VERSION=2.7.0`

## ⚙️ Personalización

### 1. Información de la Empresa

Editar `_data/site.yml`:

```yaml
company:
  name: "Tu Empresa"
  tagline: "Tu eslogan"
  description: "Descripción de tu empresa"

contact:
  phone: "+54 11 1234-5678"
  email: "info@tuempresa.com"
  address: "Tu dirección"
```

### 2. Servicios y Productos

Editar `_data/services.yml` para personalizar:
- Servicios principales
- Sectores que atienden
- Categorías de productos
- Información del catálogo

### 3. Configuración SEO

En `_config.yml`:

```yaml
title: "Tu Título SEO"
description: "Tu descripción SEO"
url: "https://tudominio.com"
keywords: "tus, palabras, clave"
```

### 4. Formulario de Contacto

1. **Crear cuenta en Formspree** (https://formspree.io)
2. **Obtener endpoint** de tu formulario
3. **Actualizar en `index.html`**:
   ```html
   <form action="https://formspree.io/f/TU_FORM_ID" method="POST">
   ```

### 5. Imágenes

Reemplazar las imágenes en `assets/images/`:

- `logo.png` - Logo de la empresa
- `hero-deposito.jpg` - Imagen de fondo del hero
- `deposito-*.jpg` - Fotos del depósito
- `productos-*.jpg` - Fotos de productos
- `og-image.jpg` - Imagen para redes sociales (1200x630px)
- `favicon.ico` - Favicon

### 6. Colores y Tipografía

Editar `_sass/_variables.scss`:

```scss
// Colores principales
$primary-color: #2563eb;    // Tu color principal
$secondary-color: #10b981;  // Tu color secundario
$accent-color: #f59e0b;     // Tu color de acento

// Tipografía
$font-family-primary: 'Tu-Fuente', sans-serif;
```

## 📱 Funcionalidades

### Navegación
- **Menú responsivo** con hamburguesa en móvil
- **Navegación fija** con efecto scroll
- **Enlaces smooth scroll** a secciones internas
- **Indicador de sección activa**

### SEO y Performance
- **Meta tags optimizados** para redes sociales
- **Structured data** para Google
- **Lazy loading** de imágenes
- **Sitemap y robots.txt** automáticos
- **Critical CSS** inlineado

### Formulario de Contacto
- **Validación HTML5** nativa
- **Estados de carga** y confirmación
- **Mensajes de error** amigables
- **Compatible con Formspree**

### Accesibilidad
- **Navegación por teclado** completa
- **ARIA labels** apropiados
- **Contraste optimizado**
- **Modo de movimiento reducido**

## 🎨 Secciones de la Landing

1. **Hero** - Presentación principal con CTA
2. **Sobre Nosotros** - Historia, misión, visión y valores
3. **Servicios** - Servicios principales y sectores
4. **Catálogo** - Descarga de PDF y categorías
5. **Galería** - Video e imágenes del depósito
6. **Contacto** - Formulario y datos de contacto
7. **Footer** - Enlaces y información adicional

## 🔧 Mantenimiento

### Actualizar Contenido

1. **Textos**: Editar archivos en `_data/`
2. **Imágenes**: Reemplazar en `assets/images/`
3. **Catálogo**: Subir nuevo PDF a `assets/documents/`

### Agregar Nueva Sección

1. **Crear estructura HTML** en `index.html`
2. **Agregar estilos** en `_sass/_sections.scss`
3. **Actualizar navegación** en `_includes/header.html`

### Google Analytics

Descomentar y configurar en `_includes/scripts.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU_GA_ID');
</script>
```

## 🐛 Solución de Problemas

### El sitio no se ve bien localmente
- Verificar que Jekyll esté compilando correctamente
- Revisar errores en la consola del navegador
- Asegurar que todas las dependencias estén instaladas

### Imágenes no se cargan
- Verificar rutas en `assets/images/`
- Comprobar que los archivos existan
- Revisar permisos de archivos

### Formulario no funciona
- Verificar configuración de Formspree
- Comprobar que el endpoint sea correcto
- Revisar en las herramientas de desarrollador

## 📞 Soporte

Para dudas o personalizaciones adicionales, contactar al desarrollador del proyecto.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo LICENSE para más detalles.

---

**Desarrollado con ❤️ para la industria gastronómica** 