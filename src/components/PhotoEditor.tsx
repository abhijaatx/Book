"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SizePreset } from "@/lib/products";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  LayoutGrid,
  Palette,
  Play,
  Plus,
  Redo2,
  Save,
  ShoppingCart,
  Sparkles,
  Trash2,
  Type,
  Undo2,
  Upload,
  X,
} from "lucide-react";

type ActivePanel = "images" | "text" | "layouts" | "backgrounds";
type ImageFilter = "none" | "grayscale" | "sepia";
type TextAlign = "left" | "center" | "right";
type FontOption = "classic" | "modern" | "editorial";

interface LayoutSlot {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  captionX?: number;
  captionY?: number;
  captionW?: number;
  captionH?: number;
}

interface LayoutPreset {
  id: string;
  label: string;
  slots: LayoutSlot[];
}

interface SlotContent {
  id: string;
  url: string | null;
  caption: string;
  zoom: number;
  offsetX: number;
  offsetY: number;
  filter: ImageFilter;
}

interface PageData {
  id: string;
  label: string;
  kind: "back-cover" | "front-cover" | "page";
  layoutId: string;
  background: string;
  textAlign: TextAlign;
  font: FontOption;
  slots: Record<string, SlotContent>;
}

interface TargetSelection {
  type: "slot" | "caption";
  pageId: string;
  slotId: string;
}

interface EditorSnapshot {
  uploadedPhotos: string[];
  pages: PageData[];
  currentView: number;
  selectedPageId: string;
  selectedTarget: TargetSelection | null;
}

interface CropDragState {
  pageId: string;
  slotId: string;
  startX: number;
  startY: number;
  initialOffsetX: number;
  initialOffsetY: number;
}

export interface PhotoEditorProps {
  initialPhotos?: string[];
  projectName?: string;
  coverTitle?: string;
  sizePreset: SizePreset;
  onBack?: () => void;
  onContinue?: () => void;
  onUpdate: (photos: string[], layoutData: unknown) => void;
}

const PAGE_BACKGROUND = "#FFFDF5";
const PAGE_SAFE_BORDER = "#D4AF37";

const FONT_MAP: Record<FontOption, string> = {
  classic: "'Times New Roman', serif",
  modern: "Inter, Arial, sans-serif",
  editorial: "Georgia, serif",
};

