interface CommonInputProps {
  placeholder: string;
  multiline?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
}
interface ProgressHeaderProps {
  onPress: () => void;
  value: number;
}
interface SizeBoxProps {
  size: number;
}
interface CommonBtnProps {
  onPress: () => void;
  title: string;
}
interface HeaderProps {
  onPress: () => void;
}
interface ImageComProps {
  onPress: () => void;
}
