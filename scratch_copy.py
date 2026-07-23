import shutil

src = r"C:\Users\Lenovo\.gemini\antigravity\brain\32e3e55d-e110-45e4-9113-757b74ab1017\.user_uploaded\media__1784781150631.jpg"
dst1 = r"d:\Semester 6\KKN\Presentasi AI\foto-tim\school_bg.jpg"
dst2 = r"d:\Semester 6\KKN\Presentasi AI\foto-tim\hero_bg.png"

shutil.copyfile(src, dst1)
shutil.copyfile(src, dst2)
print("SUCCESS")
