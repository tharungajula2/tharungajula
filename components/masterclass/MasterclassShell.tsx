"use client";

import React from "react";
import MasterclassReader from "./MasterclassReader";

export interface NavAnchor {
  id: string;
  label: string;
}

export interface MasterclassShellProps {
  category?: string;
  title: string;
  subtitle?: string;
  metadataLine?: string;
  snapshotItems?: { label: string; value: string }[];
  navAnchors?: NavAnchor[];
  children: React.ReactNode;
}

export default function MasterclassShell({
  title,
  subtitle = "",
  metadataLine,
  snapshotItems,
  children,
}: MasterclassShellProps) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]/g, "-");

  return (
    <MasterclassReader
      slug={slug}
      title={title}
      subtitle={subtitle}
      metadataLine={metadataLine}
      snapshotItems={snapshotItems}
    >
      {children}
    </MasterclassReader>
  );
}
