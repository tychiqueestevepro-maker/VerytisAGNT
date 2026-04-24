"use client";

import React from "react";
import SolutionTemplate from "./SolutionTemplate";
import CaseStudySection from "../sections/CaseStudySection";

interface CaseStudyTemplateProps {
  title: string;
  description: string;
  before: {
    title: string;
    items: string[];
  };
  after: {
    title: string;
    items: string[];
  };
  workflow: {
    step: string;
    desc: string;
  }[];
}

export default function CaseStudyTemplate({
  title,
  description,
  before,
  after,
  workflow
}: CaseStudyTemplateProps) {
  return (
    <SolutionTemplate
      title={title}
      subtitle=""
      description={description}
      features={[]} // No extra features for now, focus on the case study
      footerSection={
        <CaseStudySection
          title={`Comment nous avons résolu ce défi`}
          description="Une immersion dans la transformation opérationnelle opérée par l'agent."
          before={before}
          after={after}
          workflow={workflow}
        />
      }
    />
  );
}
