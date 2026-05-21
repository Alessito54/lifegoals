# LifeGoals - Aplicación de Administración de Metas

Aplicación web moderna construida con **Angular 21** y **Firestore** que permite administrar tus metas en la vida de forma sencilla y eficiente.

## 🎯 Características

- ✅ Agregar nuevas metas
- ✅ Visualizar todas tus metas en tiempo real
- ✅ Eliminar metas completadas
- ✅ Almacenamiento en la nube con Firestore
- ✅ Interfaz moderna y responsiva
- ✅ Acceso desde cualquier dispositivo

## 🛠️ Requisitos Previos

- Node.js 20.x o superior
- Angular 21
- npm o yarn
- Una cuenta de Firebase con proyecto creado

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/yourusername/lifegoals.git
cd lifegoals
```

2. **Instalar dependencias**
```bash
npm install --legacy-peer-deps
```

3. **Configurar Firebase**
   - Ir a la consola de Firebase: https://console.firebase.google.com/
   - Crear un nuevo proyecto llamado "lifegoals"
   - Crear una base de datos Firestore con colección "metas" y campo "meta" tipo String
   - Copiar las credenciales de Firebase y actualizar los archivos de ambiente:
     - `src/environments/environment.ts`
     - `src/environments/environment.development.ts`
   - Ver [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) para instrucciones detalladas

## 🚀 Ejecución

### Desarrollo
```bash
npm start
```
La aplicación estará disponible en `http://localhost:4200`

### Build para producción
```bash
npm run build
```

### Docker

**Construir imagen:**
```bash
docker build -t lifegoals:latest .
```

**Ejecutar contenedor:**
```bash
docker run -p 3000:3000 lifegoals:latest
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── home/           # Componente principal
│   │   └── about/          # Página de información
│   ├── services/
│   │   └── meta.service.ts # Servicio de Firestore
│   ├── models/
│   │   └── meta.model.ts   # Modelo de datos
│   ├── app.ts              # Componente raíz
│   ├── app.routes.ts       # Configuración de rutas
│   └── app.config.ts       # Configuración de app
├── environments/           # Variables de ambiente
└── styles.css             # Estilos globales
```

## 📝 Configuración de Ambiente

### environment.ts (Producción)
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'lifegoals-xxxxx.firebaseapp.com',
    projectId: 'lifegoals-xxxxx',
    storageBucket: 'lifegoals-xxxxx.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
  }
};
```

## 🔗 Rutas Disponibles

- `/` o `/home` - Página principal con administración de metas
- `/about` - Página de información y contacto

## 👨‍💻 Tecnologías Utilizadas

- **Angular 21** - Framework frontend
- **Firebase** - Backend y autenticación
- **Firestore** - Base de datos en tiempo real
- **TypeScript** - Lenguaje de programación
- **HTML5 & CSS3** - Estructura y estilos

## 🌐 Despliegue

### Docker Hub
```bash
docker tag lifegoals:latest yourusername/lifegoals:latest
docker push yourusername/lifegoals:latest
```

### Render.com
1. Conectar el repositorio de GitHub
2. Crear servicio Web
3. Configurar comando de build: `npm install --legacy-peer-deps && npm run build`
4. Configurar comando de inicio: `npm start`

## 🤖 CI/CD Pipeline

El proyecto incluye un workflow de GitHub Actions que:
- Construye la aplicación Angular
- Crea una imagen Docker
- La sube automáticamente a Docker Hub

Necesitas configurar estos secretos en GitHub:
- `DOCKER_USERNAME` - Tu usuario de Docker Hub
- `DOCKER_PASSWORD` - Tu token de Docker Hub

## 📄 Entregables

- 🔗 URL del repositorio público en GitHub
- 🐳 Imagen en Docker Hub
- 🚀 Aplicación desplegada en Render.com

## 📞 Soporte

Para preguntas o problemas, contacta a:
- **Email:** contact@example.com
- **GitHub:** https://github.com/yourusername

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ por Alessandro**
