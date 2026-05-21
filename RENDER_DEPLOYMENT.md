# Deploy a Render.com - LifeGoals

Guía paso a paso para desplegar la aplicación en Render.com

## 1. Preparar el Repositorio GitHub

```bash
git init
git add .
git commit -m "Initial commit: LifeGoals application"
git branch -M main
git remote add origin https://github.com/yourusername/lifegoals.git
git push -u origin main
```

## 2. Conectar con Render.com

1. Ir a [render.com](https://render.com)
2. Crear cuenta o iniciar sesión
3. Conectar repositorio GitHub

## 3. Crear Servicio Web

### Opción A: Desde Repository (Recomendado)

1. Dashboard > New +
2. Seleccionar "Web Service"
3. Conectar repository `lifegoals`
4. Configurar:

**Name:** lifegoals  
**Environment:** Docker  
**Region:** Ohio (o cercana a tus usuarios)  
**Branch:** main  

### Build Settings

- **Root Directory:** Leave blank
- **Dockerfile Path:** Dockerfile

### Deploy Settings

- **Deploy on every push to main:** YES

## 4. Variables de Entorno (Si necesarias)

En Render.com > Environment:
```
NODE_ENV=production
```

Las credenciales de Firebase ya están en el código compilado (seguro).

## 5. Directo con Docker Hub

Alternativamente, usar la imagen ya subida:

1. Render Dashboard > New Web Service
2. Seleccionar "Deploy existing image"
3. Registry: Docker Hub
4. Image URL: `docker.io/alessandro117/metasenlavida:latest`
5. Port: `3000`

## 6. Configurar Dominio (Opcional)

En Render.com el URL será: `lifegoals.onrender.com`

### Agregar Dominio Personalizado:
1. Settings > Custom Domains
2. Agregar tu dominio
3. Seguir instrucciones de DNS

## 7. Actualizar Firebase (Importante)

En Firebase Console > Settings > Authorized domains:

Agregar:
- `lifegoals.onrender.com`
- (Tu dominio personalizado si lo tienes)

También en API Key restrictions:
- HTTP Referrers: `*.onrender.com`

## 8. Health Check

Render.com automáticamente verificará health en `GET /`  
La aplicación responde en la raíz.

## 9. Logs y Monitoreo

En Render Dashboard:
- **Logs:** Ver en tiempo real
- **Metrics:** CPU, Memory, Network
- **Deploys:** Historial de deployments

## 10. Troubleshooting

### Aplicación en blanco
- Verificar logs en Render
- Verificar Firebase kredenciales
- Limpiar browser cache (Ctrl+Shift+Del)

### 502 Bad Gateway
- Esperar a que termine build (5-10 min)
- Verificar Dockerfile
- Ver logs del deploy

### Firebase errors
- Verificar CORS en Firebase
- Verificar dominio autorizado en Firebase
- Verificar Firestore Security Rules

## 11. Actualizaciones Futuras

Después de cambios:
```bash
git add .
git commit -m "Update: description"
git push
# Render automáticamente redeploy
```

---

**Info útil:**
- URL de Dashboard: https://dashboard.render.com
- Documentación: https://render.com/docs
- Estado: https://status.render.com

