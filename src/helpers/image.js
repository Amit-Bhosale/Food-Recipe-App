import Animated from 'react-native-reanimated';
import { Image } from 'expo-image';


export const CachedImage = (props) => {
    const { uri } = props;
  
    return <Animated.Image src={uri} {...props} />;
  };