const LAYOUTS: LayoutPreset[] = [
  {
    id: "front-cover-square",
    label: "Front Cover",
    slots: [
      {
        id: "a",
        x: 31,
        y: 31,
        w: 38,
        h: 38,
      },
    ],
  },
  {
    id: "single",
    label: "Single Photo",
    slots: [
      { id: "a", x: 15, y: 15, w: 70, h: 70 },
    ],
  },
  {
    id: "single-caption",
    label: "Single Photo + Caption",
    slots: [
      {
        id: "a",
        x: 18,
        y: 12.5,
        w: 64,
        h: 64,
        captionX: 18,
        captionY: 78.5,
        captionW: 64,
        captionH: 9,
      },
    ],
  },
  {
    id: "two-side",
    label: "Two Side",
    slots: [
      { id: "a", x: 12, y: 18, w: 35, h: 64 },
      { id: "b", x: 53, y: 18, w: 35, h: 64 },
    ],
  },
  {
    id: "two-side-caption",
    label: "Two Side + Caption",
    slots: [
      {
        id: "a",
        x: 13.5,
        y: 18,
        w: 33,
        h: 54,
        captionX: 13.5,
        captionY: 74,
        captionW: 33,
        captionH: 8,
      },
      {
        id: "b",
        x: 53.5,
        y: 18,
        w: 33,
        h: 54,
        captionX: 53.5,
        captionY: 74,
        captionW: 33,
        captionH: 8,
      },
    ],
  },
  {
    id: "portrait",
    label: "Portrait",
    slots: [
      { id: "a", x: 20, y: 10, w: 60, h: 80 },
    ],
  },
  {
    id: "portrait-right-caption",
    label: "Portrait + Caption",
    slots: [
      {
        id: "a",
        x: 22,
        y: 11,
        w: 56,
        h: 68,
        captionX: 22,
        captionY: 81,
        captionW: 56,
        captionH: 8,
      },
    ],
  },
  {
    id: "two-tall",
    label: "Two Tall",
    slots: [
      { id: "a", x: 10, y: 10, w: 38, h: 80 },
      { id: "b", x: 52, y: 10, w: 38, h: 80 },
    ],
  },
  {
    id: "two-tall-caption",
    label: "Two Tall + Caption",
    slots: [
      {
        id: "a",
        x: 11,
        y: 10.5,
        w: 35,
        h: 70,
        captionX: 11,
        captionY: 82.5,
        captionW: 35,
        captionH: 7,
      },
      {
        id: "b",
        x: 54,
        y: 10.5,
        w: 35,
        h: 70,
        captionX: 54,
        captionY: 82.5,
        captionW: 35,
        captionH: 7,
      },
    ],
  },
  {
    id: "wide",
    label: "Wide",
    slots: [
      { id: "a", x: 10, y: 20, w: 80, h: 60 },
    ],
  },
  {
    id: "wide-caption",
    label: "Wide + Caption",
    slots: [
      {
        id: "a",
        x: 13,
        y: 18.5,
        w: 74,
        h: 52,
        captionX: 13,
        captionY: 72.5,
        captionW: 74,
        captionH: 9,
      },
    ],
  },
  {
    id: "four-grid",
    label: "Four Grid",
    slots: [
      { id: "a", x: 10.5, y: 15, w: 36, h: 33 },
      { id: "b", x: 53.5, y: 15, w: 36, h: 33 },
      { id: "c", x: 10.5, y: 52, w: 36, h: 33 },
      { id: "d", x: 53.5, y: 52, w: 36, h: 33 },
    ],
  },
  {
    id: "four-grid-caption",
    label: "Four Grid + Caption",
    slots: [
      {
        id: "a",
        x: 11,
        y: 11,
        w: 35,
        h: 27,
        captionX: 11,
        captionY: 40,
        captionW: 35,
        captionH: 6,
      },
      {
        id: "b",
        x: 54,
        y: 11,
        w: 35,
        h: 27,
        captionX: 54,
        captionY: 40,
        captionW: 35,
        captionH: 6,
      },
      {
        id: "c",
        x: 11,
        y: 53.5,
        w: 35,
        h: 27,
        captionX: 11,
        captionY: 82.5,
        captionW: 35,
        captionH: 6,
      },
      {
        id: "d",
        x: 54,
        y: 53.5,
        w: 35,
        h: 27,
        captionX: 54,
        captionY: 82.5,
        captionW: 35,
        captionH: 6,
      },
    ],
  },
  {
    id: "three-mix",
    label: "Mixed",
    slots: [
      { id: "a", x: 15, y: 15, w: 33, h: 33 },
      { id: "b", x: 52, y: 15, w: 33, h: 33 },
      { id: "c", x: 15, y: 52, w: 70, h: 33 },
    ],
  },
  {
    id: "three-mix-caption",
    label: "Mixed + Caption",
    slots: [
      {
        id: "a",
        x: 15.5,
        y: 13,
        w: 31,
        h: 28,
        captionX: 15.5,
        captionY: 43,
        captionW: 31,
        captionH: 7,
      },
      {
        id: "b",
        x: 53.5,
        y: 13,
        w: 31,
        h: 28,
        captionX: 53.5,
        captionY: 43,
        captionW: 31,
        captionH: 7,
      },
      {
        id: "c",
        x: 17,
        y: 53,
        w: 66,
        h: 24,
        captionX: 17,
        captionY: 79,
        captionW: 66,
        captionH: 8,
      },
    ],
  },
  {
    id: "square",
    label: "Square",
    slots: [
      { id: "a", x: 21, y: 21, w: 58, h: 58 },
    ],
  },
  {
    id: "square-caption",
    label: "Square + Caption",
    slots: [
      {
        id: "a",
        x: 24,
        y: 13.5,
        w: 52,
        h: 52,
        captionX: 24,
        captionY: 67.5,
        captionW: 52,
        captionH: 8,
      },
    ],
  },
  {
    id: "two-stacked",
    label: "Two Stacked",
    slots: [
      { id: "a", x: 18, y: 12, w: 64, h: 36 },
      { id: "b", x: 18, y: 52, w: 64, h: 36 },
    ],
  },
  {
    id: "two-stacked-caption",
    label: "Two Stacked + Caption",
    slots: [
      {
        id: "a",
        x: 20,
        y: 8,
        w: 60,
        h: 28,
        captionX: 20,
        captionY: 38,
        captionW: 60,
        captionH: 7,
      },
      {
        id: "b",
        x: 20,
        y: 57,
        w: 60,
        h: 28,
        captionX: 20,
        captionY: 87,
        captionW: 60,
        captionH: 7,
      },
    ],
  },
  {
    id: "three-columns",
    label: "Three Columns",
    slots: [
      { id: "a", x: 8, y: 15, w: 26, h: 70 },
      { id: "b", x: 37, y: 15, w: 26, h: 70 },
      { id: "c", x: 66, y: 15, w: 26, h: 70 },
    ],
  },
  {
    id: "three-columns-caption",
    label: "Three Columns + Caption",
    slots: [
      {
        id: "a",
        x: 9,
        y: 18.5,
        w: 23,
        h: 54,
        captionX: 9,
        captionY: 74.5,
        captionW: 23,
        captionH: 7,
      },
      {
        id: "b",
        x: 38.5,
        y: 18.5,
        w: 23,
        h: 54,
        captionX: 38.5,
        captionY: 74.5,
        captionW: 23,
        captionH: 7,
      },
      {
        id: "c",
        x: 68,
        y: 18.5,
        w: 23,
        h: 54,
        captionX: 68,
        captionY: 74.5,
        captionW: 23,
        captionH: 7,
      },
    ],
  },
  {
    id: "hero-two-small",
    label: "Hero + Two",
    slots: [
      { id: "a", x: 10, y: 12, w: 80, h: 36 },
      { id: "b", x: 10, y: 52, w: 38, h: 36 },
      { id: "c", x: 52, y: 52, w: 38, h: 36 },
    ],
  },
  {
    id: "hero-two-small-caption",
    label: "Hero + Two + Caption",
    slots: [
      {
        id: "a",
        x: 13,
        y: 8.5,
        w: 74,
        h: 34,
        captionX: 13,
        captionY: 44.5,
        captionW: 74,
        captionH: 7,
      },
      {
        id: "b",
        x: 13,
        y: 56.5,
        w: 35,
        h: 23,
        captionX: 13,
        captionY: 81.5,
        captionW: 35,
        captionH: 7,
      },
      {
        id: "c",
        x: 52,
        y: 56.5,
        w: 35,
        h: 23,
        captionX: 52,
        captionY: 81.5,
        captionW: 35,
        captionH: 7,
      },
    ],
  },
  {
    id: "left-hero-right-stack",
    label: "Hero + Stack",
    slots: [
      { id: "a", x: 8, y: 10, w: 44, h: 80 },
      { id: "b", x: 60, y: 10, w: 32, h: 39 },
      { id: "c", x: 60, y: 51, w: 32, h: 39 },
    ],
  },
  {
    id: "left-hero-right-stack-caption",
    label: "Hero + Stack + Caption",
    slots: [
      {
        id: "a",
        x: 8,
        y: 10,
        w: 44,
        h: 71,
        captionX: 8,
        captionY: 83,
        captionW: 44,
        captionH: 7,
      },
      {
        id: "b",
        x: 60,
        y: 10,
        w: 32,
        h: 31,
        captionX: 60,
        captionY: 43,
        captionW: 32,
        captionH: 6,
      },
      {
        id: "c",
        x: 60,
        y: 51,
        w: 32,
        h: 31,
        captionX: 60,
        captionY: 84,
        captionW: 32,
        captionH: 6,
      },
    ],
  },
  {
    id: "top-two-bottom-wide",
    label: "Two + Wide",
    slots: [
      { id: "a", x: 10, y: 15, w: 38, h: 30 },
      { id: "b", x: 52, y: 15, w: 38, h: 30 },
      { id: "c", x: 10, y: 50, w: 80, h: 35 },
    ],
  },
  {
    id: "top-two-bottom-wide-caption",
    label: "Two + Wide + Caption",
    slots: [
      {
        id: "a",
        x: 11,
        y: 13.5,
        w: 35,
        h: 24,
        captionX: 11,
        captionY: 39.5,
        captionW: 35,
        captionH: 6,
      },
      {
        id: "b",
        x: 54,
        y: 13.5,
        w: 35,
        h: 24,
        captionX: 54,
        captionY: 39.5,
        captionW: 35,
        captionH: 6,
      },
      {
        id: "c",
        x: 13,
        y: 54,
        w: 74,
        h: 28,
        captionX: 13,
        captionY: 84,
        captionW: 74,
        captionH: 7,
      },
    ],
  },
  {
    id: "mosaic-five",
    label: "Mosaic",
    slots: [
      { id: "a", x: 13, y: 15, w: 40, h: 31 },
      { id: "b", x: 57, y: 15, w: 30, h: 20 },
      { id: "c", x: 57, y: 38, w: 30, h: 20 },
      { id: "d", x: 13, y: 51, w: 24, h: 28 },
      { id: "e", x: 40, y: 51, w: 47, h: 28 },
    ],
  },
  {
    id: "mosaic-five-caption",
    label: "Mosaic + Caption",
    slots: [
      { id: "a", x: 13, y: 12, w: 40, h: 28, captionX: 13, captionY: 41, captionW: 40, captionH: 6 },
      { id: "b", x: 57, y: 12, w: 30, h: 18, captionX: 57, captionY: 31, captionW: 30, captionH: 5 },
      { id: "c", x: 57, y: 40, w: 30, h: 18, captionX: 57, captionY: 59, captionW: 30, captionH: 5 },
      { id: "d", x: 13, y: 51, w: 24, h: 26, captionX: 13, captionY: 78, captionW: 24, captionH: 6 },
      { id: "e", x: 40, y: 51, w: 47, h: 26, captionX: 40, captionY: 78, captionW: 47, captionH: 6 },
    ],
  },
  {
    id: "blank-text",
    label: "Text Only",
    slots: [],
  },
];

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function slotFromDefinition(definition: LayoutSlot, existing?: SlotContent): SlotContent {
  return {
    id: existing?.id ?? uid("slot"),
    url: existing?.url ?? null,
    caption: existing?.caption ?? "Add photo caption here or delete if you prefer",
    zoom: existing?.zoom ?? 1,
    offsetX: existing?.offsetX ?? 0,
    offsetY: existing?.offsetY ?? 0,
    filter: existing?.filter ?? "none",
  };
}

