import { ReactNode } from 'react';

export interface TeamMember {
  role: string;
  name: string;
  proposals: string[];
}

export interface Candidate {
  id: string;
  name: string;
  photo: string;
  slogan: string;
  team: TeamMember[];
}

export interface Voter {
  dni: string;
  name: string;
  birthDate: string;
  grade: string;
}

export interface Vote {
  voterId: string;
  candidateId: string;
  timestamp: number;
}

export interface Message {
  id: string;
  text: string;
  author: string;
  timestamp: number;
}