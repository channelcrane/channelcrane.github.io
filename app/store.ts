import { create } from 'zustand'
import tagData from 'app/tag-data.json'
import yearData from 'app/year-data.json'
import projectTagData from 'app/project-tag-data.json'
import peopleTagData from 'app/people-tag-data.json'

// 공통 인터페이스 정의
interface TagState {
  selectedTags: string[]
  toggleTag: (tag: string) => void
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  clearTags: () => void
  resetTags: () => void
  selectedAll: () => boolean
}

// Year 태그 상태
export const useYearTagStore = create<TagState>((set, get) => {
  const initialTags = Object.keys(yearData)

  return {
    selectedTags: initialTags,
    toggleTag: (tag) =>
      set((state) => ({
        selectedTags: state.selectedTags.includes(tag)
          ? state.selectedTags.filter((t) => t !== tag)
          : [...state.selectedTags, tag],
      })),
    addTag: (tag) =>
      set((state) => {
        if (!state.selectedTags.includes(tag)) {
          return { selectedTags: [...state.selectedTags, tag] }
        }
        return state
      }),
    removeTag: (tag) =>
      set((state) => {
        if (state.selectedTags.includes(tag)) {
          return { selectedTags: state.selectedTags.filter((t) => t !== tag) }
        }
        return state
      }),
    clearTags: () =>
      set({
        selectedTags: [],
      }),
    resetTags: () =>
      set({
        selectedTags: initialTags,
      }),
    selectedAll: () => {
      const state = get()
      return state.selectedTags.length === initialTags.length
    },
  }
})

// Project 태그 상태
export const useProjectTagStore = create<TagState>((set, get) => {
  const initialTags = Object.keys(projectTagData)

  return {
    selectedTags: initialTags,
    toggleTag: (tag) =>
      set((state) => ({
        selectedTags: state.selectedTags.includes(tag)
          ? state.selectedTags.filter((t) => t !== tag)
          : [...state.selectedTags, tag],
      })),
    addTag: (tag) =>
      set((state) => {
        if (!state.selectedTags.includes(tag)) {
          return { selectedTags: [...state.selectedTags, tag] }
        }
        return state
      }),
    removeTag: (tag) =>
      set((state) => {
        if (state.selectedTags.includes(tag)) {
          return { selectedTags: state.selectedTags.filter((t) => t !== tag) }
        }
        return state
      }),
    clearTags: () =>
      set({
        selectedTags: [],
      }),
    resetTags: () =>
      set({
        selectedTags: initialTags,
      }),
    selectedAll: () => {
      const state = get()
      return state.selectedTags.length === initialTags.length
    },
  }
})

// Project 태그 상태
export const usePeopleTagStore = create<TagState>((set, get) => {
  const initialTags = Object.keys(peopleTagData)

  return {
    selectedTags: initialTags,
    toggleTag: (tag) =>
      set((state) => ({
        selectedTags: state.selectedTags.includes(tag)
          ? state.selectedTags.filter((t) => t !== tag)
          : [...state.selectedTags, tag],
      })),
    addTag: (tag) =>
      set((state) => {
        if (!state.selectedTags.includes(tag)) {
          return { selectedTags: [...state.selectedTags, tag] }
        }
        return state
      }),
    removeTag: (tag) =>
      set((state) => {
        if (state.selectedTags.includes(tag)) {
          return { selectedTags: state.selectedTags.filter((t) => t !== tag) }
        }
        return state
      }),
    clearTags: () =>
      set({
        selectedTags: [],
      }),
    resetTags: () =>
      set({
        selectedTags: initialTags,
      }),
    selectedAll: () => {
      const state = get()
      return state.selectedTags.length === initialTags.length
    },
  }
})
