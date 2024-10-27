import { ImageSourcePropType } from "react-native";

export type ImageSliderType = {
    title: string;
    image: ImageSourcePropType; 
    description: string;
};

export const ImageSlider: ImageSliderType[] = [ 
    {
        title: "hemi",
        image: require('@/assets/images/image.jpg'),
        description: "hello there fellow citizens",
    },
    {
        title: "hemi",
        image: require('@/assets/images/image.jpg'),
        description: "hello there fellow citizens",
    },
    {
        title: "hemi",
        image: require('@/assets/images/image.jpg'),
        description: "hello there fellow citizens",
    },
];