function createPage(label: string, layoutId: string, kind: PageData["kind"] = "page"): PageData {
  const layout = LAYOUTS.find((item) => item.id === layoutId) ?? LAYOUTS[0];
  return {
    id: uid("page"),
    label,
    kind,
    layoutId,
    background: PAGE_BACKGROUND,
    textAlign: "left",
    font: "classic",
    slots: Object.fromEntries(layout.slots.map((slot) => [slot.id, slotFromDefinition(slot)])),
  };
}

function createInitialPages() {
  return [
    createPage("Back Cover", "blank-text", "back-cover"),
    createPage("Front Cover", "front-cover-square", "front-cover"),
    createPage("Page 1", "single-caption"),
    createPage("Page 2", "single-caption"),
    createPage("Page 3", "portrait-right-caption"),
    createPage("Page 4", "two-side-caption"),
    createPage("Page 5", "single-caption"),
    createPage("Page 6", "two-side-caption"),
    createPage("Page 7", "wide-caption"),
    createPage("Page 8", "single-caption"),
  ];
}

function getEditorMetrics(sizePreset: SizePreset, visiblePageCount: number, isMobile: boolean = false) {
  const baseHeight = isMobile ? 320 : 400; // Consistent height regardless of page count
  const pageHeight = Math.round(baseHeight * sizePreset.editorScale);
  const pageWidth = Math.round(pageHeight * sizePreset.pageAspectRatio);
  const thumbnailHeight = Math.max(48, Math.round(58 * sizePreset.editorScale));
  const thumbnailWidth = Math.round(thumbnailHeight * sizePreset.pageAspectRatio);

  return {
    pageHeight,
    pageWidth,
    thumbnailHeight,
    thumbnailWidth,
  };
}

function buildViewRanges(pages: PageData[], isMobile: boolean = false) {
  if (isMobile) {
    return pages.map((page, index) => ({
      id: page.id,
      label: page.label,
      pageIndices: [index],
    }));
  }

  if (pages.length < 3) {
    return [{ id: "covers", label: "Covers", pageIndices: [0, 1] }];
  }

  const ranges = [{ id: "covers", label: "Covers", pageIndices: [0, 1] }, { id: pages[2].id, label: pages[2].label, pageIndices: [2] }];
  for (let index = 3; index < pages.length; index += 2) {
    ranges.push({
      id: `spread-${index}`,
      label: `${pages[index].label}${pages[index + 1] ? ` / ${pages[index + 1].label}` : ""}`,
      pageIndices: [index, index + 1].filter((pageIndex) => pageIndex < pages.length),
    });
  }
  return ranges;
}

function pageScaleFilter(filter: ImageFilter) {
  if (filter === "grayscale") {
    return "grayscale(1)";
  }
  if (filter === "sepia") {
    return "sepia(1)";
  }
  return "none";
}

