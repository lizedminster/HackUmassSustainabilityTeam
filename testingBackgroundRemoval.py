from rembg import remove
from PIL import Image

# Store path of the image in the variable input_path
input_path =  'exampleTrash.jpg'

# Store path of the output image in the variable output_path
output_path = 'exampleTrashBlank.png'

# Processing the image
input = Image.open(input_path)

# Removing the background from the given Image
print("123")
output = remove(input)

#Saving the image in the given path
print("456")
output.save(output_path)
print("789")