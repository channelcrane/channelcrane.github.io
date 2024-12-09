import { create } from "zustand";

// 공통 인터페이스 정의
interface TagState {
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}

// Year 태그 상태
export const useYearTagStore = create<TagState>((set) => ({
  selectedTags: ["2020", "2021", "2022"], // 초기 값
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),
}));

// Project 태그 상태
export const useProjectTagStore = create<TagState>((set) => ({
  selectedTags: ["design", "development", "research"], // 초기 값
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),
}));

// People 태그 상태
export const usePeopleTagStore = create<TagState>((set) => ({
  selectedTags: ["Alice", "Bob", "Charlie"], // 초기 값
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),
}));