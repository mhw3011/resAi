"use client";

import useDimensions from "@/hooks/useDimensions";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { format as formatDate } from "date-fns";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { Github } from "lucide-react";

interface JakeProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function JakeResumePreview({
  resumeData,
  className,
  contentRef,
}: JakeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useDimensions(containerRef);

  return (
    <div
      ref={containerRef}
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white p-10 leading-tight text-black",
        className,
      )}
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        ref={contentRef}
        id="resumePreviewContent"
        className={cn(!width && "invisible")}
        style={{
          zoom: (1 / 794) * (width || 794),
        }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <ProjectsSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface SectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: SectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState<string>(
    photo instanceof File ? "" : (photo as string) || "",
  );

  useEffect(() => {
    if (photo instanceof File) {
      const url = URL.createObjectURL(photo);
      setPhotoSrc(url);
      return () => URL.revokeObjectURL(url);
    }
    if (photo === null) setPhotoSrc("");
  }, [photo]);

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex-1 text-center">
        <h1
          className="text-[26px] font-bold"
          style={{ color: colorHex || "black" }}
        >
          {firstName} {lastName}
        </h1>
        {jobTitle && <p className="mt-1 text-[13px] font-medium">{jobTitle}</p>}
        {(city || country) && (
          <p className="text-[12px] text-gray-700">
            {[city, country].filter(Boolean).join(", ")}
          </p>
        )}
        {(phone || email) && (
          <p className="text-[12px] text-gray-700">
            {[phone, email].filter(Boolean).join(" • ")}
          </p>
        )}
      </div>

      {photoSrc && (
        <Image
          src={photoSrc}
          alt="Profile Photo"
          height={70}
          width={70}
          className="border object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.CIRCLE
                ? "9999px"
                : borderStyle === BorderStyles.SQUARE
                  ? "0px"
                  : "10%",
          }}
        />
      )}
    </div>
  );
}

function SummarySection({ resumeData }: SectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    <section className="mb-5">
      <SectionHeader title="Profile" colorHex={colorHex} />
      <p className="mt-1 whitespace-pre-line text-[12px]">{summary}</p>
    </section>
  );
}

function WorkExperienceSection({ resumeData }: SectionProps) {
  const { workExperiences, colorHex } = resumeData;
  const validWork = workExperiences?.filter(
    (w) => Object.values(w).filter(Boolean).length > 0,
  );
  if (!validWork?.length) return null;

  return (
    <section className="mb-5">
      <SectionHeader title="Experience" colorHex={colorHex} />
      <div className="mt-2 space-y-3">
        {validWork.map((exp, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-[12px] font-semibold">
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(new Date(exp.startDate), "MM/yyyy")} –{" "}
                  {exp.endDate
                    ? formatDate(new Date(exp.endDate), "MM/yyyy")
                    : "Present"}
                </span>
              )}
            </div>
            {exp.company && (
              <p className="text-[11px] font-medium">{exp.company}</p>
            )}
            {exp.description && (
              <p className="mt-1 whitespace-pre-line text-[11px]">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({ resumeData }: SectionProps) {
  const { projects, colorHex } = resumeData;
  const validProjects = projects?.filter(
    (p) => Object.values(p).filter(Boolean).length > 0,
  );
  if (!validProjects?.length) return null;

  return (
    <section className="mb-5">
      <SectionHeader title="Projects" colorHex={colorHex} />
      <div className="mt-2 space-y-3">
        {validProjects.map((proj, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold">{proj.name}</p>
              {proj.link && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(proj.link, "_blank");
                  }}
                  className="text-gray-700 hover:text-black"
                >
                  <Github size={16} />
                </button>
              )}
            </div>
            {proj.techStack && (
              <p className="mt-0.5 text-[11px] italic text-gray-600">
                Tech Stack: {proj.techStack}
              </p>
            )}
            {proj.description && (
              <p className="mt-1 whitespace-pre-line text-[11px]">
                {proj.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection({ resumeData }: SectionProps) {
  const { educations, colorHex } = resumeData;
  const validEducations = educations?.filter(
    (e) => Object.values(e).filter(Boolean).length > 0,
  );
  if (!validEducations?.length) return null;

  return (
    <section className="mb-5">
      <SectionHeader title="Education" colorHex={colorHex} />
      <div className="mt-2 space-y-3">
        {validEducations.map((edu, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-[12px] font-semibold">
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {formatDate(new Date(edu.startDate), "MM/yyyy")}
                  {edu.endDate
                    ? ` – ${formatDate(new Date(edu.endDate), "MM/yyyy")}`
                    : ""}
                </span>
              )}
            </div>
            {edu.school && (
              <p className="text-[11px] font-medium">{edu.school}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsSection({ resumeData }: SectionProps) {
  const { skills, colorHex } = resumeData;
  if (!skills?.length) return null;

  return (
    <section className="mb-5">
      <SectionHeader title="Skills" colorHex={colorHex} />
      <div className="mt-2 grid grid-cols-3 gap-y-1 text-[12px]">
        {Array.from({ length: 3 }).map((_, colIndex) => (
          <ul key={colIndex} className="space-y-1">
            {skills
              .filter((_, idx) => idx % 3 === colIndex)
              .map((skill, idx) => (
                <li key={idx}>• {skill}</li>
              ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({
  title,
  colorHex,
}: {
  title: string;
  colorHex?: string;
}) {
  return (
    <h2
      className="relative mb-1 text-[15px] font-semibold uppercase"
      style={{ color: colorHex }}
    >
      {title}
      <span
        className="absolute bottom-0 left-0 h-[1px] bg-black"
        style={{ width: "calc(100% - 20px)", backgroundColor: colorHex }}
      />
    </h2>
  );
}
