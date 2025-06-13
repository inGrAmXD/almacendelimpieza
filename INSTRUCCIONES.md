# 🚀 Instrucciones Rápidas

## Pasos para poner en funcionamiento tu landing page:

### 1. ⚡ Prueba inmediata (5 minutos)

```bash
# Instalar dependencias
bundle install

# Ejecutar servidor local
bundle exec jekyll serve

# Abrir en navegador
open http://localhost:4000
```

### 2. 📝 Personalizar contenido (15 minutos)

**Editar información básica:**
```bash
# Abrir y editar información de la empresa
nano _data/site.yml

# Actualizar servicios y productos
nano _data/services.yml

# Cambiar configuración general
nano _config.yml
```

**Campos más importantes a cambiar:**
- Nombre de la empresa
- Teléfono y email de contacto
- Dirección
- URL del sitio
- Palabras clave para SEO

### 3. 🖼️ Subir imágenes (10 minutos)

**Copiar tus imágenes a:**
```
assets/images/
├── logo.png              # Tu logo
├── hero-deposito.jpg     # Foto del depósito para el hero
├── deposito-1.jpg        # Fotos del depósito
├── deposito-2.jpg
├── deposito-3.jpg
├── productos-1.jpg       # Fotos de productos
├── productos-2.jpg
└── productos-3.jpg
```

### 4. 📄 Subir catálogo (2 minutos)

```bash
# Copiar tu catálogo PDF
cp tu-catalogo.pdf assets/documents/catalogo-almacen-limpieza.pdf
```

### 5. 📧 Configurar formulario (5 minutos)

1. **Crear cuenta gratis en Formspree:** https://formspree.io
2. **Crear nuevo formulario** y copiar el endpoint
3. **Editar en index.html** la línea:
   ```html
   <form action="https://formspree.io/f/TU_FORM_ID" method="POST">
   ```

### 6. 🌐 Subir a GitHub Pages (10 minutos)

```bash
# Crear repositorio en GitHub
gh repo create almacen-limpieza --public

# Subir código
git add .
git commit -m "Landing page inicial"
git push origin main
```

**Activar GitHub Pages:**
- Ir a Settings > Pages en tu repositorio
- Seleccionar "Deploy from a branch" 
- Elegir rama `main`

### 7. 🎨 Personalizar colores (opcional)

```scss
// Editar _sass/_variables.scss
$primary-color: #TU_COLOR;     // Color principal
$secondary-color: #TU_COLOR;   // Color secundario
```

## ✅ Checklist Final

- [ ] El sitio se ve correctamente en localhost
- [ ] Se reemplazaron todas las imágenes
- [ ] Se actualizó la información de contacto
- [ ] Se subió el catálogo PDF
- [ ] Se configuró el formulario de contacto
- [ ] Se personalizaron los colores (opcional)
- [ ] Se activó Google Analytics (opcional)

## 🚨 Solución Rápida de Problemas

**❌ Jekyll no compila:**
```bash
bundle update
bundle exec jekyll clean
bundle exec jekyll serve
```

**❌ Imágenes no se ven:**
- Verificar que estén en `assets/images/`
- Comprobar que los nombres coincidan exactamente

**❌ Formulario no funciona:**
- Verificar endpoint de Formspree
- Revisar en herramientas de desarrollador

## 📞 ¿Necesitas ayuda?

Si tienes problemas, revisa el archivo `README.md` para instrucciones detalladas o contacta al desarrollador.

---

**¡Tu landing page profesional está lista en menos de 1 hora! 🎉** 