export const promptPresets = {
  currentEvents: [
    'Climate change headlines',
    'Global technology trends',
    'Recent space exploration missions',
  ],
  books: [
    'Harry Potter universe vocabulary',
    'Words from classic literature',
    'Themes from contemporary novels',
  ],
  subjects: [
    'Science fair terminology',
    'Mathematics concepts',
    'World history events',
  ],
};

export type PromptCategory = keyof typeof promptPresets;
