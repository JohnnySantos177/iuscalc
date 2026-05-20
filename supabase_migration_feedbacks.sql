-- Migration: criar tabela feedbacks
-- Execute no Supabase Dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS feedbacks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nota integer NOT NULL CHECK (nota BETWEEN 1 AND 5),
  mensagem text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- RLS: usuário só insere/lê os próprios feedbacks; super_admin lê todos
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios_inserem_proprio_feedback"
  ON feedbacks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "usuarios_leem_proprio_feedback"
  ON feedbacks FOR SELECT
  USING (auth.uid() = user_id);

-- Super admin lê todos via RPC (abaixo) — sem expor SELECT geral

-- Função RPC para super admin buscar todos os feedbacks com email do usuário
CREATE OR REPLACE FUNCTION get_all_feedbacks()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  user_email text,
  nota integer,
  mensagem text,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Só super admin pode chamar
  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
      AND profiles.is_super_admin = true
  ) THEN
    RAISE EXCEPTION 'Acesso negado';
  END IF;

  RETURN QUERY
    SELECT
      f.id,
      f.user_id,
      COALESCE(p.email, '') AS user_email,
      f.nota,
      f.mensagem,
      f.created_at
    FROM feedbacks f
    LEFT JOIN profiles p ON p.id = f.user_id
    ORDER BY f.created_at DESC;
END;
$$;
