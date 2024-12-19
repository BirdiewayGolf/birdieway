export type TournamentType = 'business' | 'junior' | 'longday';

export interface TournamentCardProps {
  type: TournamentType;
  title: string;
  description: string;
  link: string;
}