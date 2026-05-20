import posthog from 'posthog-js';

// ─── Inicialização ────────────────────────────────────────────────────────────
// Substitua VITE_POSTHOG_KEY no seu .env com a chave do projeto PostHog.
// Obtenha em: https://app.posthog.com → Settings → Project API Key

export function initAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;

  if (!key) {
    if (import.meta.env.DEV) {
      console.warn('[Analytics] VITE_POSTHOG_KEY não definida — analytics desativado em dev.');
    }
    return;
  }

  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST ?? 'https://app.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false,   // faremos manualmente via AnalyticsProvider
    capture_pageleave: true,
    autocapture: false,        // preferimos eventos explícitos e controlados
  });
}

// ─── Identificação do usuário ─────────────────────────────────────────────────
export function identifyUser(userId: string, props?: { email?: string; name?: string; plan?: string }) {
  posthog.identify(userId, props);
}

export function resetUser() {
  posthog.reset();
}

// ─── Page view ────────────────────────────────────────────────────────────────
export function trackPageView(path: string) {
  posthog.capture('$pageview', { $current_url: path });
}

// ─── Calculadora ──────────────────────────────────────────────────────────────
export function trackCalcular(props: {
  tipo_rescisao: string;
  salario_base: number;
}) {
  posthog.capture('calcular_clicado', props);
}

export function trackSalvarCalculo() {
  posthog.capture('calculo_salvo');
}

export function trackExportarPDF() {
  posthog.capture('exportar_pdf');
}

export function trackExportarExcel() {
  posthog.capture('exportar_excel');
}

export function trackCompartilharWhatsApp() {
  posthog.capture('compartilhar_whatsapp');
}

// ─── Planos / Upgrade ─────────────────────────────────────────────────────────
export function trackUpgradeClicado(origem: 'navigation' | 'home_banner' | 'login' | 'calculadora') {
  posthog.capture('upgrade_clicado', { origem });
}

export function trackUpgradePageVisitada() {
  posthog.capture('upgrade_page_visitada');
}

export function trackAssinaturaIniciada(plano: string) {
  posthog.capture('assinatura_iniciada', { plano });
}
