from PIL import Image
import math
import random
import time

from samila import GenerativeImage, Projection


def center_prop(img_file: str):
    im = Image.open(img_file)
    width, height = im.size

    new_width = min(width, 600)
    new_height = min(height, 600)

    left = int(math.ceil((width - new_width) / 2))
    right = width - int(math.floor((width - new_width) / 2))
    top = int(math.ceil((height - new_height) / 2))
    bottom = height - int(math.floor((height - new_height) / 2))

    im = im.crop((left, top, right, bottom))
    im.save(img_file)


def generate_img(img_file: str):
    f1 = lambda x, y: random.uniform(-1, 1) * x ** 2 - math.sin(y ** 3) + abs(x - y)
    f2 = lambda x, y: random.uniform(-1, 1) * y ** 3 - math.cos(x ** 2) + y
    g = GenerativeImage(f1, f2)
    seed = int(time.time() / 1000)
    g.generate(seed=seed)
    use_polar = random.randint(0, 1)
    if use_polar == 1:
        g.plot(projection=Projection.POLAR)
    else:
        g.plot()
    g.save_image(file_adr=img_file)


def gen_cover_art():
    img_file = '../frontend/music-player/src/album.jpg'
    generate_img(img_file)
    center_prop(img_file)
