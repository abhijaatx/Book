"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SizePreset } from "@/lib/products";
import {
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

const PAGE_BACKGROUND = "#fbf5e8";
const PAGE_SAFE_BORDER = "#f8b5ff";

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
        x: 30,
        y: 28,
        w: 38,
        h: 38,
      },
    ],
  },
  {
    id: "single-caption",
    label: "Single Photo",
    slots: [
      {
        id: "a",
        x: 18,
        y: 16,
        w: 64,
        h: 64,
        captionX: 18,
        captionY: 82,
        captionW: 64,
        captionH: 9,
      },
    ],
  },
  {
    id: "two-side-caption",
    label: "Two Side",
    slots: [
      {
        id: "a",
        x: 9,
        y: 18,
        w: 33,
        h: 54,
        captionX: 9,
        captionY: 74,
        captionW: 33,
        captionH: 8,
      },
      {
        id: "b",
        x: 49,
        y: 18,
        w: 33,
        h: 54,
        captionX: 49,
        captionY: 74,
        captionW: 33,
        captionH: 8,
      },
    ],
  },
  {
    id: "portrait-right-caption",
    label: "Portrait",
    slots: [
      {
        id: "a",
        x: 14,
        y: 14,
        w: 56,
        h: 68,
        captionX: 14,
        captionY: 84,
        captionW: 56,
        captionH: 8,
      },
    ],
  },
  {
    id: "two-tall",
    label: "Two Tall",
    slots: [
      {
        id: "a",
        x: 8,
        y: 14,
        w: 35,
        h: 70,
        captionX: 8,
        captionY: 86,
        captionW: 35,
        captionH: 7,
      },
      {
        id: "b",
        x: 47,
        y: 14,
        w: 35,
        h: 70,
        captionX: 47,
        captionY: 86,
        captionW: 35,
        captionH: 7,
      },
    ],
  },
  {
    id: "wide-caption",
    label: "Wide",
    slots: [
      {
        id: "a",
        x: 8,
        y: 22,
        w: 74,
        h: 52,
        captionX: 8,
        captionY: 77,
        captionW: 74,
        captionH: 9,
      },
    ],
  },
  {
    id: "four-grid",
    label: "Four Grid",
    slots: [
      { id: "a", x: 5, y: 13, w: 36, h: 33 },
      { id: "b", x: 45, y: 13, w: 36, h: 33 },
      { id: "c", x: 5, y: 50, w: 36, h: 33 },
      { id: "d", x: 45, y: 50, w: 36, h: 33 },
    ],
  },
  {
    id: "three-mix",
    label: "Mixed",
    slots: [
      {
        id: "a",
        x: 8,
        y: 15,
        w: 31,
        h: 28,
        captionX: 8,
        captionY: 45,
        captionW: 31,
        captionH: 7,
      },
      {
        id: "b",
        x: 43,
        y: 15,
        w: 31,
        h: 28,
        captionX: 43,
        captionY: 45,
        captionW: 31,
        captionH: 7,
      },
      {
        id: "c",
        x: 8,
        y: 55,
        w: 66,
        h: 24,
        captionX: 8,
        captionY: 81,
        captionW: 66,
        captionH: 8,
      },
    ],
  },
  {
    id: "square-caption",
    label: "Square + Caption",
    slots: [
      {
        id: "a",
        x: 18,
        y: 13,
        w: 52,
        h: 52,
        captionX: 18,
        captionY: 68,
        captionW: 52,
        captionH: 8,
      },
    ],
  },
  {
    id: "two-stacked-caption",
    label: "Two Stacked",
    slots: [
      {
        id: "a",
        x: 16,
        y: 12,
        w: 60,
        h: 28,
        captionX: 16,
        captionY: 42,
        captionW: 60,
        captionH: 7,
      },
      {
        id: "b",
        x: 16,
        y: 54,
        w: 60,
        h: 28,
        captionX: 16,
        captionY: 84,
        captionW: 60,
        captionH: 7,
      },
    ],
  },
  {
    id: "three-columns-caption",
    label: "Three Columns",
    slots: [
      {
        id: "a",
        x: 6,
        y: 16,
        w: 23,
        h: 54,
        captionX: 6,
        captionY: 72,
        captionW: 23,
        captionH: 7,
      },
      {
        id: "b",
        x: 31,
        y: 16,
        w: 23,
        h: 54,
        captionX: 31,
        captionY: 72,
        captionW: 23,
        captionH: 7,
      },
      {
        id: "c",
        x: 56,
        y: 16,
        w: 23,
        h: 54,
        captionX: 56,
        captionY: 72,
        captionW: 23,
        captionH: 7,
      },
    ],
  },
  {
    id: "hero-two-small",
    label: "Hero + Two",
    slots: [
      {
        id: "a",
        x: 8,
        y: 12,
        w: 74,
        h: 34,
        captionX: 8,
        captionY: 48,
        captionW: 74,
        captionH: 7,
      },
      {
        id: "b",
        x: 8,
        y: 58,
        w: 35,
        h: 23,
        captionX: 8,
        captionY: 83,
        captionW: 35,
        captionH: 7,
      },
      {
        id: "c",
        x: 47,
        y: 58,
        w: 35,
        h: 23,
        captionX: 47,
        captionY: 83,
        captionW: 35,
        captionH: 7,
      },
    ],
  },
  {
    id: "left-hero-right-stack",
    label: "Hero + Stack",
    slots: [
      {
        id: "a",
        x: 8,
        y: 12,
        w: 43,
        h: 66,
        captionX: 8,
        captionY: 80,
        captionW: 43,
        captionH: 7,
      },
      {
        id: "b",
        x: 55,
        y: 12,
        w: 27,
        h: 31,
        captionX: 55,
        captionY: 45,
        captionW: 27,
        captionH: 6,
      },
      {
        id: "c",
        x: 55,
        y: 52,
        w: 27,
        h: 31,
        captionX: 55,
        captionY: 85,
        captionW: 27,
        captionH: 6,
      },
    ],
  },
  {
    id: "top-two-bottom-wide",
    label: "Two + Wide",
    slots: [
      {
        id: "a",
        x: 8,
        y: 12,
        w: 35,
        h: 24,
        captionX: 8,
        captionY: 38,
        captionW: 35,
        captionH: 6,
      },
      {
        id: "b",
        x: 47,
        y: 12,
        w: 35,
        h: 24,
        captionX: 47,
        captionY: 38,
        captionW: 35,
        captionH: 6,
      },
      {
        id: "c",
        x: 8,
        y: 50,
        w: 74,
        h: 28,
        captionX: 8,
        captionY: 80,
        captionW: 74,
        captionH: 7,
      },
    ],
  },
  {
    id: "mosaic-five",
    label: "Mosaic",
    slots: [
      { id: "a", x: 8, y: 12, w: 40, h: 31 },
      { id: "b", x: 52, y: 12, w: 30, h: 20 },
      { id: "c", x: 52, y: 35, w: 30, h: 20 },
      { id: "d", x: 8, y: 48, w: 24, h: 28 },
      { id: "e", x: 35, y: 48, w: 47, h: 28 },
    ],
  },
  {
    id: "four-grid-caption",
    label: "Grid + Caption",
    slots: [
      {
        id: "a",
        x: 8,
        y: 10,
        w: 35,
        h: 27,
        captionX: 8,
        captionY: 39,
        captionW: 35,
        captionH: 6,
      },
      {
        id: "b",
        x: 47,
        y: 10,
        w: 35,
        h: 27,
        captionX: 47,
        captionY: 39,
        captionW: 35,
        captionH: 6,
      },
      {
        id: "c",
        x: 8,
        y: 50,
        w: 35,
        h: 27,
        captionX: 8,
        captionY: 79,
        captionW: 35,
        captionH: 6,
      },
      {
        id: "d",
        x: 47,
        y: 50,
        w: 35,
        h: 27,
        captionX: 47,
        captionY: 79,
        captionW: 35,
        captionH: 6,
      },
    ],
  },
  {
    id: "blank-text",
    label: "Text",
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

function getEditorMetrics(sizePreset: SizePreset, visiblePageCount: number) {
  const pageHeight = Math.round((visiblePageCount === 1 ? 520 : 360) * sizePreset.editorScale);
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

function buildViewRanges(pages: PageData[]) {
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

  if (page.kind === "back-cover") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#f8f1df]">
        <div className="absolute left-[4%] top-[4%] h-[92%] w-[92%] border border-[rgba(248,181,255,0.9)]" />
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center">
          <p className="font-serif text-[16px] font-semibold italic text-[#405142]">Kahaani</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#fbf5e8]">
      <div className="absolute left-[4%] top-[4%] h-[92%] w-[92%] border border-[rgba(248,181,255,0.9)]" />
      <div className="absolute left-[4.8%] top-[4.4%] text-[8px] font-semibold lowercase tracking-wide text-[#ff66ff]">safe-area</div>

      {page.kind === "front-cover" ? (
        <>
          <div className={`absolute left-[49%] top-[16%] -translate-x-1/2 text-center font-serif leading-[0.92] text-[#355543] ${isLandscape ? "max-w-[46%] text-[38px]" : "max-w-[34%] text-[50px]"}`}>
            {coverTitle}
          </div>
          <div className={`absolute bottom-[18%] left-[49%] -translate-x-1/2 font-semibold uppercase tracking-[0.28em] text-[#5d6a56] ${isLandscape ? "text-[9px]" : "text-[11px]"}`}>
            thank you for everything
          </div>
        </>
      ) : null}

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
                className={`absolute overflow-hidden border border-dashed bg-white/40 text-left ${captionSelected ? "border-[#8d8d8d]" : "border-[#dddddd]"}`}
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
                <span className="block truncate px-1 pt-[2px] text-[8px] leading-none text-[#303030]">{content.caption}</span>
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
  const [libraryColumns, setLibraryColumns] = useState<2 | 3>(2);
  const [cropDrag, setCropDrag] = useState<CropDragState | null>(null);
  const slotDragBounds = useRef<Record<string, DOMRect>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const views = useMemo(() => buildViewRanges(pages), [pages]);

  useEffect(() => {
    const firstEditablePage = pages[2] ?? pages[1] ?? pages[0];
    if (firstEditablePage && !selectedPageId) {
      setSelectedPageId(firstEditablePage.id);
    }
  }, [pages, selectedPageId]);

  useEffect(() => {
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
  const editorMetrics = getEditorMetrics(sizePreset, visiblePages.length);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f3f1ee]">
      <div className="flex h-16 items-center justify-between border-b border-[#e8e4de] bg-white px-6">
        <div className="min-w-[160px] text-[20px] font-semibold italic text-[#111]">Kahaani</div>
        <div className="text-center">
          <p className="text-[15px] font-semibold text-[#2d2d2d]">{projectName}</p>
        </div>
        <div className="flex min-w-[250px] items-center justify-end gap-4">
          <div className="hidden items-center gap-3 text-[14px] text-[#4a4a4a] md:flex">
            <span className="text-[10px]">●</span>
            <span>My Project</span>
            <Save className="h-4 w-4" />
            <Play className="h-4 w-4" />
          </div>
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-black px-4 text-[13px] font-semibold text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Save / Continue
            <ChevronRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={onBack} className="text-[#555]">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[232px_minmax(0,1fr)_48px_220px]">
        <aside
          className="flex min-h-0 flex-col border-r border-[#e2ded7] bg-white"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            if (event.dataTransfer.files.length > 0) {
              appendFiles(event.dataTransfer.files);
            }
          }}
        >
          <div className="border-b border-[#ece7df] px-5 py-4 text-center text-[13px] font-semibold text-[#4c4c4c]">Upload</div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            {uploadedPhotos.length === 0 ? (
              <div className="flex h-full min-h-[580px] flex-col items-center justify-center rounded-none border border-dashed border-[#cfd5dc] px-5 text-center">
                <Upload className="mb-6 h-10 w-10 text-[#c0c5ca]" />
                <p className="max-w-[160px] text-[14px] leading-7 text-[#989898]">Drag and drop images or upload from your computer.</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-[8px] bg-[#888] px-6 text-[13px] font-semibold text-white"
                >
                  Upload images
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-[12px] text-[#707070]">
                  <button type="button" onClick={autofillPages} className="flex items-center gap-1 font-medium">
                    <span className="text-[14px]">✎</span>
                    Autofill
                  </button>
                  <div className="flex items-center gap-1">
                    {[2, 3].map((columns) => (
                      <button
                        key={columns}
                        type="button"
                        onClick={() => setLibraryColumns(columns as 2 | 3)}
                        className={`flex h-6 w-6 items-center justify-center rounded ${libraryColumns === columns ? "bg-[#1e1e1e] text-white" : "bg-[#efefef] text-[#6f6f6f]"}`}
                      >
                        {columns === 2 ? "◫" : "▦"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={`grid gap-3 ${libraryColumns === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                  {uploadedPhotos.map((photo, index) => (
                    <button
                      key={`${photo}-${index}`}
                      type="button"
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.setData("photo-url", photo);
                      }}
                      onClick={() => placePhoto(photo)}
                      className="group text-left"
                    >
                      <div className="aspect-[0.96] overflow-hidden rounded-[4px] border border-[#e0e0e0] bg-[#f5f5f5]">
                        <img src={photo} alt="" className="h-full w-full object-cover" />
                      </div>
                      <p className="mt-1 truncate text-[10px] text-[#7c7c7c]">Photo {index + 1}</p>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-[#888] px-5 text-[13px] font-semibold text-white"
                >
                  <Plus className="h-4 w-4" />
                  Upload images
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

        <section className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-4 text-[#9c9c9c]">
              <button
                type="button"
                onClick={() => {
                  const previous = undoStack[undoStack.length - 1];
                  if (!previous) return;
                  setUndoStack((current) => current.slice(0, -1));
                  setRedoStack((current) => [...current, snapshot()]);
                  restoreSnapshot(previous);
                }}
              >
                <Undo2 className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = redoStack[redoStack.length - 1];
                  if (!next) return;
                  setRedoStack((current) => current.slice(0, -1));
                  setUndoStack((current) => [...current, snapshot()]);
                  restoreSnapshot(next);
                }}
              >
                <Redo2 className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-3 text-[#9a9a9a]">
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
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden px-7 pb-4">
            <button
              type="button"
              disabled={currentView === 0}
              onClick={() => {
                const next = Math.max(0, currentView - 1);
                setCurrentView(next);
                selectFirstEditablePageForView(next);
              }}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 text-[#95a1af] disabled:opacity-30"
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
                className={`flex items-start justify-center ${visiblePages.length === 1 ? "" : "gap-2"} origin-center transition-transform`}
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
                          }}
                          onSelectCaption={(slotId) => {
                            setSelectedPageId(page.id);
                            setSelectedTarget({ type: "caption", pageId: page.id, slotId });
                            setActivePanel("text");
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
          </div>

          <div className="border-t border-[#e6e0d8] bg-white px-4 py-3">
            <div className="mb-2 flex items-center justify-end gap-3 text-[13px] text-[#6f737a]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-[0_4px_18px_rgba(0,0,0,0.06)]">
                <span>📖</span>
                Organize pages
              </span>
              <button type="button" onClick={addPage} title="Add 2 pages" className="flex h-8 w-8 items-center justify-center rounded bg-[#efefef] text-[#6b6b6b]">
                <Plus className="h-4 w-4" />
              </button>
              <button type="button" onClick={deleteSelectedPage} className="flex h-8 w-8 items-center justify-center rounded bg-[#efefef] text-[#9b9b9b]">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {views.map((range, viewIndex) => (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => {
                    setCurrentView(viewIndex);
                    selectFirstEditablePageForView(viewIndex);
                  }}
                  className={`flex shrink-0 gap-2 border p-1 ${viewIndex === currentView ? "border-[#3f3f3f]" : "border-[#e4e4e4]"}`}
                >
                  {range.pageIndices.map((pageIndex) => (
                    <div key={pages[pageIndex].id} className="flex flex-col">
                      <div
                        className="overflow-hidden border border-[#efefef] bg-white"
                        style={{ width: `${editorMetrics.thumbnailWidth}px`, height: `${editorMetrics.thumbnailHeight}px` }}
                      >
                        <ThumbnailPreview page={pages[pageIndex]} />
                      </div>
                      <span className="mt-1 text-[10px] text-[#707070]">{pages[pageIndex].label}</span>
                    </div>
                  ))}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="flex flex-col items-center border-l border-[#e2ded7] bg-white py-3">
          {[
            { id: "images" as const, Icon: ImageIcon },
            { id: "text" as const, Icon: Type },
            { id: "layouts" as const, Icon: LayoutGrid },
            { id: "backgrounds" as const, Icon: Palette },
          ].map(({ id, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActivePanel(id)}
              className={`mb-6 flex h-10 w-10 items-center justify-center rounded ${activePanel === id ? "text-[#111]" : "text-[#888]"}`}
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </aside>

        <aside className="border-l border-[#e2ded7] bg-white">
          {activePanel === "layouts" ? (
            <div className="h-full overflow-y-auto">
              <div className="px-4 py-4 text-[13px] font-semibold text-[#555]">Layouts:</div>
              <div className="grid grid-cols-2 gap-3 px-3 pb-4">
                {LAYOUTS.filter((layout) => layout.id !== "front-cover-square").map((layout) => (
                  <button
                    key={layout.id}
                    type="button"
                    onClick={() => {
                      if (activePage && activePage.kind === "page") {
                        applyLayout(activePage.id, layout.id);
                      }
                    }}
                    className={`relative overflow-hidden border p-2 ${
                      activePage?.layoutId === layout.id ? "border-[#444]" : "border-[#ececec]"
                    } ${activePage?.kind !== "page" ? "opacity-50" : ""}`}
                    style={{ aspectRatio: String(sizePreset.pageAspectRatio) }}
                  >
                    <LayoutPreview layout={layout} />
                    {activePage?.layoutId === layout.id ? (
                      <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#222] text-[10px] text-white">✓</div>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {activePanel === "images" ? (
            <div className="h-full px-4 py-4">
              <div className="text-[13px] font-semibold text-[#555]">Edit Image:</div>
              {selectedSlot ? (
                <div className="mt-6 space-y-5">
                  <div>
                    <div className="mb-3 flex items-center justify-between text-[13px] text-[#666]">
                      <span>Zoom</span>
                      <span>{selectedSlot.zoom.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="2"
                      step="0.05"
                      value={selectedSlot.zoom}
                      onChange={(event) =>
                        updateSelectedSlot((slot) => ({
                          ...slot,
                          zoom: Number(event.target.value),
                        }))
                      }
                      className="w-full accent-[#999]"
                    />
                  </div>
                  <div>
                    <p className="mb-3 text-[13px] text-[#666]">Filters</p>
                    <div className="grid grid-cols-2 gap-3">
                      {(["grayscale", "sepia"] as ImageFilter[]).map((filter) => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() =>
                            updateSelectedSlot((slot) => ({
                              ...slot,
                              filter,
                            }))
                          }
                          className={`rounded-[8px] px-3 py-3 text-[13px] ${
                            selectedSlot.filter === filter ? "bg-[#efefef] text-[#222]" : "bg-[#f7f7f7] text-[#666]"
                          }`}
                        >
                          {filter === "grayscale" ? "Grayscale" : "Sepia"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-10 text-[13px] leading-6 text-[#8a8a8a]">
                  Select a photo placeholder on the page, then upload or click an image from the left sidebar to place it.
                </div>
              )}
            </div>
          ) : null}

          {activePanel === "text" ? (
            <div className="h-full px-4 py-4">
              <div className="text-[13px] font-semibold text-[#555]">Edit Text:</div>
              {selectedTarget?.type === "caption" && activePage ? (
                <div className="mt-6 space-y-5">
                  <div>
                    <p className="mb-3 text-[13px] text-[#666]">Alignment</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(["left", "center", "right"] as TextAlign[]).map((align) => (
                        <button
                          key={align}
                          type="button"
                          onClick={() => setPageTextAlign(align)}
                          className={`rounded-[8px] px-3 py-3 text-[13px] ${
                            activePage.textAlign === align ? "bg-[#696969] text-white" : "bg-[#f7f7f7] text-[#666]"
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 text-[13px] text-[#666]">Font</p>
                    <select
                      value={activePage.font}
                      onChange={(event) => setPageFont(event.target.value as FontOption)}
                      className="w-full rounded-[8px] border border-[#efefef] bg-[#fafafa] px-3 py-3 text-[13px] text-[#555] outline-none"
                    >
                      <option value="classic">Classic Serif</option>
                      <option value="modern">Modern Sans</option>
                      <option value="editorial">Editorial Serif</option>
                    </select>
                  </div>
                  <div>
                    <p className="mb-3 text-[13px] text-[#666]">Caption</p>
                    <textarea
                      value={selectedSlot?.caption ?? ""}
                      onChange={(event) => updateCaptionText(event.target.value)}
                      rows={5}
                      className="w-full rounded-[8px] border border-[#efefef] bg-[#fafafa] px-3 py-3 text-[13px] text-[#555] outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-10 text-[13px] leading-6 text-[#8a8a8a]">
                  Click a caption box on the page to edit alignment and font.
                </div>
              )}
            </div>
          ) : null}

          {activePanel === "backgrounds" ? (
            <div className="h-full px-4 py-4">
              <div className="text-[13px] font-semibold text-[#555]">Backgrounds:</div>
              <div className="mt-10 text-center text-[14px] leading-7 text-[#7f7f7f]">No backgrounds available for this page.</div>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
