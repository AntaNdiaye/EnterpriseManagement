"use client";

import { useState } from "react";

const insights = [
  {
    kind: "Anomaly",
    text: "Supply costs jumped 28% this week compared to your monthly average, traced to a single restock order on Aug 14."
  },
  {
    kind: "Forecast",
    text: "At the current growth rate, revenue is on track to reach about $5,100 in September, driven mostly by wholesale orders."
  },
  {
    kind: "Suggestion",
    text: "Djibril's sales grew 15% while Anta's held flat. Worth checking if the same product mix could work across both."
  }
];

export default function AiInsightsPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("/api/ai/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      setAnswer(data.answer ?? "No answer returned.");
    } catch {
      setAnswer("Something went wrong reaching the AI service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-bone mb-6">AI insights</h1>

      <div className="rounded-xl border border-white/10 bg-panel p-4 mb-4 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Ask about your business"
          className="flex-1 bg-transparent text-sm text-bone placeholder:text-bone/40 outline-none"
        />
        <button
          onClick={ask}
          disabled={loading}
          className="rounded-md bg-gold px-4 py-1.5 text-sm font-medium text-ink disabled:opacity-50"
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </div>

      {answer && (
        <div className="rounded-xl border border-gold/40 bg-panel p-4 mb-6 text-sm text-bone">
          {answer}
        </div>
      )}

      <p className="text-sm text-bone/60 mb-3">Recent insights</p>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-panel p-4">
            <span className="inline-block rounded px-2 py-0.5 text-xs bg-gold/20 text-gold mb-2">
              {insight.kind}
            </span>
            <p className="text-sm text-bone/90">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
