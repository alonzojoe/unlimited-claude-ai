import React from "react";
import { ChevronDown, Check } from "lucide-react";
import { CLAUDE_MODELS } from "../lib/models";
import type { ClaudeModel } from "../types";

interface ModelSelectorProps {
  selectedModel: ClaudeModel;
  onSelectModel: (model: ClaudeModel) => void;
}

export const ModelSelector = ({
  selectedModel,
  onSelectModel,
}: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const currentModel = CLAUDE_MODELS.find((m) => m.id === selectedModel);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
      >
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {currentModel?.name}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
            {CLAUDE_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onSelectModel(model.id);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-start gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {model.name}
                    </span>
                    {selectedModel === model.id && (
                      <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {model.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
