import { unicorns } from "./data";
import { getPicture } from "@astrojs/image";

/**
 * We do it this was so that we only generate the list of images once
 *
 * This allows us to share the cached image format between multiple different pages
 */
const unicornProfilePicMap = Promise.all(
	unicorns.map(async (unicorn) => ({
		...(await getPicture({
			src: unicorn.profileImgMeta.relativeServerPath,
			formats: ["webp", "png"],
			widths: [72, 48],
			aspectRatio: 1,
			alt: "",
		})),
		id: unicorn.id,
	}))
);

export const getUnicornProfilePicMap = async () => {
	return await unicornProfilePicMap;
};

export type ProfilePictureMap = Awaited<
	ReturnType<typeof getUnicornProfilePicMap>
>;
