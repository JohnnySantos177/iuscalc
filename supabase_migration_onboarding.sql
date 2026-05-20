-- Migration: adicionar coluna onboarding_completo na tabela profiles
-- Execute este SQL no Supabase Dashboard > SQL Editor

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS onboarding_completo boolean DEFAULT false;

-- Usuários existentes já passaram pelo "onboarding" implícito,
-- então marcamos todos como completo para não exibir o modal retroativamente.
UPDATE profiles
  SET onboarding_completo = true
  WHERE onboarding_completo IS NULL OR onboarding_completo = false;
