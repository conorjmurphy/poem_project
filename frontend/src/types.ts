export interface Poem {
  id: number;
  title: string;
  author: string;
  content: string;
  created_at: string;
}

export interface PoemFormData {
  title: string;
  author: string;
  content: string;
}
