"use client";

import { FormEvent, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
};

const initialPosts: Post[] = [
  {
    id: 2,
    title: "환불은 얼마나 걸리나요?",
    content: "결제 취소 후 환불까지 영업일 기준 3~5일 정도 소요됩니다.",
    createdAt: new Date("2026-09-05T10:20:00"),
  },
  {
    id: 1,
    title: "배송 조회는 어디서 하나요?",
    content: "주문 내역 페이지의 '배송 조회' 버튼을 눌러 확인하실 수 있습니다.",
    createdAt: new Date("2026-09-04T15:40:00"),
  },
];

function formatDate(date: Date) {
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nextId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost: Post = {
      id: nextId,
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date(),
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-16">
      <header className="mb-12">
        <p className="text-sm text-neutral-400">Q&amp;A</p>
        <h1 className="mt-1 text-2xl font-medium tracking-tight">라린느 고객센터</h1>
      </header>

      <section className="mb-16">
        <h2 className="mb-4 text-sm font-medium text-neutral-500">글쓰기</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            className="border-b border-neutral-200 bg-transparent py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-800"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="문의 내용을 입력해 주세요."
            rows={4}
            className="resize-none border-b border-neutral-200 bg-transparent py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-800"
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-neutral-400">작성자: 익명</span>
            <button
              type="submit"
              className="rounded-full bg-neutral-900 px-5 py-2 text-xs font-medium text-white transition hover:bg-neutral-700"
            >
              등록
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-medium text-neutral-500">
          문의 목록 ({posts.length})
        </h2>
        {posts.length === 0 ? (
          <p className="py-12 text-center text-sm text-neutral-400">
            등록된 문의가 없습니다.
          </p>
        ) : (
          <ul className="divide-y divide-neutral-200">
            {posts.map((post) => (
              <li key={post.id} className="py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-medium">{post.title}</h3>
                  <span className="shrink-0 text-xs text-neutral-400">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-neutral-600">
                  {post.content}
                </p>
                <span className="mt-2 inline-block text-xs text-neutral-400">
                  익명
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
