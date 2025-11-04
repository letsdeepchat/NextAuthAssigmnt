"use client";
import React, { useEffect, useMemo, useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import { TextInput } from '@/components/ui';

type Photo = { id: number; title: string; url: string; thumbnailUrl: string };

export default function HomePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const [selected, setSelected] = useState<Photo | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError('');
        const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=300');
        if (!res.ok) throw new Error('Failed to fetch photos');
        const data = (await res.json()) as Photo[];
        setPhotos(data);
      } catch (e: any) {
        setError(e?.message || 'Unexpected error');
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items = q ? photos.filter(p => p.title.toLowerCase().includes(q)) : photos;
    return items;
  }, [photos, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1); // reset to first page on query change
  }, [query]);

  return (
    <ProtectedLayout>
      <div className="flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Images</h2>
          <div className="search">
            <TextInput placeholder="Search by title..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
        {error && <div className="alert error">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 overflow-auto pr-2">
          {pageItems.map(p => (
            <div
              key={p.id}
              className="relative rounded-2xl p-4 bg-gradient-to-br from-[#0f1733] to-[#121a35] border border-[#1b244a] shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              onClick={() => setSelected(p)}
            >
              <div className="font-semibold text-[15px] leading-snug">
                {p.title}
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 pointer-events-none"></div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[var(--muted)]">{filtered.length} results</span>
          <div className="flex items-center gap-2">
            <button className="button secondary" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
            <span>Page {page} / {pageCount}</span>
            <button className="button secondary" disabled={page >= pageCount} onClick={() => setPage(p => Math.min(pageCount, p + 1))}>Next</button>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center" onClick={() => setSelected(null)}>
          <div className="card w-[480px] max-w-[90%]" onClick={(e) => e.stopPropagation()}>
            <h3 className="mt-0">Image Details</h3>
            <div className="flex flex-col gap-2">
              <div><strong>ID:</strong> {selected.id}</div>
              <div><strong>Title:</strong> {selected.title}</div>
              <a className="link" href={selected.url} target="_blank" rel="noreferrer">Open Full Image</a>
            </div>
            <div className="mt-3 text-right">
              <button className="button" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
}
