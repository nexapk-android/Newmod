-- GenMod: add per-app task popup and SEO settings
-- Run this once in Supabase SQL Editor.

alter table public.apps
  add column if not exists task_popup_enabled boolean not null default true,
  add column if not exists task_telegram_enabled boolean not null default true,
  add column if not exists task_telegram_url text not null default 'https://t.me/Genmodapk',
  add column if not exists task_instagram_enabled boolean not null default true,
  add column if not exists task_instagram_url text not null default 'https://www.instagram.com/instagram/',
  add column if not exists task_reel_enabled boolean not null default true,
  add column if not exists task_reel_url text not null default 'https://www.instagram.com/reels/',
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists seo_keywords text;

-- Existing apps keep the current task-popup behavior.
update public.apps
set
  task_popup_enabled = coalesce(task_popup_enabled, true),
  task_telegram_enabled = coalesce(task_telegram_enabled, true),
  task_telegram_url = coalesce(nullif(task_telegram_url, ''), 'https://t.me/Genmodapk'),
  task_instagram_enabled = coalesce(task_instagram_enabled, true),
  task_instagram_url = coalesce(nullif(task_instagram_url, ''), 'https://www.instagram.com/instagram/'),
  task_reel_enabled = coalesce(task_reel_enabled, true),
  task_reel_url = coalesce(nullif(task_reel_url, ''), 'https://www.instagram.com/reels/');
