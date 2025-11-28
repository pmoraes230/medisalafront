# Sistema de Gestão de Usuários

## 📋 Visão Geral

Sistema completo de CRUD de usuários com autenticação baseada em sessões Django + React frontend.

**Backend**: Django REST Framework + MySql  
**Frontend**: React 18 + TypeScript + Vite + Zustand

## 🚀 Funcionalidades

- ✅ **Autenticação** por CPF ou Email
- ✅ **CRUD completo** de usuários
- ✅ **Toggle status** (Ativo/Inativo)
- ✅ **Protected Routes**
- ✅ **Loading states** e tratamento de erros
- ✅ **Upload de foto** do usuário
- ✅ **Validação** CPF/Email únicos

## 🛠️ Estrutura do Projeto

```
projeto/
├── backend/          # Django API
│   ├── api/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── permissions.py
│   ├── urls.py
│   └── settings.py
└── frontend/         # React App
    ├── src/
    │   ├── hooks/
    │   │   ├── useAuth.ts
    │   │   └── useApiAuth.ts
    │   ├── services/
    │   │   ├── api.ts
    │   │   ├── authApi.ts
    │   │   └── userService.ts
    │   └── features/
    │       ├── auth/
    │       └── users/
```

## 🔧 Instalação

### Backend (Django)

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

## 📖 Configuração

### Backend

**1. `settings.py` (obrigatório)**

```python
# CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]
CORS_ALLOW_CREDENTIALS = True

# Sessions
SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_SECURE = False
SESSION_SAVE_EVERY_REQUEST = True

# Authentication
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]
```

**2. Permissions Custom (`api/permissions.py`)**

```python
from rest_framework.permissions import BasePermission
from . import models

class IsAuthenticatedSession(BasePermission):
    def has_permission(self, request, view):
        return bool(request.session.get('usuario_id'))

class IsAdminSession(BasePermission):
    def has_permission(self, request, view):
        usuario_id = request.session.get('usuario_id')
        if not usuario_id: return False
        usuario = models.Usuario.objects.get(id_usuario=usuario_id)
        return usuario.id_perfil.nome_perfil == 'Administrador'
```

**3. Views (`api/views.py`)**

```python
from .permissions import IsAuthenticatedSession, IsAdminSession

class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedSession]
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminSession()]
        return [IsAuthenticatedSession()]
```

### Frontend

**1. API Unificada (`src/services/api.ts`)**

```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  withCredentials: 'include',
  timeout: 10000,
});

export default api;
```

**2. Auth Hook Único (`src/hooks/useApiAuth.ts`)**

```typescript
import { create } from 'zustand';
import { authApi } from '@/features/auth/services/authApi';

export const useApiAuth = create<ApiAuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await authApi.checkAuth();
      if (response.isLoggedIn && response.usuario) {
        set({ isAuthenticated: true, user: response.usuario, isLoading: false });
        return true;
      }
      set({ isLoading: false });
      return false;
    } catch {
      set({ isAuthenticated: false, isLoading: false });
      return false;
    }
  },
  
  login: async (creds) => {
    try {
      const response = await authApi.login(creds);
      if (response.success && response.usuario) {
        set({ isAuthenticated: true, user: response.usuario });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
}));
```

## 🧪 Testes de Funcionalidade

### Fluxo Completo

```
1. Login (CPF/Email + Senha)
2. → Cookies sessionid criados
3. → /check-auth → 200 OK
4. → /usuarios/ → 200 OK (lista carrega)
5. ✅ CRUD funcionando
```

### Endpoints Principais

```
POST /api/login/           # Autenticação
GET  /api/check-auth       # Verificar sessão
GET  /api/usuarios/        # Listar usuários
POST /api/usuarios/        # Criar usuário
PATCH /api/usuarios/:id/   # Toggle status
DELETE /api/usuarios/:id/  # Excluir usuário
```

## 🔍 Solução de Problemas

### Erro 403 após login

**Causa**: Django `IsAuthenticated` não reconhece sessão custom
**Solução**: Usar `IsAuthenticatedSession` nas views

### Cookies não enviados

**Verificar**:
```bash
# Django settings.py
CORS_ALLOW_CREDENTIALS = True
SESSION_COOKIE_SAMESITE = 'Lax'

# Frontend api.ts
withCredentials: 'include'
```

### ProtectedRoute redireciona sempre

**Solução**: Usar `useApiAuth` com `AuthInitializer`

## 📁 Estrutura de Arquivos Críticos

```
backend/api/
├── permissions.py    # ← CRÍTICO
├── views.py          # ← Aplicar permissions
└── urls.py

frontend/src/
├── services/api.ts       # ← API unificada
├── hooks/useApiAuth.ts   # ← Auth único
└── components/AuthInitializer.tsx
```

## 🚀 Deploy

### Backend (Production)

```bash
# settings.py
DEBUG = False
ALLOWED_HOSTS = ['seusite.com']
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True
```

### Frontend

```bash
npm run build
# Copiar dist/ para servidor
```

**Status**: ✅ **Production Ready**  
**Última atualização**: 28 de Novembro de 2025