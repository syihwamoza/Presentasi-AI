import os
from PIL import Image

src_img = r"C:\Users\Lenovo\.gemini\antigravity\brain\32e3e55d-e110-45e4-9113-757b74ab1017\.user_uploaded\media__1784783636125.jpg"
dst_png = r"d:\Semester 6\KKN\Presentasi AI\foto-tim\papan_board.png"
dst_jpg = r"d:\Semester 6\KKN\Presentasi AI\foto-tim\papan_board.jpg"

try:
    img = Image.open(src_img).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # Check white background pixels (R>230, G>230, B>230)
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(dst_png, "PNG")
    
    # Save original jpg as fallback
    img_orig = Image.open(src_img)
    img_orig.save(dst_jpg, "JPEG")
    print("SUCCESS_BOARD_CREATED")
except Exception as e:
    print("ERR:", e)
