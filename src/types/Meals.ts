export interface Meal {
  id: number;
  name: string;
  tags: string[];
  instructions: string;
  thumbUrl: string;
  youtubeUrl: string;
  ingredients: {
    ingredient: string;
    measurement: string;
  }[];
}
