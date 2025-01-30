interface CommonInputProps {
  placeholder: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  styless: object;
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
  title: string;
}
interface ImageComProps {
  onPress: () => void;
}
interface DrawerProps {
  onBackdropPress: () => void;
  onClose: () => void;
  isVisible?: boolean;
  username?: string;
  profilePic?: string;
}
interface LoaderProps {
  isVisible?: boolean;
}
