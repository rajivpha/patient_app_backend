import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: 'dmog37vbm',
      api_key: '117221239233914',
      api_secret: '49O1WOgMD3TDWDjT1gsWZR_eKV4',
    });
  },
};
