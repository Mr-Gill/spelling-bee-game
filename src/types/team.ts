import { Participant } from './participant';

export interface Team {
  id: string;
  name: string;
  students: Participant[];
}
