import type { ProjectCategory } from "@/types";

export const categoryLabels: Record<ProjectCategory, string> = {
  identity: "الهوية البصرية",
  social: "السوشيال ميديا",
  motion: "الموشن",
  stores: "المتاجر",
  ads: "الإعلانات",
};

export const categoryFilters: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "identity", label: "الهوية البصرية" },
  { id: "social", label: "السوشيال ميديا" },
  { id: "motion", label: "الموشن" },
  { id: "stores", label: "المتاجر" },
  { id: "ads", label: "الإعلانات" },
];
