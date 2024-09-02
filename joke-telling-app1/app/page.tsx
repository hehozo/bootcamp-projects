"use client";
import { useState } from "react";
import { useChat } from "ai/react";

export default function TellJoke() {
  const { messages, append, isLoading } = useChat();
  const themes = [
    { emoji: "🏛️", value: "History" },
    { emoji: "🤓", value: "Nerdy" },
    { emoji: "💑", value: "Relationships" },
    { emoji: "🐶", value: "Animals" },
  ];
  const types = [
    { emoji: "🔤", value: "Pun" },
    { emoji: "🇮🇪", value: "Limerick" },
    { emoji: "🎙️", value: "Standup" },
  ];
  const [state, setState] = useState({
    theme: "",
    type: "",
  });
  
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };
  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          
          {/* Header section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Joke-a-tron V1</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Create a joke by selecting a topic and structure.
            </p>
          </div>

          {/* Selections for joke inputs */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Theme</h3>

            <div className="flex flex-wrap justify-center">
              {themes.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="theme"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Type</h3>

            <div className="flex flex-wrap justify-center">
              {types.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="type"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate joke button */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          disabled={isLoading || !state.theme || !state.type}
          onClick={() =>
            append({
              role: "user",
              content: `Generate a joke about ${state.theme} in a ${state.type} structure`,
            })
          }
        >
          {isLoading ? "Generating..." : "Generate Joke"}
        </button>

        {messages.length > 0 && !messages[messages.length - 1]?.content.startsWith("Generate") && (
            <div className="w-full mt-8 p-6 bg-white bg-opacity-30 rounded-lg shadow-inner text-white">
              {/* Display the latest joke */}
              <p className="text-xl font-medium mb-4">{messages[messages.length - 1]?.content}</p>
            </div>
        )}
        </div>
    </main>
  );
}