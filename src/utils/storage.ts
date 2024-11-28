import { Vote, Voter, Message } from '../types';

const VOTES_KEY = 'votes';
const VOTERS_KEY = 'voters';
const MESSAGES_KEY = 'messages';

export const saveVote = (vote: Vote) => {
  const votes = getVotes();
  votes.push(vote);
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
};

export const getVotes = (): Vote[] => {
  const votes = localStorage.getItem(VOTES_KEY);
  return votes ? JSON.parse(votes) : [];
};

export const saveVoter = (voter: Voter) => {
  const voters = getVoters();
  voters.push(voter);
  localStorage.setItem(VOTERS_KEY, JSON.stringify(voters));
  localStorage.setItem('currentVoter', JSON.stringify(voter));
};

export const getVoters = (): Voter[] => {
  const voters = localStorage.getItem(VOTERS_KEY);
  return voters ? JSON.parse(voters) : [];
};

export const hasVoted = (dni: string): boolean => {
  const votes = getVotes();
  return votes.some(vote => vote.voterId === dni);
};

export const saveMessage = (message: Message) => {
  const messages = getMessages();
  messages.push(message);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};

export const getMessages = (): Message[] => {
  const messages = localStorage.getItem(MESSAGES_KEY);
  return messages ? JSON.parse(messages) : [];
};

export const clearAllData = () => {
  localStorage.removeItem(VOTES_KEY);
  localStorage.removeItem(VOTERS_KEY);
  localStorage.removeItem(MESSAGES_KEY);
  localStorage.removeItem('currentVoter');
};