"""
examples showing how to use the autosuggest functionalities for concepts, sources, categories, locations, ....
"""
import sys
from eventregistry import *

if len(sys.argv) != 3:
    print("Invalid args")
    exit(1)

apikey = sys.argv[1]
country = sys.argv[2]

er = EventRegistry(apikey)

usUri = er.getLocationUri(country, sources = "country")
print(usUri)