function LayoutPreview({ layout }: { layout: LayoutPreset }) {
  return (
    <div className="relative h-full w-full rounded-sm bg-white">
      {layout.slots.map((slot) => (
        <div key={slot.id}>
          <div
            className="absolute rounded-[2px] bg-[#d8d8d8]"
            style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}%`, height: `${slot.h}%` }}
          />
          {slot.captionW ? (
            <div
              className="absolute rounded-[2px] border border-dashed border-[#d5d5d5]"
              style={{ left: `${slot.captionX}%`, top: `${slot.captionY}%`, width: `${slot.captionW}%`, height: `${slot.captionH}%` }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ThumbnailPreview({ page }: { page: PageData }) {
  const layout = LAYOUTS.find((item) => item.id === page.layoutId) ?? LAYOUTS[0];
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#fbf5e8]">
      {layout.slots.map((slot) => {
        const content = page.slots[slot.id];
        return (
          <div
            key={slot.id}
            className="absolute overflow-hidden bg-[#d8d8d8]"
            style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}%`, height: `${slot.h}%` }}
          >
            {content?.url ? (
              <img
                src={content.url}
                alt=""
                className="h-full w-full object-cover"
                style={{
                  transform: `translate(${content.offsetX}%, ${content.offsetY}%) scale(${content.zoom})`,
                  filter: pageScaleFilter(content.filter),
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function PageCanvas({
  page,
  coverTitle,
  sizePreset,
  selectedTarget,
  onSelectSlot,
  onSelectCaption,
  onDropOnSlot,
}: {
  page: PageData;
  coverTitle: string;
  sizePreset: SizePreset;
  selectedTarget: TargetSelection | null;
  onSelectSlot: (slotId: string) => void;
  onSelectCaption: (slotId: string) => void;
  onDropOnSlot: (slotId: string, url: string) => void;
}) {
  const layout = LAYOUTS.find((item) => item.id === page.layoutId) ?? LAYOUTS[0];
  const isLandscape = sizePreset.pageAspectRatio > 1.05;

  const renderCovers = () => {
    if (page.kind === "back-cover") {
      return (
        <div className="absolute inset-0 overflow-hidden bg-[#FFFDF5]">
          <div className="absolute left-[4%] top-[4%] h-[92%] w-[92%] border border-[rgba(212,175,55,0.3)]" />
          <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center">
            <p className="font-serif text-[16px] font-semibold italic text-[#8B0000]">Kahaani</p>
          </div>
        </div>
      );
    }
    if (page.kind === "front-cover") {
      return (
        <div className="absolute inset-0 overflow-hidden bg-[#FFFDF5]">
          <div className="absolute left-[4%] top-[4%] h-[92%] w-[92%] border border-[rgba(212,175,55,0.3)]" />
          <div className="absolute left-[4.8%] top-[4.4%] text-[8px] font-semibold lowercase tracking-wide text-[#D4AF37]">safe-area</div>
          <div className={`absolute left-[49%] top-[16%] -translate-x-1/2 text-center font-serif leading-[0.92] text-[#8B0000] ${isLandscape ? "max-w-[46%] text-[38px]" : "max-w-[34%] text-[50px]"}`}>
            {coverTitle}
          </div>
          <div className={`absolute bottom-[18%] left-[49%] -translate-x-1/2 font-semibold uppercase tracking-[0.28em] text-[#D4AF37] ${isLandscape ? "text-[9px]" : "text-[11px]"}`}>
            thank you for everything
          </div>
        </div>
      );
    }
    return <div className="absolute inset-0 bg-[#FFFDF5]">
      <div className="absolute left-[4%] top-[4%] h-[92%] w-[92%] border border-[rgba(212,175,55,0.3)]" />
      <div className="absolute left-[4.8%] top-[4.4%] text-[8px] font-semibold lowercase tracking-wide text-[#D4AF37]">safe-area</div>
    </div>;
  };

  return (
    <div className="relative h-full w-full">
      {renderCovers()}

      {layout.slots.map((slot) => {
        const content = page.slots[slot.id];
        const slotSelected = selectedTarget?.type === "slot" && selectedTarget.pageId === page.id && selectedTarget.slotId === slot.id;
        const captionSelected =
          selectedTarget?.type === "caption" && selectedTarget.pageId === page.id && selectedTarget.slotId === slot.id;

        return (
          <div key={slot.id}>
            <div
              className={`absolute overflow-hidden border border-dashed ${slotSelected ? "border-[#8d8d8d] shadow-[0_0_0_1px_rgba(70,70,70,0.3)]" : "border-[#dddddd]"}`}
              style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}%`, height: `${slot.h}%` }}
              onClick={(event) => {
                event.stopPropagation();
                onSelectSlot(slot.id);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const url = event.dataTransfer.getData("photo-url");
                if (url) {
                  onDropOnSlot(slot.id, url);
                }
              }}
            >
              {content?.url ? (
                <img
                  src={content.url}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{
                    transform: `translate(${content.offsetX}%, ${content.offsetY}%) scale(${content.zoom})`,
                    filter: pageScaleFilter(content.filter),
                  }}
                />
              ) : (
                <div className="h-full w-full bg-[#d8d8d8]" />
              )}
            </div>

            {slot.captionW ? (
              <button
                type="button"
                className={`absolute overflow-hidden border-2 border-dashed bg-white/60 text-left transition-all ${captionSelected ? "border-primary shadow-lg scale-[1.02] z-30" : "border-foreground/10 hover:border-primary/40"}`}
                style={{
                  left: `${slot.captionX}%`,
                  top: `${slot.captionY}%`,
                  width: `${slot.captionW}%`,
                  height: `${slot.captionH}%`,
                  fontFamily: FONT_MAP[page.font],
                  textAlign: page.textAlign,
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelectCaption(slot.id);
                }}
              >
                <span className="block px-2 py-1 text-[10px] font-medium leading-tight text-foreground/80">{content.caption || "Click to add text..."}</span>
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function PhotoEditor({
  initialPhotos = [],
  projectName = "Medium Photobook",
  coverTitle = "you&me",
  sizePreset,
  onBack,
  onContinue,
  onUpdate,
}: PhotoEditorProps) {
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(initialPhotos);
  const [pages, setPages] = useState<PageData[]>(() => createInitialPages());
  const [currentView, setCurrentView] = useState(1);
  const [selectedPageId, setSelectedPageId] = useState<string>("");
  const [selectedTarget, setSelectedTarget] = useState<TargetSelection | null>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>("layouts");
  const [undoStack, setUndoStack] = useState<EditorSnapshot[]>([]);
  const [redoStack, setRedoStack] = useState<EditorSnapshot[]>([]);
  const [zoom, setZoom] = useState(1);
  const [activeMobilePanel, setActiveMobilePanel] = useState<"none" | "library" | "layouts" | "text" | "backgrounds">("none");
  const [libraryColumns, setLibraryColumns] = useState<2 | 3>(2);
  const [cropDrag, setCropDrag] = useState<CropDragState | null>(null);
  const slotDragBounds = useRef<Record<string, DOMRect>>({});
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const views = useMemo(() => buildViewRanges(pages, isMobile), [pages, isMobile]);

  useEffect(() => {
    const firstEditablePage = pages[2] ?? pages[1] ?? pages[0];
    if (firstEditablePage && !selectedPageId) {
      setSelectedPageId(firstEditablePage.id);
    }
  }, [pages, selectedPageId]);

  useEffect(() => {
    // Only sync if actual content has changed (simple check)
    onUpdate(uploadedPhotos, { pages, currentView, selectedPageId, selectedTarget });
  }, [uploadedPhotos, pages, currentView, selectedPageId, selectedTarget, onUpdate]);

  useEffect(() => {
    return () => {
      uploadedPhotos.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [uploadedPhotos]);

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      if (!cropDrag) {
        return;
      }

      const key = `${cropDrag.pageId}:${cropDrag.slotId}`;
      const bounds = slotDragBounds.current[key];
      if (!bounds) {
        return;
      }

      const deltaX = ((event.clientX - cropDrag.startX) / bounds.width) * 100;
      const deltaY = ((event.clientY - cropDrag.startY) / bounds.height) * 100;

      setPages((currentPages) =>
        currentPages.map((page) => {
          if (page.id !== cropDrag.pageId) {
            return page;
          }
          return {
            ...page,
            slots: {
              ...page.slots,
              [cropDrag.slotId]: {
                ...page.slots[cropDrag.slotId],
                offsetX: Math.max(-60, Math.min(60, cropDrag.initialOffsetX + deltaX)),
                offsetY: Math.max(-60, Math.min(60, cropDrag.initialOffsetY + deltaY)),
              },
            },
          };
        }),
      );
    }

    function handleUp() {
      setCropDrag(null);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [cropDrag]);

  function snapshot(): EditorSnapshot {
    return {
      uploadedPhotos: clone(uploadedPhotos),
      pages: clone(pages),
      currentView,
      selectedPageId,
      selectedTarget: clone(selectedTarget),
    };
  }

  function pushHistory() {
    setUndoStack((current) => [...current.slice(-39), snapshot()]);
    setRedoStack([]);
  }

  function restoreSnapshot(state: EditorSnapshot) {
    setUploadedPhotos(state.uploadedPhotos);
    setPages(state.pages);
    setCurrentView(state.currentView);
    setSelectedPageId(state.selectedPageId);
    setSelectedTarget(state.selectedTarget);
  }

  function updatePage(pageId: string, updater: (page: PageData) => PageData) {
    pushHistory();
    setPages((currentPages) => currentPages.map((page) => (page.id === pageId ? updater(page) : page)));
  }

  function appendFiles(files: FileList | File[]) {
    const nextUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    if (nextUrls.length === 0) {
      return;
    }
    pushHistory();
    setUploadedPhotos((current) => [...current, ...nextUrls]);
  }

  function applyLayout(pageId: string, layoutId: string) {
    const nextLayout = LAYOUTS.find((item) => item.id === layoutId);
    if (!nextLayout) {
      return;
    }

    updatePage(pageId, (page) => {
      if (page.kind !== "page") {
        return page;
      }
      const existingSlots = Object.values(page.slots);
      return {
        ...page,
        layoutId,
        slots: Object.fromEntries(
          nextLayout.slots.map((slot, index) => [slot.id, slotFromDefinition(slot, existingSlots[index])]),
        ),
      };
    });
  }

  function selectFirstEditablePageForView(viewIndex: number) {
    const nextRange = views[viewIndex];
    if (!nextRange) {
      return;
    }
    const nextPageIndex = nextRange.pageIndices.find((index) => pages[index]?.kind !== "back-cover") ?? nextRange.pageIndices[0];
    const nextPage = pages[nextPageIndex];
    if (nextPage) {
      setSelectedPageId(nextPage.id);
      setSelectedTarget(null);
    }
  }

  function placePhotoOnPage(pageId: string, slotId: string, url: string) {
    updatePage(pageId, (page) => ({
      ...page,
      slots: {
        ...page.slots,
        [slotId]: {
          ...page.slots[slotId],
          url,
        },
      },
    }));
    setSelectedPageId(pageId);
    setSelectedTarget({ type: "slot", pageId, slotId });
  }

  function placePhoto(url: string) {
    const page = pages.find((item) => item.id === selectedPageId) ?? pages[2] ?? pages[1];
    if (!page) {
      return;
    }
    const slots = Object.entries(page.slots);
    const firstEmpty = slots.find(([, slot]) => !slot.url)?.[0] ?? slots[0]?.[0];
    if (!firstEmpty) {
      return;
    }
    placePhotoOnPage(page.id, firstEmpty, url);
  }

  function autofillPages() {
    if (uploadedPhotos.length === 0) {
      return;
    }

    pushHistory();
    let photoIndex = 0;
    setPages((currentPages) =>
      currentPages.map((page) => {
        if (page.kind === "back-cover") {
          return page;
        }
        const nextSlots = { ...page.slots };
        Object.keys(nextSlots).forEach((slotId) => {
          if (!nextSlots[slotId].url && uploadedPhotos[photoIndex]) {
            nextSlots[slotId] = { ...nextSlots[slotId], url: uploadedPhotos[photoIndex] };
            photoIndex += 1;
          }
        });
        return { ...page, slots: nextSlots };
      }),
    );
  }

  function addPage() {
    pushHistory();
    setPages((currentPages) => {
      const firstPageNumber = currentPages.length - 1;
      return [
        ...currentPages,
        createPage(`Page ${firstPageNumber}`, "single-caption"),
        createPage(`Page ${firstPageNumber + 1}`, "two-side-caption"),
      ];
    });
  }

  function deleteSelectedPage() {
    const selectedIndex = pages.findIndex((page) => page.id === selectedPageId);
    if (selectedIndex < 2) {
      return;
    }

    pushHistory();
    const nextPages = pages.filter((page) => page.id !== selectedPageId);
    setPages(nextPages);
    const nextIndex = Math.max(2, selectedIndex - 1);
    setSelectedPageId(nextPages[nextIndex]?.id ?? nextPages[nextPages.length - 1]?.id ?? "");
    setSelectedTarget(null);
  }

  function currentPage() {
    return pages.find((page) => page.id === selectedPageId) ?? pages[2] ?? pages[1] ?? pages[0];
  }

  const activePage = currentPage();
  const activeLayout = LAYOUTS.find((item) => item.id === activePage?.layoutId) ?? LAYOUTS[0];
  const selectedSlot =
    selectedTarget?.type === "slot" || selectedTarget?.type === "caption"
      ? activePage?.slots[selectedTarget.slotId]
      : null;

  function updateSelectedSlot(updater: (slot: SlotContent) => SlotContent) {
    if (!selectedTarget || !activePage) {
      return;
    }
    updatePage(activePage.id, (page) => ({
      ...page,
      slots: {
        ...page.slots,
        [selectedTarget.slotId]: updater(page.slots[selectedTarget.slotId]),
      },
    }));
  }

  function updateCaptionText(value: string) {
    if (!selectedTarget || !activePage) {
      return;
    }
    setPages((currentPages) =>
      currentPages.map((page) =>
        page.id === activePage.id
          ? {
              ...page,
              slots: {
                ...page.slots,
                [selectedTarget.slotId]: {
                  ...page.slots[selectedTarget.slotId],
                  caption: value,
                },
              },
            }
          : page,
      ),
    );
  }

  function setPageTextAlign(value: TextAlign) {
    if (!activePage) {
      return;
    }
    updatePage(activePage.id, (page) => ({ ...page, textAlign: value }));
  }

  function setPageFont(value: FontOption) {
    if (!activePage) {
      return;
    }
    updatePage(activePage.id, (page) => ({ ...page, font: value }));
  }

  const view = views[currentView] ?? views[1] ?? views[0];
  const visiblePages = view.pageIndices.map((index) => pages[index]).filter(Boolean);
  const editorMetrics = getEditorMetrics(sizePreset, visiblePages.length, isMobile);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-secondary/20">
      <div className="flex h-20 items-center justify-between border-b border-border/50 bg-white px-8">
        <div className="min-w-[160px] text-[24px] font-black uppercase tracking-tighter text-foreground">Kahaani</div>
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40">{projectName}</p>
        </div>
        <div className="flex min-w-[250px] items-center justify-end gap-6">
          <div className="hidden items-center gap-4 text-[10px] font-black uppercase tracking-widest text-foreground/30 md:flex">
            <span className="text-primary animate-pulse">●</span>
            <span>Cloud Saved</span>
            <Save className="h-4 w-4" />
          </div>
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex h-12 items-center gap-3 rounded-full bg-primary-pressed px-8 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary-pressed/20 transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" />
            Checkout
            <ChevronRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={onBack} className="text-foreground/40 hover:text-primary transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col md:grid md:grid-cols-[280px_1fr_300px]">
        {/* Left Sidebar - Library */}
        <aside
          className={`absolute inset-y-0 left-0 z-50 w-[280px] border-r border-border/50 bg-white shadow-2xl transition-transform duration-300 md:relative md:z-0 md:w-full md:translate-x-0 md:shadow-none ${activeMobilePanel === "library" ? "translate-x-0" : "-translate-x-full"}`}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            if (event.dataTransfer.files.length > 0) {
              appendFiles(event.dataTransfer.files);
            }
          }}
        >
          <div className="flex items-center justify-between border-b border-border/50 px-5 py-6">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30">Library</div>
            <button type="button" onClick={() => setActiveMobilePanel("none")} className="p-2 text-foreground/30 md:hidden">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
            {uploadedPhotos.length === 0 ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-border/50 px-8 text-center bg-secondary/10">
                <Upload className="mb-8 h-12 w-12 text-primary/30" />
                <p className="max-w-[170px] text-[11px] font-bold uppercase tracking-widest leading-loose text-foreground/30">Drag your memories here to start</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-primary-pressed px-10 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary-pressed/20 transition-all hover:scale-105 active:scale-95"
                >
                  Upload photos
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-foreground/40">
                  <button type="button" onClick={autofillPages} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Sparkles className="h-3 w-3" />
                    Autofill
                  </button>
                  <div className="flex items-center gap-2">
                    {[2, 3].map((columns) => (
                      <button
                        key={columns}
                        type="button"
                        onClick={() => setLibraryColumns(columns as 2 | 3)}
                        className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${libraryColumns === columns ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-secondary/30 text-foreground/40 hover:bg-secondary/50"}`}
                      >
                        {columns === 2 ? "◫" : "▦"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={`grid gap-4 ${libraryColumns === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                  {uploadedPhotos.map((photo, index) => (
                    <button
                      key={`${photo}-${index}`}
                      type="button"
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.setData("photo-url", photo);
                      }}
                      onClick={() => {
                        placePhoto(photo);
                        if (window.innerWidth < 768) setActiveMobilePanel("none");
                      }}
                      className="group relative"
                    >
                      <div className="aspect-square overflow-hidden rounded-[1rem] border-2 border-border/20 bg-secondary/10 transition-all group-hover:scale-105 group-hover:border-primary group-hover:shadow-xl shadow-primary/10">
                        <img src={photo} alt="" className="h-full w-full object-cover p-1 rounded-[0.8rem]" />
                      </div>
                      <div className="absolute top-2 right-2 h-4 w-4 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform flex items-center justify-center text-[8px] text-white font-black">+</div>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-secondary/30 px-6 text-[11px] font-black uppercase tracking-[0.2em] text-foreground hover:bg-secondary/50 transition-all"
                >
                  <Plus className="h-4 w-4" />
                   Add more
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                if (event.target.files) {
                  appendFiles(event.target.files);
                }
                event.target.value = "";
              }}
            />
          </div>
        </aside>

        <section className="relative flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between px-5 py-3 md:py-3">
            <div className="flex items-center gap-4 text-[#9c9c9c] md:gap-6">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 hover:bg-secondary/20 transition-all active:scale-90"
                onClick={() => {
                  const previous = undoStack[undoStack.length - 1];
                  if (!previous) return;
                  setUndoStack((current) => current.slice(0, -1));
                  setRedoStack((current) => [...current, snapshot()]);
                  restoreSnapshot(previous);
                }}
              >
                <Undo2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 hover:bg-secondary/20 transition-all active:scale-90"
                onClick={() => {
                  const next = redoStack[redoStack.length - 1];
                  if (!next) return;
                  setRedoStack((current) => current.slice(0, -1));
                  setUndoStack((current) => [...current, snapshot()]);
                  restoreSnapshot(next);
                }}
              >
                <Redo2 className="h-4 w-4" />
              </button>
            </div>

            {/* Desktop Zoom - Hidden on Mobile */}
            <div className="hidden items-center gap-3 text-[#9a9a9a] md:flex">
              <button type="button" onClick={() => setZoom((current) => Math.max(0.7, current - 0.1))}>
                -
              </button>
              <input
                type="range"
                min="0.7"
                max="1.3"
                step="0.05"
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                className="w-24 accent-[#bbb]"
              />
              <button type="button" onClick={() => setZoom((current) => Math.min(1.3, current + 0.1))}>
                +
              </button>
            </div>

            {/* Mobile Header Actions */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                type="button"
                onClick={() => setActiveMobilePanel("layouts")}
                className="flex h-10 items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 text-[10px] font-black uppercase tracking-widest text-primary active:scale-95 transition-all"
              >
                <LayoutGrid className="h-3 w-3" />
                Patterns
              </button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden px-4 pb-4 md:px-7">
            <button
              type="button"
              disabled={currentView === 0}
              onClick={() => {
                const next = Math.max(0, currentView - 1);
                setCurrentView(next);
                selectFirstEditablePageForView(next);
              }}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 text-[#95a1af] disabled:opacity-30 md:left-3"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <button
              type="button"
              disabled={currentView >= views.length - 1}
              onClick={() => {
                const next = Math.min(views.length - 1, currentView + 1);
                setCurrentView(next);
                selectFirstEditablePageForView(next);
              }}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 text-[#95a1af] disabled:opacity-30"
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            <div className="flex h-full items-center justify-center overflow-auto">
              <div
                className={`flex items-center justify-center ${visiblePages.length === 1 ? "" : "gap-2"} origin-center transition-transform`}
                style={{ transform: `scale(${zoom})` }}
              >
                {visiblePages.map((page) => {
                  const layout = LAYOUTS.find((item) => item.id === page.layoutId) ?? LAYOUTS[0];
                  return (
                    <div
                      key={page.id}
                      className="flex flex-col items-center"
                      onClick={() => setSelectedPageId(page.id)}
                    >
                      <div
                        className={`relative bg-white shadow-[0_2px_10px_rgba(0,0,0,0.18)] ${page.id === selectedPageId ? "ring-1 ring-[#888]" : ""}`}
                        style={{ width: `${editorMetrics.pageWidth}px`, height: `${editorMetrics.pageHeight}px` }}
                      >
                        <PageCanvas
                          page={page}
                          coverTitle={coverTitle}
                          sizePreset={sizePreset}
                          selectedTarget={selectedTarget}
                          onSelectSlot={(slotId) => {
                            setSelectedPageId(page.id);
                            setSelectedTarget({ type: "slot", pageId: page.id, slotId });
                            setActivePanel("images");
                            if (window.innerWidth < 768) setActiveMobilePanel("library");
                          }}
                          onSelectCaption={(slotId) => {
                            setSelectedPageId(page.id);
                            setSelectedTarget({ type: "caption", pageId: page.id, slotId });
                            setActivePanel("text");
                            if (window.innerWidth < 768) setActiveMobilePanel("text");
                          }}
                          onDropOnSlot={(slotId, url) => placePhotoOnPage(page.id, slotId, url)}
                        />

                        {selectedTarget?.type === "slot" && selectedTarget.pageId === page.id && page.slots[selectedTarget.slotId]?.url ? (
                          <div className="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-3 py-2 shadow-lg">
                            <button
                              type="button"
                              className="text-[11px] text-[#6f6f6f]"
                              onClick={() =>
                                updateSelectedSlot((slot) => ({
                                  ...slot,
                                  filter: slot.filter === "grayscale" ? "none" : "grayscale",
                                }))
                              }
                            >
                              ◐
                            </button>
                            <button
                              type="button"
                              className="text-[11px] text-[#6f6f6f]"
                              onClick={() =>
                                updateSelectedSlot((slot) => ({
                                  ...slot,
                                  filter: slot.filter === "sepia" ? "none" : "sepia",
                                }))
                              }
                            >
                              ↻
                            </button>
                            <button
                              type="button"
                              className="text-[11px] text-[#6f6f6f]"
                              onClick={() =>
                                updateSelectedSlot((slot) => ({
                                  ...slot,
                                  zoom: 1,
                                  offsetX: 0,
                                  offsetY: 0,
                                  filter: "none",
                                }))
                              }
                            >
                              ⇄
                            </button>
                            <button
                              type="button"
                              className="text-[11px] text-[#ff7a6a]"
                              onClick={() =>
                                updateSelectedSlot((slot) => ({
                                  ...slot,
                                  url: null,
                                }))
                              }
                            >
                              🗑
                            </button>
                          </div>
                        ) : null}

                        {selectedTarget?.type === "slot" && selectedTarget.pageId === page.id ? (
                          <div
                            className="absolute inset-0"
                            onMouseDown={(event) => {
                              const slotId = selectedTarget.slotId;
                              const slot = page.slots[slotId];
                              if (!slot?.url) return;
                              const bounds = (event.currentTarget.querySelector(`[data-page-slot='${slotId}']`) as HTMLElement | null)?.getBoundingClientRect();
                              if (!bounds) return;
                              slotDragBounds.current[`${page.id}:${slotId}`] = bounds;
                              setCropDrag({
                                pageId: page.id,
                                slotId,
                                startX: event.clientX,
                                startY: event.clientY,
                                initialOffsetX: slot.offsetX,
                                initialOffsetY: slot.offsetY,
                              });
                            }}
                          />
                        ) : null}

                        <div className="pointer-events-none absolute inset-0">
                          {layout.slots.map((slot) => (
                            <div
                              key={slot.id}
                              data-page-slot={slot.id}
                              className="absolute"
                              style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}%`, height: `${slot.h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-[13px] text-[#6e7075]">{page.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile - Prominent Choose Layout Window Button below canvas */}
            <div className="mt-8 flex justify-center md:hidden">
              <button
                type="button"
                onClick={() => setActiveMobilePanel("layouts")}
                className="group flex h-14 items-center gap-4 rounded-full bg-primary px-8 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary/20 transition-all active:scale-95"
              >
                <LayoutGrid className="h-4 w-4" />
                Choose Layout
              </button>
            </div>
          </div>

          <div className="border-t border-border/50 bg-white px-8 py-6">
            <div className="mb-4 flex items-center justify-end gap-5 text-[10px] font-black uppercase tracking-widest text-foreground/40">
              <span className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-border/20">
                 <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                 Manage Pages
              </span>
              <button type="button" onClick={addPage} title="Add 2 pages" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/30 text-primary hover:bg-primary hover:text-white transition-all active:scale-90 shadow-sm">
                <Plus className="h-5 w-5" strokeWidth={3} />
              </button>
              <button type="button" onClick={deleteSelectedPage} className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/30 text-foreground/20 hover:text-primary transition-all active:scale-90 shadow-sm">
                <Trash2 className="h-4 w-4" strokeWidth={3} />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide">
              {views.map((range, viewIndex) => (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => {
                    setCurrentView(viewIndex);
                    selectFirstEditablePageForView(viewIndex);
                  }}
                  className={`flex shrink-0 gap-3 border-2 p-2 rounded-[1.5rem] transition-all ${viewIndex === currentView ? "border-primary bg-primary/5 scale-105 shadow-xl shadow-primary/5" : "border-border/20 bg-white hover:border-primary/30"}`}
                >
                  {range.pageIndices.map((pageIndex) => (
                    <div key={pages[pageIndex].id} className="flex flex-col gap-2">
                      <div
                        className="overflow-hidden rounded-xl border border-border/30 bg-white shadow-sm"
                        style={{ width: `${editorMetrics.thumbnailWidth}px`, height: `${editorMetrics.thumbnailHeight}px` }}
                      >
                        <ThumbnailPreview page={pages[pageIndex]} />
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-foreground/40 text-center">{pages[pageIndex].label}</span>
                    </div>
                  ))}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Right Sidebar - Layouts/Text/Edit (Desktop: Fixed, Mobile: Bottom Sheet Window) */}
        <aside
          className={`fixed inset-x-0 bottom-0 z-[70] h-[75vh] w-full overflow-hidden bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-out rounded-t-[3rem] md:relative md:inset-y-0 md:right-0 md:h-full md:w-[300px] md:rounded-none md:shadow-none md:flex md:flex-row md:border-l md:border-border/50 md:z-0 md:translate-x-0 ${
            isMobile && (activeMobilePanel === "layouts" || activeMobilePanel === "text" || activeMobilePanel === "backgrounds") ? "translate-y-0" : isMobile ? "translate-y-full" : ""
          }`}
        >
          {/* Desktop Panel Icons - Hidden on Mobile */}
          <div className="hidden flex-col items-center border-r border-border/50 bg-white py-8 gap-8 md:flex md:w-[48px]">
            {[
              { id: "text" as const, Icon: Type },
              { id: "layouts" as const, Icon: LayoutGrid },
              { id: "backgrounds" as const, Icon: Palette },
            ].map(({ id, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActivePanel(id)}
                className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all active:scale-90 ${
                  activePanel === id ? "bg-primary text-white shadow-xl shadow-primary/20" : "text-foreground/20 hover:bg-secondary/30 hover:text-foreground/40"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={activePanel === id ? 3 : 2} />
              </button>
            ))}
          </div>

          <div className="relative flex flex-1 flex-col min-h-0 bg-white">
            <div className="flex items-center justify-between border-b border-border/50 px-5 py-6 md:hidden">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                {activeMobilePanel === "layouts" ? "Layouts" : "Editing"}
              </div>
              <button type="button" onClick={() => setActiveMobilePanel("none")} className="p-2 text-foreground/30">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {(activeMobilePanel === "layouts" || (activePanel === "layouts" && !isMobile)) ? (
                <div className="h-full">
                  <div className="hidden border-b border-border/50 px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 md:block">Choose Layout</div>
                  <div className="grid grid-cols-2 gap-4 px-4 pb-12 pt-6 md:pt-0">
                    {LAYOUTS.filter((layout) => layout.id !== "front-cover-square").map((layout) => (
                      <button
                        key={layout.id}
                        type="button"
                        onClick={() => {
                          if (activePage && activePage.kind === "page") {
                            applyLayout(activePage.id, layout.id);
                            if (window.innerWidth < 768) setActiveMobilePanel("none");
                          }
                        }}
                        className={`relative overflow-hidden rounded-2xl border-2 transition-all p-2 ${
                          activePage?.layoutId === layout.id ? "border-primary bg-primary/5 shadow-xl shadow-primary/5 scale-105" : "border-border/20 bg-white hover:border-primary/20"
                        } ${activePage?.kind !== "page" ? "opacity-30 cursor-not-allowed" : ""}`}
                        style={{ aspectRatio: String(sizePreset.pageAspectRatio) }}
                      >
                        <LayoutPreview layout={layout} />
                        {activePage?.layoutId === layout.id ? (
                          <div className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[6px] font-black text-white shadow-lg">✓</div>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {(activeMobilePanel === "text" || (activePanel === "text" && !isMobile)) ? (
                <div className="h-full px-6 py-8 flex flex-col gap-10">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Typography & Content</div>
                  {selectedTarget?.type === "caption" && activePage ? (
                    <div className="flex flex-col gap-10">
                      <div className="flex flex-col gap-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/60">Alignment</p>
                        <div className="grid grid-cols-3 gap-3">
                          {(["left", "center", "right"] as TextAlign[]).map((align) => (
                            <button
                              key={align}
                              type="button"
                              onClick={() => setPageTextAlign(align)}
                              className={`rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                                activePage.textAlign === align ? "bg-primary text-white shadow-xl shadow-primary/20" : "bg-secondary/20 text-foreground/40 hover:bg-secondary/40"
                              }`}
                            >
                              {align}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/60">Style Preset</p>
                        <div className="relative">
                          <select
                            value={activePage.font}
                            onChange={(event) => setPageFont(event.target.value as FontOption)}
                            className="w-full rounded-2xl bg-secondary/10 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-primary focus:outline-none border-2 border-border/20 focus:border-primary transition-all appearance-none"
                          >
                            <option value="classic">Classic Serif</option>
                            <option value="modern">Modern Sans</option>
                            <option value="editorial">Editorial Look</option>
                          </select>
                          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/60">Caption</p>
                        <textarea
                          value={selectedSlot?.caption ?? ""}
                          onChange={(event) => updateCaptionText(event.target.value)}
                          rows={6}
                          placeholder="Type your memory here..."
                          className="w-full rounded-3xl bg-secondary/10 px-5 py-5 text-[11px] font-medium leading-relaxed text-foreground placeholder:text-foreground/20 focus:outline-none border-2 border-border/20 focus:border-primary transition-all scrollbar-hide resize-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveMobilePanel("none")}
                        className="mt-4 h-14 rounded-full bg-primary-pressed text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary-pressed/20 md:hidden"
                      >
                        Done Editing
                      </button>
                    </div>
                  ) : (
                    <div className="mt-12 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed text-foreground/20 text-center px-4">
                       Select a text area on your page to edit captions or change styles
                    </div>
                  )}
                </div>
              ) : null}

              {activePanel === "backgrounds" ? (
                <div className="h-full px-6 py-6 flex flex-col gap-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Backgrounds</div>
                  <div className="mt-20 flex flex-col items-center justify-center gap-6 text-center opacity-20">
                     <div className="h-20 w-20 rounded-full bg-secondary/30 flex items-center justify-center">
                        <Palette className="h-8 w-8" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest leading-loose">No alternative themes available for this edition</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </aside>

        <nav className="z-[60] flex h-[72px] shrink-0 items-center justify-around border-t border-border/50 bg-white px-6 pb-safe md:hidden">
          {[
            { id: "library", label: "Photos", Icon: ImageIcon },
            { id: "layouts", label: "Layouts", Icon: LayoutGrid },
            { id: "text", label: "Text", Icon: Type },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveMobilePanel(activeMobilePanel === id ? "none" : (id as any))}
              className={`flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                activeMobilePanel === id ? "text-primary scale-110" : "text-foreground/30 hover:text-foreground/50"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={activeMobilePanel === id ? 3 : 2} />
              <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
