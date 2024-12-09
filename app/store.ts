import { create } from 'zustand'
import tagData from 'app/tag-data.json'
import yearData from 'app/year-data.json'
import projectTagData from 'app/project-tag-data.json'
import peopleTagData from 'app/people-tag-data.json'

// 공통 인터페이스 정의
interface TagState {
  selectedTags: string[]
  toggleTag: (tag: string) => void
}

// Year 태그 상태
export const useYearTagStore = create<TagState>((set) => ({
  selectedTags: Object.keys(yearData),
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),
}))

// Project 태그 상태
export const useProjectTagStore = create<TagState>((set) => ({
  selectedTags: Object.keys(projectTagData),
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),
}))

// People 태그 상태
export const usePeopleTagStore = create<TagState>((set) => ({
  selectedTags: Object.keys(peopleTagData),
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),
}))
