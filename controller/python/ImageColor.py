import urllib2
import ImageFile

image_url = "http://plainview.files.wordpress.com/2009/06/black.jpg"
opener1 = urllib2.build_opener()
page1=opener1.open(image_url)

p = ImageFile.Parser()

while 1:
    s = page1.read(1024)
    if not s:
        break
    p.feed(s)

im = p.close()
r,g,b = im.getpixel((0,0))

fout = open('images/tony'+image[s]+"%d%_d%_d"%(r,g,b), "wb")
fout.write(my_picture)
fout.close()