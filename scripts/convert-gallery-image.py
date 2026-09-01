import sys
from pathlib import Path

from PIL import Image, ImageOps


def flatten_to_rgb(image: Image.Image) -> Image.Image:
    image = ImageOps.exif_transpose(image)
    if image.mode in ('RGBA', 'LA') or 'transparency' in image.info:
        rgba = image.convert('RGBA')
        background = Image.new('RGBA', rgba.size, 'white')
        return Image.alpha_composite(background, rgba).convert('RGB')
    return image.convert('RGB')


source = Path(sys.argv[1])
destination = Path(sys.argv[2])

with Image.open(source) as input_image:
    output_image = flatten_to_rgb(input_image)
    output_image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
    output_image.save(destination, 'WEBP', quality=78, method=6)
