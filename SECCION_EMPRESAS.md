# Sección de Logos de Empresas - Almacén de Limpieza

## Descripción
Esta sección muestra un carrusel automático con los logos de las empresas que confían en Almacén de Limpieza. Los logos se deslizan automáticamente de derecha a izquierda, creando un efecto visual atractivo que demuestra la confianza de marcas importantes en nuestros servicios.

## Características

### 🎠 Carrusel Automático
- **Movimiento infinito**: Los logos se repiten para crear un efecto continuo
- **Velocidad ajustable**: Se puede modificar la velocidad del carrusel
- **Pausa en hover**: Se detiene al pasar el mouse por encima (desktop)
- **Responsive**: Se adapta a diferentes tamaños de pantalla

### 🎯 Funcionalidades Interactivas
- **Touch support**: En dispositivos móviles se puede deslizar manualmente
- **Teclado**: Barra espaciadora para pausar/reanudar (cuando está en hover)
- **Pausa automática**: Se detiene al interactuar para mejor experiencia

### 🎨 Estilos Visuales
- **Fondo gris claro**: Para destacar los logos
- **Efecto grayscale**: Los logos aparecen en escala de grises y se colorean al hacer hover
- **Sombras suaves**: Para dar profundidad a cada logo
- **Bordes redondeados**: Para un look moderno y profesional

## Archivos Involucrados

### HTML
- `index.html`: Contiene la estructura de la sección
- Usa Liquid templates para iterar sobre las empresas

### CSS/SCSS
- `_sass/_sections.scss`: Estilos del carrusel y la sección
- Responsive design para diferentes breakpoints

### JavaScript
- `assets/js/main.js`: Clase `CompaniesCarousel` con toda la funcionalidad
- Manejo de touch, teclado y eventos del mouse

### Configuración
- `_data/companies.yml`: Lista de empresas y configuración del carrusel

## Cómo Personalizar

### Agregar/Quitar Empresas
1. Editar `_data/companies.yml`
2. Agregar o quitar entradas en la lista `companies`
3. Cada empresa debe tener:
   - `name`: Nombre de la empresa
   - `logo`: Nombre del archivo de imagen
   - `alt`: Texto alternativo para accesibilidad

### Cambiar Velocidad del Carrusel
En `_data/companies.yml`, modificar:
```yaml
carousel:
  speed: 30 # segundos para completar una vuelta
```

### Modificar Estilos
En `_sass/_sections.scss`, buscar la clase `.companies-section` y personalizar:
- Colores de fondo
- Tamaños de logos
- Espaciado entre elementos
- Efectos de hover

### Cambiar Imágenes
1. Agregar nuevas imágenes en `assets/images/logos-empresas/`
2. Actualizar `_data/companies.yml` con la nueva información
3. Las imágenes se redimensionan automáticamente

## Estructura de la Sección

```html
<section id="empresas" class="companies-section">
  <div class="container">
    <div class="section-header">
      <h2>Empresas que Confían en Nosotros</h2>
      <p>Marcas líderes que eligen nuestros productos y servicios</p>
    </div>
    
    <div class="companies-carousel">
      <div class="carousel-track">
        <!-- Logos generados dinámicamente -->
      </div>
    </div>
  </div>
</section>
```

## Responsive Design

### Desktop (>768px)
- Altura del carrusel: 120px
- Ancho de cada logo: 200px
- Espaciado: 24px entre logos

### Tablet (≤768px)
- Altura del carrusel: 100px
- Ancho de cada logo: 150px
- Espaciado: 16px entre logos

### Móvil (≤640px)
- Altura del carrusel: 80px
- Ancho de cada logo: 120px
- Espaciado: 8px entre logos

## Accesibilidad

- **Alt text**: Cada logo tiene texto alternativo descriptivo
- **Navegación por teclado**: Barra espaciadora para control
- **ARIA labels**: Etiquetas apropiadas para lectores de pantalla
- **Contraste**: Fondo claro para mejor legibilidad

## Navegación

La sección está incluida en el menú principal como "Empresas" y se puede acceder directamente con el enlace `#empresas`.

## Mantenimiento

### Agregar Nueva Empresa
1. Subir logo a `assets/images/logos-empresas/`
2. Agregar entrada en `_data/companies.yml`
3. El sitio se actualiza automáticamente

### Problemas Comunes
- **Logos no aparecen**: Verificar que el archivo existe y la ruta es correcta
- **Carrusel lento**: Ajustar `speed` en la configuración
- **Logos muy grandes/pequeños**: Modificar CSS en `.carousel-item img`

## Futuras Mejoras

- [ ] Controles manuales (botones prev/next)
- [ ] Indicadores de posición
- [ ] Animaciones más complejas
- [ ] Integración con API de empresas
- [ ] Estadísticas de confianza
- [ ] Enlaces a sitios web de las empresas
