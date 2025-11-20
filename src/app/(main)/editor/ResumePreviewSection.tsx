import ResumePreview from "@/components/ResumePreview";
import JakeResumePreview from "@/components/templates/JakeResumePreview";

import { ResumeValues } from "@/lib/validation";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LayoutList } from "lucide-react";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const handleTemplateSelect = (template: "default" | "jake") => {
    setResumeData({ ...resumeData, template });
    setShowTemplateMenu(false);
  };

  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="absolute left-1 top-1 flex flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />

        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />

        <div className="relative">
          <button
            onClick={() => setShowTemplateMenu((prev) => !prev)}
            className="rounded-md border bg-white p-2 text-sm shadow-sm"
          >
            <LayoutList size={20} />
          </button>

          {showTemplateMenu && (
            <div className="absolute z-20 mt-2 flex flex-col gap-2 rounded-md border bg-white p-2 shadow-md">
              <button
                onClick={() => handleTemplateSelect("default")}
                className={`rounded-md px-3 py-1 text-sm ${
                  resumeData.template === "default"
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                Default
              </button>

              <button
                onClick={() => handleTemplateSelect("jake")}
                className={`rounded-md px-3 py-1 text-sm ${
                  resumeData.template === "jake"
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                Jake
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex max-h-[calc(100vh-100px)] w-full justify-center overflow-y-auto bg-secondary p-3">
        {resumeData.template === "default" ? (
          <ResumePreview
            resumeData={resumeData}
            className="max-w-2xl shadow-md"
          />
        ) : (
          <JakeResumePreview
            resumeData={resumeData}
            className="max-w-2xl shadow-md"
          />
        )}
      </div>
    </div>
  );
}
