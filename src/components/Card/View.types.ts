export interface CardProps {
  image: string;
  name: string;
  types: string[];
  id: number;
  className?: string;
  height: number;
  weight: number;
  hoverable?: boolean;
  showBookmark?: boolean;
  hasBookmarked?: boolean;
  actionBtnText?: string;
  onClick?: () => void;
  onClickBookmark?: () => void;
}