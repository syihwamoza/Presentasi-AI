import sys
from PIL import Image

src_path = r"C:\Users\Lenovo\.gemini\antigravity\brain\32e3e55d-e110-45e4-9113-757b74ab1017\.user_uploaded\media__1784783636125.jpg"
dst_path = r"d:\Semester 6\KKN\Presentasi AI\foto-tim\papan_board.png"

img = Image.open(src_path).convert("RGBA")
datas = img.getdata()

new_data = []
for item in datas:
    # item is (R, G, B, A)
    # Check if pixel is white / near white background
    if item[0] > 235 and item[1] > 235 and item[2] > 235:
        new_data.append((255, 255, 255, 0)) # Fully transparent
    else:
        new_data.append(item)

img.putdata(new_data)
img.save(dst_path, "PNG")
print("PROCESSED BOARD IMAGE SUCCESSFULLY")
