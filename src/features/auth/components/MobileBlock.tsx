import { useEffect } from 'react';

export const MobileBlock = () => {
  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     window.innerWidth < 1024;

    if (isMobile) {
      document.documentElement.innerHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <title>MediSala - Acesso Restrito</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
          <style>
            body { background: linear-gradient(135deg, #f0f9f8 0%, #e0f2f1 100%); font-family: 'Segoe UI', sans-serif; }
            .card { max-width: 500px; margin: 2rem auto; }
          </style>
        </head>
        <body>
          <div class="container py-5">
            <div class="card shadow-lg text-center p-4">
              <i class="bi bi-phone fs-1 text-danger mb-3"></i>
              <h4 class="text-primary">Acesso Restrito</h4>
              <p>O <strong>MediSala</strong> é apenas para <strong>desktop</strong>.</p>
              <button class="btn btn-secondary" onclick="location.reload()">Tentar Novamente</button>
            </div>
          </div>
        </body>
        </html>
      `;
    }
  }, []);

  return null;
};