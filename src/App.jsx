/* eslint-env browser */
/* global chrome */

import { useState, useEffect } from "react";
import "./App.css"; // We can use this for App-specific styles if needed
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Best effort check for extension environment
const IS_EXTENSION =
  typeof window !== "undefined" &&
  window.chrome &&
  window.chrome.runtime &&
  window.chrome.runtime.id;

function App() {
  const [currentMode, setCurrentMode] = useState("off");

  useEffect(() => {
    // Get current mode from storage
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(["mode"], (result) => {
        setCurrentMode(result.mode || "off");
      });
    }
  }, []);

  const handleModeChange = (newMode) => {
    if (newMode === currentMode) return;
    setCurrentMode(newMode);
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ mode: newMode });
    }
  };

  return (
    <div className="w-72 p-6 text-white flex flex-col justify-between min-h-[300px] bg-gray-900">
      <header className="mb-5">
        <h1 className="text-2xl font-semibold text-center">ReviewRadar</h1>
      </header>

      <main className="flex-grow">
        <Label className="block mb-3 text-sm font-medium text-white/80">
          Analysis Mode:
        </Label>
        <RadioGroup
          value={currentMode}
          onValueChange={handleModeChange}
          className="space-y-3"
        >
          {[
            { value: "off", label: "Off" },
            { value: "confidence", label: "Confidence Score" },
            { value: "classification", label: "Classification" },
          ].map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer"
              onClick={() => handleModeChange(option.value)}
            >
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="border-white/40 data-[state=checked]:bg-purple-600"
              />
              <Label
                htmlFor={option.value}
                className="text-sm text-white/90 cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </main>

      <footer className="mt-auto pt-5 border-t border-white/10">
        <p className="text-xs text-center text-white/60">
          &copy; {new Date().getFullYear()} ReviewRadar
        </p>
      </footer>
    </div>
  );
}

export default App;
