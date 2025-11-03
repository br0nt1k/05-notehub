import axios from "axios";
import type { Note } from "../types/note";

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
const API_URL = "https://notehub-public.goit.study/api/notes";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

export const fetchNotes = async (
  search: string,
  page: number
): Promise<NotesResponse> => {
  const params: Record<string, string | number> = { page };
  if (search) {
    params.search = search;
  }

  const response = await axios.get<NotesResponse>(API_URL, {
    params,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data;
};

export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
  const response = await axios.post<Note>(API_URL, newNoteData, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const response = await axios.delete<Note>(`${API_URL}/${noteId}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};
